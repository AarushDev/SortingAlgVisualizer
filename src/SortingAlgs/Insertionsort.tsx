import bar from "../interface/interface";

export async function InsertionSort(
  arr: bar[],
  setBars: React.Dispatch<React.SetStateAction<bar[]>>,
  showSelectTimeoutPromise: () => Promise<void>
) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0) {
      arr[j].state = "selected";
      arr[j - 1].state = "selected";
      setBars([...arr]);
      await showSelectTimeoutPromise();
      if (arr[j].value < arr[j - 1].value) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        setBars([...arr]);
        await showSelectTimeoutPromise();
      }
      arr[j].state = "placing";
      arr[j - 1].state = "placing";
      setBars([...arr]);
      await showSelectTimeoutPromise();
      j--;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i].state = "sorted";
    setBars([...arr]);
    await showSelectTimeoutPromise();
  }
}

export const insertionSortDescription = `
Insertion Sort is a simple, comparison-based sorting algorithm. It builds the sorted list one element at a time by repeatedly picking the next element from the unsorted list and inserting it into the correct position in the sorted part. It is efficient for small datasets and nearly sorted data.
`;

export const insertionSortSteps = [
  "Starting Point: Begin with the second element in the list (consider the first element as sorted).",
  "Selection: Pick the current element from the unsorted portion of the list.",
  "Comparison: Compare it with elements in the sorted portion of the list (elements to its left).",
  "Insertion: Shift elements in the sorted portion to the right until you find the correct position for the selected element.",
  "Repeat Process: Insert the selected element into the correct position and move to the next unsorted element.",
  "End Condition: Repeat this process until all elements are sorted.",
];

export const insertionSortCharacteristics = {
  bestCase: "O(n)",
  averageCase: "O(n²)",
  worstCase: "O(n²)",
  spaceComplexity: "O(1)",
};
