import bar from "../interface/interface";

async function partition(
  arr: bar[],
  left: number,
  right: number,
  setBars: React.Dispatch<React.SetStateAction<bar[]>>,
  showSelectTimeoutPromise: () => Promise<void>
) {
  let pivot = arr[right];
  arr[right].state = "selected";
  setBars([...arr]);
  await showSelectTimeoutPromise();
  let i = left - 1;

  for (let j = left; j <= right - 1; j++) {
    arr[j].state = "placing";
    setBars([...arr]);
    await showSelectTimeoutPromise();
    if (arr[j].value < pivot.value) {
      i++;
      setBars([...arr]);
      await showSelectTimeoutPromise();
      [arr[i], arr[j]] = [arr[j], arr[i]];
      setBars([...arr]);
      await showSelectTimeoutPromise();
    } else {
      arr[j].state = "idle";
      await showSelectTimeoutPromise();
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].state != "sorted") {
      arr[i].state = "idle";
    }
  }

  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  arr[i + 1].state = "sorted";
  setBars([...arr]);
  await showSelectTimeoutPromise();

  return i + 1;
}

export async function QuickSortStarter(
  arr: bar[],
  left: number,
  right: number,
  setBars: React.Dispatch<React.SetStateAction<bar[]>>,
  showSelectTimeoutPromise: () => Promise<void>
) {
  QuickSort(arr, left, right, setBars, showSelectTimeoutPromise);
}
async function QuickSort(
  arr: bar[],
  left: number,
  right: number,
  setBars: React.Dispatch<React.SetStateAction<bar[]>>,
  showSelectTimeoutPromise: () => Promise<void>
) {
  if (left >= right) {
    return arr;
  }

  let index = await partition(
    arr,
    left,
    right,
    setBars,
    showSelectTimeoutPromise
  );

  await QuickSort(arr, left, index - 1, setBars, showSelectTimeoutPromise);
  await QuickSort(arr, index + 1, right, setBars, showSelectTimeoutPromise);

  for (let i = left; i <= right; i++) {
    arr[i].state = "sorted";
  }
  setBars([...arr]);
  await showSelectTimeoutPromise();
}

export const quickSortDescription = `
Quick Sort is a highly efficient, comparison-based sorting algorithm that follows the divide-and-conquer approach. It selects a "pivot" element and partitions the list into two sublists: one with elements less than the pivot and one with elements greater than the pivot. The process is then recursively applied to the sublists.
`;

export const quickSortSteps = [
  "Choose Pivot: Select a pivot element from the list (commonly the first, last, or middle element, or chosen randomly).",
  "Partition: Rearrange the list such that elements less than the pivot are on the left and elements greater than the pivot are on the right.",
  "Recursive Sort: Recursively apply the same process to the sublists of elements less than and greater than the pivot.",
  "Combine: Once the sublists are sorted, combine them with the pivot to form the sorted list.",
  "End Condition: Continue the process until the entire list is sorted.",
];

export const quickSortCharacteristics = {
  bestCase: "O(n log n)",
  averageCase: "O(n log n)",
  worstCase: "O(n²)",
  spaceComplexity: "O(log n)",
};
