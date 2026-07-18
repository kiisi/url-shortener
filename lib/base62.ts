const ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const BASE = BigInt(ALPHABET.length);

export function encodeBase62(num: bigint): string {
  if (num === 0n) {
    return ALPHABET[0];
  }

  let encoded = "";
  let current = num;

  while (current > 0n) {
    const remainder = Number(current % BASE);

    encoded = ALPHABET[remainder] + encoded;

    current = current / BASE;
  }

  return encoded;
}

export function decodeBase62(str: string): bigint {
  let decoded = 0n;

  for (const char of str) {
    const value = ALPHABET.indexOf(char);

    if (value === -1) {
      throw new Error(`Invalid Base62 character: ${char}`);
    }

    decoded = decoded * BASE + BigInt(value);
  }

  return decoded;
}