/**
 * @returns `-1` (a < b), `0` (a = b), `1` (a > b)
 */
export type compare<K> = (a: K, b: K) => -1 | 0 | 1