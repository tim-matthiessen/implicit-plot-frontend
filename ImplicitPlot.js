import { useState } from "react";
import { Button, Slider } from "@/components/ui";

export default function ImplicitPlot() {
  const [params, setParams] = useState({ z1: 0.2, z2: 0.2, w1: 0.2, w2: 0.2, c: 0.31 });
  const [imageSrc, setImageSrc] = useState("/api/generate_plot");

  const updateParams = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const fetchPlot = () => {
    const query = new URLSearchParams(params).toString();
    setImageSrc(`/api/generate_plot?${query}`);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h1 className="text-xl font-bold">Implicit Plot Generator</h1>
      <img src={imageSrc} alt="Implicit Plot" className="w-96 h-96 border" />
      <div className="grid grid-cols-2 gap-4 w-96">
        {Object.keys(params).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm">{key.toUpperCase()}</label>
            <Slider
              min={-0.5}
              max={0.5}
              step={0.01}
              value={params[key]}
              onChange={(val) => updateParams(key, val)}
            />
          </div>
        ))}
      </div>
      <Button onClick={fetchPlot}>Generate Plot</Button>
      <a href={imageSrc} download="implicit_plot.png">
        <Button>Download Plot</Button>
      </a>
    </div>
  );
}
