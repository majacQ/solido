// SPDX-FileCopyrightText: 2021 Chorus One AG
// SPDX-License-Identifier: GPL-3.0

use anchor_lang::prelude::Pubkey;
use anker::{
    find_instance_address, find_reserve_authority, find_st_sol_reserve_account,
    find_ust_reserve_account,
    state::Anker,
    token::{BLamports, MicroUst},
};
use lido::{state::Lido, token::StLamports};
use solana_program::{instruction::Instruction, program_pack::Pack};
use solana_sdk::account::ReadableAccount;

use crate::{snapshot::Result, SnapshotConfig};

#[derive(Default)]
pub struct AnkerState {
    pub anker: Anker,
    pub anker_program_id: Pubkey,

    pub b_sol_total_supply_amount: BLamports,
    pub pool_st_sol_account: Pubkey,
    pub pool_ust_account: Pubkey,
    pub ust_mint: Pubkey,
    pub pool_mint: Pubkey,
    pub pool_fee_account: Pubkey,
    pub ust_reserve_balance: MicroUst,
    pub st_sol_reserve_balance: StLamports,
}

impl AnkerState {
    pub fn new(
        config: &mut SnapshotConfig,
        anker_program_id: Pubkey,
        solido_address: &Pubkey,
        solido: &Lido,
    ) -> Result<Self> {
        let (anker_instance, _anker_bump_seed) =
            find_instance_address(&anker_program_id, solido_address);
        let anker = config.client.get_anker(&anker_instance)?;

        let token_swap_account = config.client.get_account(&anker.token_swap_pool)?;
        let token_swap = spl_token_swap::state::SwapV1::unpack(token_swap_account.data())?;

        let (anker_ust_reserve, _anker_ust_reserve_bump_seed) =
            find_ust_reserve_account(&anker_program_id, solido_address);
        let ust_reserve_balance =
            MicroUst(config.client.get_spl_token_balance(&anker_ust_reserve)?);

        let (anker_st_sol_reserve, _anker_st_sol_reserve_bump_seed) =
            find_st_sol_reserve_account(&anker_program_id, solido_address);
        let st_sol_reserve_balance =
            StLamports(config.client.get_spl_token_balance(&anker_st_sol_reserve)?);

        let b_sol_mint_account = config.client.get_spl_token_mint(&anker.b_sol_mint)?;
        let b_sol_total_supply_amount = BLamports(b_sol_mint_account.supply);

        let (ust_account, ust_mint, st_sol_account) =
            if token_swap.token_a_mint == solido.st_sol_mint {
                (
                    token_swap.token_b,
                    token_swap.token_b_mint,
                    token_swap.token_a,
                )
            } else {
                (
                    token_swap.token_a,
                    token_swap.token_a_mint,
                    token_swap.token_b,
                )
            };

        Ok(AnkerState {
            anker_program_id,
            anker,
            b_sol_total_supply_amount,
            pool_st_sol_account: st_sol_account,
            pool_ust_account: ust_account,
            ust_mint,
            pool_mint: token_swap.pool_mint,
            pool_fee_account: token_swap.pool_fee_account,
            ust_reserve_balance,
            st_sol_reserve_balance,
        })
    }

    pub fn get_sell_rewards_instruction(
        &self,
        solido_address: Pubkey,
        st_sol_mint: Pubkey,
    ) -> Instruction {
        let (anker_instance, _anker_bump_seed) =
            find_instance_address(&self.anker_program_id, &solido_address);
        let (anker_ust_reserve_account, _ust_reserve_bump_seed) =
            find_ust_reserve_account(&self.anker_program_id, &anker_instance);

        let (st_sol_reserve_account, _st_sol_reserve_bump_seed) =
            find_st_sol_reserve_account(&self.anker_program_id, &solido_address);

        let (reserve_authority, _reserve_authority_bump_seed) =
            find_reserve_authority(&self.anker_program_id, &solido_address);

        let (token_pool_authority, _authority_bump_seed) = Pubkey::find_program_address(
            &[&self.anker.token_swap_pool.to_bytes()[..]],
            &anker::orca_token_swap_v2::id(),
        );

        anker::instruction::sell_rewards(
            &self.anker_program_id,
            &anker::instruction::SellRewardsAccountsMeta {
                anker: anker_instance,
                solido: solido_address,
                st_sol_reserve_account,
                b_sol_mint: self.anker.b_sol_mint,
                token_swap_pool: self.anker.token_swap_pool,
                pool_st_sol_account: self.pool_st_sol_account,
                pool_ust_account: self.pool_ust_account,
                ust_reserve_account: anker_ust_reserve_account,
                pool_mint: self.pool_mint,
                st_sol_mint,
                ust_mint: self.ust_mint,
                pool_fee_account: self.pool_fee_account,
                token_pool_authority,
                reserve_authority,
            },
        )
    }
}
