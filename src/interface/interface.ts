import { SetStateAction } from "react";

export default interface bar {
  value: number;
  state: string;
}

export interface characteristics {
  bestCase: string;
  worstCase: string;
  averageCase: string;
  spaceComplexity: string;
}

export interface tab {
  id: number;
  name: string;
  icon: JSX.Element;
  alg: (
    bars: bar[],
    setBars: React.Dispatch<SetStateAction<bar[]>>,
    promise: () => Promise<void>
  ) => Promise<void>;
  description: string;
  steps: string[];
  characteristics: characteristics;
}
