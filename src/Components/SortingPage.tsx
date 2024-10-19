import { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "../App.css";
import { AppSettingsContext } from "../Contexts/AppSettingsContext";
import Description from "./Description";
import CreateBars from "../Helper/CreateBars";
import { showSelectTimeoutPromise } from "../Helper/Promises";

function SortingPage() {
  const context = useContext(AppSettingsContext);
  if (!context) return;
  const { activeTab, sorting, setSorting } = context;
  const abortControllerRef = useRef<AbortController | null>(null);
  const [bars, setBars] = useState(CreateBars());
  const [speed, setSpeed] = useState(1);

  function handleSpeedChange(newSpeed: number) {
    setSpeed(newSpeed);
  }

  useEffect(() => {
    handleAbort();
  }, [activeTab, speed]);

  async function handleStart() {
    if (sorting) return;

    setSorting(true);

    abortControllerRef.current = new AbortController();

    try {
      const signal = abortControllerRef.current?.signal;

      await activeTab.alg([...bars], setBars, () =>
        showSelectTimeoutPromise(signal, speed)
      );
    } catch {
      setBars(CreateBars());
    }
  }

  function handleAbort() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setSorting(false);
      setBars(CreateBars());
      abortControllerRef.current = null;
    }
  }

  return (
    <div className="h-full flex-1 mx-auto flex flex-col overflow-auto">
      <nav className="p-2 text-center">
        <h1 className=" font-semibold text-3xl">
          Sorting Algorithm Visualizer
        </h1>
        <div className="border border-primary w-32 mx-auto mt-3"></div>
      </nav>
      <main className="flex flex-col items-center">
        <div className="gap-2 mt-4 mb-6">
          <h2 className="sub-header">{activeTab.name}</h2>
        </div>
        <div className="flex gap-2 justify-center">
          <div className="flex items-end border-2 border-primary min-h-96 px-10 ml-12">
            {bars.map(({ value, state }, index) => {
              return (
                <div
                  key={index}
                  style={{ height: `${value * 1.65}px` }}
                  className={classNames(
                    "w-16  mr-1 text-md flex items-start justify-center text-white rounded-t-md",
                    {
                      "bg-green-500": state === "sorted",
                      "bg-yellow-500": state === "placing",
                      "bg-red-500": state === "selected",
                      "bg-primary": state === "idle",
                    }
                  )}
                >
                  {value}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <button
              onClick={() => handleSpeedChange(1.5)}
              className={classNames("btn-alg", {
                "bg-primary text-white": speed === 1.5,
              })}
            >
              1.5x
            </button>
            <button
              onClick={() => handleSpeedChange(1)}
              className={classNames("btn-alg", {
                "bg-primary text-white": speed === 1,
              })}
            >
              1x
            </button>
            <button
              onClick={() => handleSpeedChange(0.5)}
              className={classNames("btn-alg", {
                "bg-primary text-white": speed === 0.5,
              })}
            >
              0.5x
            </button>
          </div>
        </div>
        <div className="flex gap-2 mt-5 items-center">
          <button className="btn-alg" onClick={handleStart}>
            Start
          </button>
          <button
            className="btn-danger bg-red-500 hover:bg-red-900"
            onClick={handleAbort}
          >
            Reset
          </button>
        </div>
        <Description
          description={activeTab.description}
          steps={activeTab.steps}
          characteristics={activeTab.characteristics}
        />
      </main>
    </div>
  );
}

export default SortingPage;
