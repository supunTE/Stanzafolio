export const enum Ternary {
  False = "false",
  True = "true",
  Unknown = "unknown",
}


export function TernaryBool(value: Ternary): boolean {
  return value === Ternary.True;
}