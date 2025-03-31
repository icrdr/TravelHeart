import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";

function Info() {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    // if (sceneRef.current) {
    //   sceneRef.current.resetCamera();
    //   sceneRef.current.moveCamera({ position: new Vector3(0, 0, 0) }, true);
    // }
  };

  return (
    // <div className="rounded-2xl bg-white p-4 shadow-2xl">
    //   <Button variant="secondary" onClick={handleClick}>X</Button>
    // </div>
    <>
      <div
        className={cn(
          "absolute ",
          "rounded-2xl p-4",
          "bg-white shadow-2xl",
          "transition-all duration-700",
          isActive ? "top-0 right-0" : "top-7 right-7",
          isActive ? "w-1/2 h-96" : "w-0 h-0",
          isActive ? "p-4" : "p-0"
        )}
      ></div>
      <Button
        className="absolute top-4 right-4"
        variant="secondary"
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        {isActive ? "X" : "?"}
      </Button>
    </>
  );
}

export default Info;
