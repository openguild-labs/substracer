export const swapArrayElements = (
  array: any[],
  index1: number,
  index2: number,
  min: number,
  max: number
) => {
  const validIndex = (i: number) => Math.max(Math.min(i, max), min);
  let temp = array[validIndex(index1)];
  array[validIndex(index1)] = array[validIndex(index2)];
  array[validIndex(index2)] = temp;
  return array;
};
