"use client";
import { FC, useState } from "react";

const RangeSlider: FC<{
  min: number;
  max: number;
  setMin: (value: number) => void;
  setMax: (value: number) => void;
}> = ({ min, max, setMin, setMax }) => {
  const [inputMin, setInputMin] = useState(min);
  const [inputMax, setInputMax] = useState(max);

  const minLimit = 0;
  const maxLimit = 10000;

  const handleRangeChange = (type: "min" | "max", value: number) => {
    const safeValue = Math.max(0, value);
    if (type === "min") {
      const newMin = Math.min(safeValue, max - 1);
      setMin(newMin);
      setInputMin(newMin);
    } else {
      const newMax = Math.max(safeValue, min + 1);
      setMax(newMax);
      setInputMax(newMax);
    }
  };

  const handleOkClick = () => {
    const newMin = Math.max(0, Math.min(inputMin, inputMax - 1));
    const newMax = Math.max(newMin + 1, inputMax);

    setMin(newMin);
    setMax(newMax);
    setInputMin(newMin);
    setInputMax(newMax);
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-[600]">Price</h2>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          className="max-w-[120px] rounded-md border px-2 py-1"
          value={inputMin}
          onChange={(e) => setInputMin(Math.max(0, Number(e.target.value)))}
        />
        <span>—</span>
        <input
          type="number"
          min="0"
          className="max-w-[120px] rounded-md border px-2 py-1"
          value={inputMax}
          onChange={(e) => setInputMax(Math.max(0, Number(e.target.value)))}
        />
        <button
          onClick={handleOkClick}
          className="rounded-md border px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
        >
          Ok
        </button>
      </div>

      <div className="relative h-4 w-full">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded bg-blue-200" />

        <div
          className="absolute top-1/2 h-1 rounded bg-blue-600"
          style={{
            left: `${(min / maxLimit) * 100}%`,
            width: `${((max - min) / maxLimit) * 100}%`,
            transform: "translateY(-50%)",
          }}
        />

        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={min}
          onChange={(e) => handleRangeChange("min", Number(e.target.value))}
          className="absolute z-20 w-full appearance-none bg-transparent"
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={max}
          onChange={(e) => handleRangeChange("max", Number(e.target.value))}
          className="absolute z-10 w-full appearance-none bg-transparent"
        />
      </div>

      <style jsx>{`
        input[type="range"] {
          pointer-events: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 18px;
          width: 18px;
          background: blue;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
        }
        input[type="range"]::-moz-range-thumb {
          height: 18px;
          width: 18px;
          background: blue;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
};

export default RangeSlider;
