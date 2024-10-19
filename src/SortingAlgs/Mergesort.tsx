import bar from "../interface/interface";

export async function MergeSortStarter(
  arr: bar[],
  start: number,
  end: number,
  setBars: React.Dispatch<React.SetStateAction<bar[]>>,
  showSelectTimeoutPromise: () => Promise<void>
) {
  MergeSort(arr, start, end, setBars, showSelectTimeoutPromise);
}

async function MergeSort(
  arr: bar[],
  start: number,
  end: number,
  setBars: React.Dispatch<React.SetStateAction<bar[]>>,
  showSelectTimeoutPromise: () => Promise<void>
): Promise<bar[]> {
  if (start >= end) {
    return arr;
  }

  const mid = Math.floor((start + end) / 2);

  await MergeSort(arr, start, mid, setBars, showSelectTimeoutPromise);
  await MergeSort(arr, mid + 1, end, setBars, showSelectTimeoutPromise);

  return await merge(arr, start, mid, end, setBars, showSelectTimeoutPromise);
}

async function merge(
  arr: bar[],
  start: number,
  mid: number,
  end: number,
  setBars: React.Dispatch<React.SetStateAction<bar[]>>,
  showSelectTimeoutPromise: () => Promise<void>
) {
  let left = arr.slice(start, mid + 1);
  let right = arr.slice(mid + 1, end + 1);
  let startIndex = start;

  let result = [];
  let i = 0,
    j = 0;

  for (let i = start; i <= end; i++) {
    arr[i].state = "selected";
  }
  setBars([...arr]);
  await showSelectTimeoutPromise();

  while (i < left.length && j < right.length) {
    if (left[i].value < right[j].value) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  const sortedArray = result.concat(left.slice(i)).concat(right.slice(j));

  for (let i = 0; i < sortedArray.length; i++) {
    arr[startIndex++] = sortedArray[i];
    setBars([...arr]);
    await showSelectTimeoutPromise();
  }

  for (let i = start; i <= end; i++) {
    arr[i].state = "idle";
    setBars([...arr]);
  }
  await showSelectTimeoutPromise();

  if (arr.length === sortedArray.length) {
    for (let i = 0; i < sortedArray.length; i++) {
      arr[i].state = "sorted";
      setBars([...arr]);
      await showSelectTimeoutPromise();
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

export const mergeSortDescription = `
Merge Sort is a divide-and-conquer algorithm that splits the list into smaller sublists until each sublist contains only one element. It then merges these sublists back together in the correct order to produce a sorted list. Merge Sort is efficient and has a predictable performance, even for large datasets.
`;

export const mergeSortSteps = [
  "Divide: Recursively split the list into two halves until each sublist contains only one element.",
  "Base Case: If a sublist has one or zero elements, it is considered sorted.",
  "Merge: Merge the sublists by comparing their elements and sorting them as they are combined.",
  "Repeat Process: Continue merging the sublists until the entire list is merged and sorted.",
  "End Condition: Once all sublists are merged, the entire list is sorted.",
];

export const mergeSortCharacteristics = {
  bestCase: "O(n log n)",
  averageCase: "O(n log n)",
  worstCase: "O(n log n)",
  spaceComplexity: "O(n)",
};
