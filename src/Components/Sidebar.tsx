import { useContext, useState } from "react";
import { chevronLeft, chevronRight } from "../Helper/Logos";
import classNames from "classnames";
import { AppSettingsContext } from "../Contexts/AppSettingsContext";

export default function Sidebar() {
  const context = useContext(AppSettingsContext);
  if (!context) return;
  const { setActiveTab, activeTab, tabs } = context;
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  const [expand, setExpand] = useState(true);

  function handleExpand() {
    setExpand((prevState) => !prevState);
  }

  function handleTabChange(id: number) {
    setActiveTab(tabs[id - 1]);
  }

  function handleMouseEnter(id: number) {
    setHoveredTab(id);
  }

  function handleMouseLeave() {
    setHoveredTab(null);
  }

  return (
    <div
      className={classNames("h-full flex flex-col border-r relative", {
        "w-[355px] shadow-lg": expand,
        "w-24 items-center shadow-sm": !expand,
      })}
    >
      <div className="font-semibold text-3xl flex justify-between items-center p-2">
        {expand && "Algorithms"}
        <button
          className="cursor-pointer bg-primary rounded-md text-white hover:bg-hoverPrimary"
          onClick={handleExpand}
        >
          {expand ? chevronRight : chevronLeft}
        </button>
      </div>
      <ul className="w-full mt-4">
        {tabs.map(({ id, name, icon }) => (
          <li
            key={id}
            onClick={() => handleTabChange(id)}
            onMouseEnter={() => handleMouseEnter(id)}
            onMouseLeave={handleMouseLeave}
            className={classNames(
              "text-lg text-gray-800 cursor-pointer hover:bg-gray-200 p-2 flex items-center gap-2 relative mb-2",
              {
                "bg-gray-200": name === activeTab.name,
                "justify-center": !expand,
              }
            )}
          >
            {icon}
            {expand && name}
            {hoveredTab === id && !expand && (
              <span className="absolute top-7 left-20 z-10 text-white shadow-lg p-2 bg-primary rounded-md text-nowrap">
                {name}
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="text-lg mt-auto p-2 underline">
        <a href="https://github.com/AarushDev?tab=repositories" target="_blank">
          {expand ? "By: Aarush Khurana" : "By: AK"}
        </a>
      </p>
    </div>
  );
}
