// SPDX-FileCopyrightText: 2021 Chorus One AG
// SPDX-License-Identifier: GPL-3.0

use std::fmt;

use anker::token::{BLamports, MicroUst};
use anker::wormhole::TerraAddress;
use clap::Clap;
use lido::token::{Lamports, StLamports};
use lido::util::serialize_b58;
use serde::Serialize;
use solana_program::pubkey::Pubkey;
use solana_sdk::signer::Signer;

use crate::config::{ConfigFile, CreateAnkerOpts, ShowAnkerOpts};
use crate::error::Abort;
use crate::serialization_utils::serialize_bech32;
use crate::snapshot::Result;
use crate::spl_token_utils::push_create_spl_token_mint;
use crate::{print_output, SnapshotClientConfig, SnapshotConfig};

#[derive(Clap, Debug)]
enum SubCommand {
    /// Create a new Anker instance.
    Create(Box<CreateAnkerOpts>),

    /// Display the details of an Anker instance.
    Show(ShowAnkerOpts),
}

#[derive(Clap, Debug)]
pub struct AnkerOpts {
    #[clap(subcommand)]
    subcommand: SubCommand,
}

impl AnkerOpts {
    pub fn merge_with_config_and_environment(&mut self, config_file: Option<&ConfigFile>) {
        match &mut self.subcommand {
            SubCommand::Create(opts) => opts.merge_with_config_and_environment(config_file),
            SubCommand::Show(opts) => opts.merge_with_config_and_environment(config_file),
        }
    }
}

pub fn main(config: &mut SnapshotClientConfig, anker_opts: &AnkerOpts) {
    match &anker_opts.subcommand {
        SubCommand::Create(opts) => {
            let result = config.with_snapshot(|config| command_create_anker(config, opts));
            let output = result.ok_or_abort_with("Failed to create Anker instance.");
            print_output(config.output_mode, &output);
        }
        SubCommand::Show(opts) => {
            let result = config.with_snapshot(|config| command_show_anker(config, opts));
            let output = result.ok_or_abort_with("Failed to show Anker instance.");
            print_output(config.output_mode, &output);
        }
    }
}

#[derive(Serialize)]
struct CreateAnkerOutput {
    /// Account that stores the data for this Anker instance.
    #[serde(serialize_with = "serialize_b58")]
    pub anker_address: Pubkey,

    /// Manages the deposited stSOL.
    #[serde(serialize_with = "serialize_b58")]
    pub st_sol_reserve_account: Pubkey,

    /// Holds the UST proceeds until they are sent to Terra.
    #[serde(serialize_with = "serialize_b58")]
    pub ust_reserve_account: Pubkey,

    /// SPL token mint account for bSOL tokens.
    #[serde(serialize_with = "serialize_b58")]
    pub b_sol_mint_address: Pubkey,
}

impl fmt::Display for CreateAnkerOutput {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        writeln!(f, "Anker details:")?;
        writeln!(f, "  Anker address:           {}", self.anker_address)?;
        writeln!(
            f,
            "  Reserve account (stSOL): {}",
            self.st_sol_reserve_account
        )?;
        writeln!(f, "  Reserve account (UST):   {}", self.ust_reserve_account)?;
        writeln!(f, "  bSOL mint:               {}", self.b_sol_mint_address)?;
        Ok(())
    }
}

fn command_create_anker(
    config: &mut SnapshotConfig,
    opts: &CreateAnkerOpts,
) -> Result<CreateAnkerOutput> {
    let solido = config.client.get_solido(opts.solido_address())?;

    let (anker_address, _bump_seed) =
        anker::find_instance_address(opts.anker_program_id(), opts.solido_address());
    let (mint_authority, _bump_seed) =
        anker::find_mint_authority(opts.anker_program_id(), &anker_address);
    let (st_sol_reserve_account, _bump_seed) =
        anker::find_st_sol_reserve_account(opts.anker_program_id(), &anker_address);
    let (ust_reserve_account, _bump_seed) =
        anker::find_ust_reserve_account(opts.anker_program_id(), &anker_address);
    let (reserve_authority, _bump_seed) =
        anker::find_reserve_authority(opts.anker_program_id(), &anker_address);

    let b_sol_mint_address = {
        if opts.b_sol_mint_address() != &Pubkey::default() {
            // If we've been given a mint address, use that one.
            *opts.b_sol_mint_address()
        } else {
            // If not, set up the Anker bSOL SPL token mint account.
            let mut instructions = Vec::new();
            let b_sol_mint_keypair =
                push_create_spl_token_mint(config, &mut instructions, &mint_authority)?;
            let signers = &[&b_sol_mint_keypair, config.signer];

            // Ideally we would set up the entire instance in a single transaction, but
            // Solana transaction size limits are so low that we need to break our
            // instructions down into multiple transactions. So set up the mint first,
            // then continue.
            eprintln!("Initializing a new SPL token mint for bSOL.");
            config.sign_and_send_transaction(&instructions[..], signers)?;
            eprintln!("Initialized the bSOL token mint.");
            b_sol_mint_keypair.pubkey()
        }
    };

    let instructions = [anker::instruction::initialize(
        opts.anker_program_id(),
        &anker::instruction::InitializeAccountsMeta {
            fund_rent_from: config.signer.pubkey(),
            anker: anker_address,
            solido: *opts.solido_address(),
            solido_program: *opts.solido_program_id(),
            st_sol_mint: solido.st_sol_mint,
            b_sol_mint: b_sol_mint_address,
            st_sol_reserve_account,
            ust_reserve_account,
            reserve_authority,
            wormhole_core_bridge_program_id: *opts.wormhole_core_bridge_program_id(),
            wormhole_token_bridge_program_id: *opts.wormhole_token_bridge_program_id(),
            ust_mint: *opts.ust_mint_address(),
            token_swap_pool: *opts.token_swap_pool(),
        },
        opts.terra_rewards_address().clone(),
    )];

    config.sign_and_send_transaction(&instructions[..], &[config.signer])?;

    let result = CreateAnkerOutput {
        anker_address,
        st_sol_reserve_account,
        ust_reserve_account,
        b_sol_mint_address,
    };

    Ok(result)
}

#[derive(Serialize)]
struct ShowAnkerOutput {
    #[serde(serialize_with = "serialize_b58")]
    anker_address: Pubkey,

    #[serde(serialize_with = "serialize_b58")]
    anker_program_id: Pubkey,

    #[serde(serialize_with = "serialize_b58")]
    solido_address: Pubkey,

    #[serde(serialize_with = "serialize_b58")]
    solido_program_id: Pubkey,

    #[serde(serialize_with = "serialize_b58")]
    b_sol_mint: Pubkey,

    #[serde(serialize_with = "serialize_b58")]
    b_sol_mint_authority: Pubkey,

    #[serde(serialize_with = "serialize_bech32")]
    terra_rewards_destination: TerraAddress,

    #[serde(serialize_with = "serialize_b58")]
    reserve_authority: Pubkey,

    #[serde(serialize_with = "serialize_b58")]
    st_sol_reserve: Pubkey,

    #[serde(serialize_with = "serialize_b58")]
    ust_reserve: Pubkey,

    ust_reserve_balance: MicroUst,
    st_sol_reserve_balance: StLamports,
    st_sol_reserve_value: Option<Lamports>,
    b_sol_supply: BLamports,
}

impl fmt::Display for ShowAnkerOutput {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        writeln!(f, "Anker address:         {}", self.anker_address)?;
        writeln!(f, "Anker program id:      {}", self.anker_program_id)?;
        writeln!(f, "Solido address:        {}", self.solido_address)?;
        writeln!(f, "Solido program id:     {}", self.solido_program_id)?;
        writeln!(
            f,
            "Rewards destination:   {}",
            self.terra_rewards_destination
        )?;
        writeln!(f, "bSOL mint:             {}", self.b_sol_mint)?;
        writeln!(f, "bSOL mint authority:   {}", self.b_sol_mint_authority)?;
        writeln!(f, "bSOL supply:           {}", self.b_sol_supply)?;
        writeln!(f, "Reserve authority:     {}", self.reserve_authority)?;
        writeln!(f, "stSOL reserve address: {}", self.st_sol_reserve)?;
        writeln!(f, "stSOL reserve balance: {}", self.st_sol_reserve_balance)?;
        write!(f, "stSOL reserve value:   ")?;
        match self.st_sol_reserve_value {
            Some(sol_value) => writeln!(f, "{}", sol_value),
            None => writeln!(f, "Undefined; does Solido have nonzero deposits?"),
        }?;
        writeln!(f, "UST reserve address:   {}", self.ust_reserve)?;
        writeln!(f, "UST reserve balance:   {}", self.ust_reserve_balance)?;
        Ok(())
    }
}

fn command_show_anker(
    config: &mut SnapshotConfig,
    opts: &ShowAnkerOpts,
) -> Result<ShowAnkerOutput> {
    let client = &mut config.client;
    let anker_account = client.get_account(opts.anker_address())?;
    let anker_program_id = anker_account.owner;
    let anker = client.get_anker(opts.anker_address())?;
    let solido = client.get_solido(&anker.solido)?;

    let (mint_authority, _seed) =
        anker::find_mint_authority(&anker_program_id, opts.anker_address());
    let (reserve_authority, _seed) =
        anker::find_reserve_authority(&anker_program_id, opts.anker_address());
    let (st_sol_reserve, _seed) =
        anker::find_st_sol_reserve_account(&anker_program_id, opts.anker_address());
    let (ust_reserve, _seed) =
        anker::find_ust_reserve_account(&anker_program_id, opts.anker_address());

    let st_sol_reserve_balance = StLamports(client.get_spl_token_balance(&st_sol_reserve)?);
    let ust_reserve_balance = MicroUst(client.get_spl_token_balance(&ust_reserve)?);

    let st_sol_reserve_value = solido
        .exchange_rate
        .exchange_st_sol(st_sol_reserve_balance)
        .ok();
    let b_sol_mint = client.get_spl_token_mint(&anker.b_sol_mint)?;
    let b_sol_supply = BLamports(b_sol_mint.supply);

    let result = ShowAnkerOutput {
        anker_address: *opts.anker_address(),
        anker_program_id,

        solido_address: anker.solido,
        solido_program_id: anker.solido_program_id,

        terra_rewards_destination: anker.terra_rewards_destination,

        b_sol_mint: anker.b_sol_mint,
        b_sol_mint_authority: mint_authority,
        reserve_authority,
        st_sol_reserve,
        ust_reserve,

        st_sol_reserve_balance,
        st_sol_reserve_value,

        ust_reserve_balance,
        b_sol_supply,
    };

    Ok(result)
}
