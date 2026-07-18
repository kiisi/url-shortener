import { SnowflakeGenerator } from "./snowflake";

const machineId = BigInt(process.env.SNOWFLAKE_MACHINE_ID ?? "0");

export const idGenerator = new SnowflakeGenerator(machineId);