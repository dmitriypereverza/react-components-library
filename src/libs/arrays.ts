export function modifyEmptyArrayInNull(arr: any[]): any[] | null {
  return arr.length ? arr : null;
}
