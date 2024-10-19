import bar from "../interface/interface";

function isSorted(arr: bar[]) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].value > arr[i + 1].value) {
      return false;
    }
  }
  return true;
}

function shuffle(arr: bar[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export async function Bogosort(
  arr: bar[],
  setBars: React.Dispatch<React.SetStateAction<bar[]>>,
  showSelectTimeoutPromise: () => Promise<void>
) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = "selected";
  }
  setBars([...arr]);
  await showSelectTimeoutPromise();
  while (!isSorted(arr)) {
    shuffle(arr);
    setBars([...arr]);
    await showSelectTimeoutPromise();
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = "sorted";
    setBars([...arr]);
    await showSelectTimeoutPromise();
  }
}

export const bogoSortDescription = `
BogoSort (also known as permutation sort, stupid sort, or slow sort) is an ineffective sorting algorithm based on generating random permutations of the list until the list is sorted. It is highly inefficient and is used as a joke in computer science due to its terrible performance.
`;

export const bogoSortSteps = [
  "Starting Point: Begin with an unsorted list.",
  "Check Sorted: Check if the list is sorted. If it is, the process stops.",
  "Random Shuffle: If the list is not sorted, randomly shuffle the elements in the list.",
  "Repeat Process: Repeat the shuffle and check process until the list is sorted.",
  "End Condition: The list is sorted when one of the random shuffles results in the elements being in the correct order.",
];

export const bogoSortCharacteristics = {
  bestCase: "O(n)",
  averageCase: "O((n+1)!)",
  worstCase: "Unbounded",
  spaceComplexity: "O(1)",
};
