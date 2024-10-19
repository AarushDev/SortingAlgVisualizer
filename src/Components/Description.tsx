import { characteristics } from "./interface/interface";

export interface DescriptionProps {
  description: string;
  steps: string[];
  characteristics: characteristics;
}

export default function Description({
  description,
  steps,
  characteristics,
}: DescriptionProps) {
  return (
    <div className="w-full max-w-2xl p-4 flex">
      <div className="flex-2/3 pr-4">
        <h2 className="sub-header">How it Works</h2>
        <p className="text-description">{description}</p>
        <h2 className="sub-header my-2">Steps</h2>
        <ol className="list-decimal list-outside pl-3">
          {steps.map((step: string, index: number) => (
            <li key={index} className="text-description">
              {step}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex-1/3 border-l border-gray-300 pl-4">
        <h2 className="sub-header">Characteristics</h2>
        <table className="min-w-full table-auto">
          <tbody>
            <tr className="table-border">
              <td className="text-description table-category">Best Case</td>
              <td className="text-description table-answer">
                {characteristics.bestCase}
              </td>
            </tr>
            <tr className="table-border">
              <td className="text-description table-category">Average Case</td>
              <td className="text-description table-answer">
                {characteristics.averageCase}
              </td>
            </tr>
            <tr className="table-border">
              <td className="text-description table-category">Wost Case</td>
              <td className="text-description table-answer">
                {characteristics.worstCase}
              </td>
            </tr>
            <tr>
              <td className="text-description table-category">
                Space Complexity
              </td>
              <td className="text-description table-answer">
                {characteristics.spaceComplexity}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
