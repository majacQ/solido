#!/usr/bin/env python3

"""
Start a test validator and wait for it to be available, then print its PID.

This script is used to start the test validator on CI.
"""

import subprocess
import sys
import time

from typing import Optional
from util import solana

SLOTS_PER_EPOCH = 1000
# Start the validator, pipe its stdout to /dev/null.
def start_validator(warp_slot: Optional[int] = None):
    command = ['solana-test-validator', '--slots-per-epoch', str(SLOTS_PER_EPOCH)]
    if warp_slot != None:
        print('Advancing to slot', warp_slot)
        command += ['--warp-slot', str(warp_slot)]
    return subprocess.Popen(
        command,
        stdout=subprocess.DEVNULL,
    )


def advance_validator_epoch(advance_epochs: int):
    """
    Restarts a validator, in this process it can jump to any Epoch provided.
    Although rare, it might happen that a validator is approaching the end of
    the Epoch n, but when it gets killed, the epoch already passed to n+1. In
    that case we wait for the validator to advance naturally to the next epoch.
    """
    current_epoch = int(solana('epoch'))
    current_slot = int(solana('slot'))
    while current_slot >= (current_epoch + advance_epochs) * SLOTS_PER_EPOCH - 10:
        # If we are next to the next epoch just wait for the validator to
        # advance on its own.
        time.sleep(1)
        current_epoch = int(solana('epoch'))

    subprocess.Popen(
        ['killall', '-INT', 'solana-test-validator'],
        stdout=subprocess.DEVNULL,
    )
    time.sleep(5)
    print(
        'Starting validator at epoch',
        SLOTS_PER_EPOCH * (current_epoch + advance_epochs),
    )
    validator = start_validator(
        warp_slot=SLOTS_PER_EPOCH * (current_epoch + advance_epochs),
    )
    wait_for_validator(validator)


def wait_for_validator(validator):
    # Wait up to 5 seconds for the validator to be running and processing blocks. We
    # check this by running "solana block-height", and observing at least one
    # increase. If that is the case, the RPC is available, and the validator must be
    # producing blocks. Previously we only checked "solana cluster-version", but
    # this can return a response before the validator is ready to accept
    # transactions.
    last_observed_block_height: Optional[int] = None

    for _ in range(50):
        result = subprocess.run(
            ['solana', 'block-height'],
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
        )
        print(result)
        if result.returncode == 0:
            current_block_height = int(result.stdout)
            if (
                last_observed_block_height is not None
                and current_block_height > last_observed_block_height
            ):
                break
            last_observed_block_height = current_block_height

        sleep_seconds = 0.1
        time.sleep(sleep_seconds)

    is_rpc_online = last_observed_block_height is not None

    if is_rpc_online and validator.poll() is None:
        # The RPC is online, and the process is still running.
        print(validator.pid)

    elif is_rpc_online:
        print(
            'RPC is online, but the process is gone ... was a validator already running?'
        )
        sys.exit(1)

    else:
        print('Test validator is still not responding, something is wrong.')
        sys.exit(1)


if __name__ == '__main__':
    # test_validator = start_validator()
    # wait_for_validator(test_validator)
    advance_validator_epoch(1)
