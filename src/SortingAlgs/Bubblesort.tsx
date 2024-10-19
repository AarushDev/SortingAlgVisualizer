import bar from "../interface/interface";

export async function BubbleSort(
  arr: bar[],
  setBars: React.Dispatch<React.SetStateAction<bar[]>>,
  showSelectTimeoutPromise: () => Promise<void>
) {
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; n - 1 - i > j; j++) {
      arr[j].state = "selected";
      arr[j + 1].state = "selected";
      setBars([...arr]);
      await showSelectTimeoutPromise();

      if (arr[j].value > arr[j + 1].value) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setBars([...arr]);
      }
      arr[j].state = "idle";
      arr[j + 1].state = "idle";
      setBars([...arr]);
      await showSelectTimeoutPromise();
    }
    arr[n - 1 - i].state = "sorted";
    setBars([...arr]);
    await showSelectTimeoutPromise();
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i].state = "sorted";
    setBars([...arr]);
    await showSelectTimeoutPromise();
  }
}

export const bubbleSortDescription = `
Bubble Sort is a simple, comparison-based sorting algorithm. It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. This process repeats until the list is sorted.
`;

export const bubbleSortSteps = [
  "Starting Point: Begin at the first element in the list.",
  "Comparison: Compare the current element with the next one.",
  "If the current element is greater than the next, swap them. If not, move to the next pair.",
  'Repeat Process: Continue comparing adjacent elements, "bubbling" the largest unsorted element to the end of the list during each pass.',
  "End Condition: Once no swaps are needed in a complete pass, the list is fully sorted.",
];

export const bubbleSortCharacteristics = {
  bestCase: "O(n²)",
  averageCase: "O(n²)",
  worstCase: "O(n²)",
  spaceComplexity: "O(1)",
};
