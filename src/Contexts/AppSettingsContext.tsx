import React, { createContext, useState } from "react";
import {
  bogoSort,
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
} from "../Helper/Logos";
import {
  BubbleSort,
  bubbleSortDescription,
  bubbleSortSteps,
  bubbleSortCharacteristics,
} from "../SortingAlgs/Bubblesort";
import bar, { tab } from "../interface/interface";
import {
  Bogosort,
  bogoSortDescription,
  bogoSortSteps,
  bogoSortCharacteristics,
} from "../SortingAlgs/Bogosort";
import {
  InsertionSort,
  insertionSortDescription,
  insertionSortSteps,
  insertionSortCharacteristics,
} from "../SortingAlgs/Insertionsort";
import {
  MergeSortStarter,
  mergeSortDescription,
  mergeSortSteps,
  mergeSortCharacteristics,
} from "../SortingAlgs/Mergesort";
import {
  QuickSortStarter,
  quickSortDescription,
  quickSortSteps,
  quickSortCharacteristics,
} from "../SortingAlgs/Quicksort";
import {
  SelectionSort,
  selectionSortDescription,
  selectionSortSteps,
  selectionSortCharacteristics,
} from "../SortingAlgs/Selectionsort";

interface AppSettingsContextType {
  sorting: boolean;
  setSorting: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: tab;
  setActiveTab: React.Dispatch<React.SetStateAction<tab>>;
  tabs: tab[];
}

type AppSettingsContextProviderProps = {
  children: React.ReactNode;
};

export const AppSettingsContext = createContext<AppSettingsContextType | null>(
  null
);

function AppSettingsContextProvider({
  children,
}: AppSettingsContextProviderProps) {
  const [sorting, setSorting] = useState(false);
  const tabs = [
    {
      id: 1,
      name: "Bubble Sort",
      icon: bubbleSort,
      alg: (
        bars: bar[],
        setBars: React.Dispatch<React.SetStateAction<bar[]>>,
        showSelectTimeoutPromise: () => Promise<void>
      ) => BubbleSort([...bars], setBars, showSelectTimeoutPromise),
      description: bubbleSortDescription,
      steps: bubbleSortSteps,
      characteristics: bubbleSortCharacteristics,
    },
    {
      id: 2,
      name: "Insertion Sort",
      icon: insertionSort,
      alg: (
        bars: bar[],
        setBars: React.Dispatch<React.SetStateAction<bar[]>>,
        showSelectTimeoutPromise: () => Promise<void>
      ) => InsertionSort([...bars], setBars, showSelectTimeoutPromise),
      description: insertionSortDescription,
      steps: insertionSortSteps,
      characteristics: insertionSortCharacteristics,
    },
    {
      id: 3,
      name: "Merge Sort",
      icon: mergeSort,
      alg: (
        bars: bar[],
        setBars: React.Dispatch<React.SetStateAction<bar[]>>,
        showSelectTimeoutPromise: () => Promise<void>
      ) =>
        MergeSortStarter(
          [...bars],
          0,
          bars.length - 1,
          setBars,
          showSelectTimeoutPromise
        ),
      description: mergeSortDescription,
      steps: mergeSortSteps,
      characteristics: mergeSortCharacteristics,
    },
    {
      id: 4,
      name: "Quick Sort",
      icon: quickSort,
      alg: (
        bars: bar[],
        setBars: React.Dispatch<React.SetStateAction<bar[]>>,
        showSelectTimeoutPromise: () => Promise<void>
      ) =>
        QuickSortStarter(
          [...bars],
          0,
          bars.length - 1,
          setBars,
          showSelectTimeoutPromise
        ),
      description: quickSortDescription,
      steps: quickSortSteps,
      characteristics: quickSortCharacteristics,
    },
    {
      id: 5,
      name: "Selection Sort",
      icon: selectionSort,
      alg: (
        bars: bar[],
        setBars: React.Dispatch<React.SetStateAction<bar[]>>,
        showSelectTimeoutPromise: () => Promise<void>
      ) => SelectionSort([...bars], setBars, showSelectTimeoutPromise),
      description: selectionSortDescription,
      steps: selectionSortSteps,
      characteristics: selectionSortCharacteristics,
    },
    {
      id: 6,
      name: "Bogo Sort",
      icon: bogoSort,
      alg: (
        bars: bar[],
        setBars: React.Dispatch<React.SetStateAction<bar[]>>,
        showSelectTimeoutPromise: () => Promise<void>
      ) => Bogosort([...bars], setBars, showSelectTimeoutPromise),
      description: bogoSortDescription,
      steps: bogoSortSteps,
      characteristics: bogoSortCharacteristics,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const value: AppSettingsContextType = {
    sorting,
    setSorting,
    activeTab,
    setActiveTab,
    tabs,
  };

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export default AppSettingsContextProvider;
