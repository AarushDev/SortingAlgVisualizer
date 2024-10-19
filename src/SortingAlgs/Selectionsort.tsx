import bar from "../interface/interface";

export async function SelectionSort(
  arr: bar[],
  setBars: React.Dispatch<React.SetStateAction<bar[]>>,
  showSelectTimeoutPromise: () => Promise<void>
) {
  for (let i = 0; i < arr.length; i++) {
    let curMin = i;
    arr[curMin].state = "selected";
    setBars([...arr]);
    await showSelectTimeoutPromise();

    for (let j = i + 1; j < arr.length; j++) {
      arr[j].state = "placing";
      setBars([...arr]);
      await showSelectTimeoutPromise();

      if (arr[j].value < arr[curMin].value) {
        arr[curMin].state = "idle";
        arr[j].state = "idle";
        setBars([...arr]);

        curMin = j;

        arr[curMin].state = "selected";
        setBars([...arr]);
        await showSelectTimeoutPromise();
      } else {
        arr[j].state = "idle";
        setBars([...arr]);
        await showSelectTimeoutPromise();
      }
    }

    [arr[i], arr[curMin]] = [arr[curMin], arr[i]];
    arr[i].state = "sorted";
    setBars([...arr]);
    await showSelectTimeoutPromise();
  }
}

export const selectionSortDescription = `
Selection Sort is a simple comparison-based sorting algorithm. It repeatedly finds the minimum (or maximum) element from the unsorted portion of the list and swaps it with the first unsorted element. This process is repeated until the entire list is sorted.
`;

export const selectionSortSteps = [
  "Starting Point: Start with the first element of the list as the current position.",
  "Find Minimum: Search through the unsorted portion of the list to find the minimum element.",
  "Swap: Swap the minimum element with the first unsorted element.",
  "Move Forward: Move the current position one step forward to the next unsorted element.",
  "Repeat Process: Continue finding the minimum element and swapping until the entire list is sorted.",
  "End Condition: The process is complete when all elements have been sorted.",
];

export const selectionSortCharacteristics = {
  bestCase: "O(n²)",
  averageCase: "O(n²)",
  worstCase: "O(n²)",
  spaceComplexity: "O(1)",
};
