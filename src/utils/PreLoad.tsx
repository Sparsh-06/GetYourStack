"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { MoveRight } from "lucide-react";

const loadingStates = [
    {
        text: "Initializing platform",
    },
    {
        text: "Loading resources",
    },
    {
        text: "Connecting to services",
    },
    {
        text: "Fetching data",
    },
    {
        text: "Rendering components",
    },
    {
        text: "Finalizing setup",
    },
    {
        text: "Platform ready",
    },
];

export function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[60vh] flex items-center justify-center absolute top-0">
      {/* Core Loader Modal */}
      <Loader loadingStates={loadingStates} loading={loading} duration={350} />

      {/* The buttons are for demo only, remove it in your actual code ⬇️ */}

      {loading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"
          onClick={() => setLoading(false)}
        >
          <MoveRight className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}
