use solana_program::pubkey::Pubkey;

#[cfg(not(feature = "no-entrypoint"))]
pub mod entrypoint;

pub mod balance;
pub mod error;
pub mod instruction;
pub(crate) mod logic;
pub(crate) mod process_management;
pub mod processor;
pub mod state;
pub mod token;

/// Seed for reserve authority in SOL
/// Authority over the custody of deposited SOL into the LIDO program.
/// This is also the main holder/authority of the stSOL token and minting stSOL.
pub const RESERVE_AUTHORITY: &[u8] = b"reserve_authority";

/// Seed for deposit authority
/// This acts as deposit authority for the stake pool program.
/// This authority needs to sign the deposit of any stake account into the stake pool.
pub const DEPOSIT_AUTHORITY: &[u8] = b"deposit_authority";

/// Seed for fee manager authority
/// This authority acts as the recipient for the stake pool fees.
/// Distribution of any fees will use ths authority to sign.
pub const FEE_MANAGER_AUTHORITY: &[u8] = b"fee_authority";

/// Stake pool manager authority
/// This key acts as the staker role within the stake pool program.
pub const STAKE_POOL_AUTHORITY: &[u8] = b"stake_pool_authority";

/// Additional seed for validator stake accounts.
pub const VALIDATOR_STAKE_ACCOUNT: &[u8] = b"validator_stake_account";

/// Finds the public key and bump seed for a given authority.  Since this
/// function can take some time to run, it's preferred to use
/// `Pubkey::create_program_address(seeds, program_id)` inside programs.
pub fn find_authority_program_address(
    program_id: &Pubkey,
    lido_address: &Pubkey,
    authority: &[u8],
) -> (Pubkey, u8) {
    Pubkey::find_program_address(&[&lido_address.to_bytes(), authority], program_id)
}
