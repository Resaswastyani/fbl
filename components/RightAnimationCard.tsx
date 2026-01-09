"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function RightAnimationCard() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    import("@/components/ForexAnimation.json").then((data) => {
      setAnimationData(data.default);
    });
  }, []);

  if (!animationData) {
    return (
      <div className="text-gray-400 relative w-auto h-auto flex items-center justify-center">
        Loading animation…
      </div>
    );
  }

  return (
    <Lottie
      animationData={animationData}
      loop
      className="w-full h-full object-contain"
    />
  );
}
