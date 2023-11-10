export const isEmpty = (val: unknown) =>
  val === undefined ||
  val === null ||
  (typeof val === 'string' && val.trim() === '') ||
  (typeof val === 'object' && Object.keys(val).length === 0);
