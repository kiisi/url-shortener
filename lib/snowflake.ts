const MACHINE_ID_BITS = 10n;
const SEQUENCE_BITS = 12n;

const MAX_MACHINE_ID = (1n << MACHINE_ID_BITS) - 1n;
const MAX_SEQUENCE = (1n << SEQUENCE_BITS) - 1n;

// January 1, 2026 UTC
const EPOCH = BigInt(Date.UTC(2026, 0, 1));

export class SnowflakeGenerator {
  private lastTimestamp = -1n;
  private sequence = 0n;

  constructor(private readonly machineId: bigint) {
    if (machineId < 0n || machineId > MAX_MACHINE_ID) {
      throw new Error(
        `Machine ID must be between 0 and ${MAX_MACHINE_ID}`
      );
    }
  }

  /**
   * Generates the next Snowflake ID.
   */
  public nextId(): bigint {
    let timestamp = this.currentTimestamp();

    // Prevent IDs from going backwards
    if (timestamp < this.lastTimestamp) {
      throw new Error(
        `Clock moved backwards. Refusing to generate ID for ${
          this.lastTimestamp - timestamp
        }ms`
      );
    }

    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1n) & MAX_SEQUENCE;

      // Sequence exhausted within the same millisecond
      if (this.sequence === 0n) {
        timestamp = this.waitForNextMillisecond(this.lastTimestamp);
      }
    } else {
      // New millisecond
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;

    return (
      (timestamp << (MACHINE_ID_BITS + SEQUENCE_BITS)) |
      (this.machineId << SEQUENCE_BITS) |
      this.sequence
    );
  }

  /**
   * Returns milliseconds since the custom epoch.
   */
  private currentTimestamp(): bigint {
    return BigInt(Date.now()) - EPOCH;
  }

  /**
   * Wait until the next millisecond.
   */
  private waitForNextMillisecond(lastTimestamp: bigint): bigint {
    let timestamp = this.currentTimestamp();

    while (timestamp <= lastTimestamp) {
      timestamp = this.currentTimestamp();
    }

    return timestamp;
  }
}
