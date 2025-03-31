import { ShiningHeart } from "@/icons";
import { useState } from "react";
import { cn } from "@/lib/utils";

function Title() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div
        className={cn(
          "relative p-4 backdrop-blur-xl",
          "transition-all duration-1000",
          "bg-[url(/images/about.png)] bg-cover bg-center",
          isActive ? "w-screen h-screen" : "w-0 h-0",
          isActive ? "rounded-none" : "rounded-br-3xl",
          isActive ? "opacity-100" : "opacity-0",
          isActive ? "p-4" : "p-0"
        )}
      ></div>
      <div
        className={cn(
          "absolute top-4 left-4",
          "w-100 h-auto",
          "inline-flex justify-start items-center gap-2",
          "select-none"
        )}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <ShiningHeart width={32} />
        <div className="text-stone-950 text-xl font-semibold font-['Montserrat']">
          Travel Heart
        </div>
      </div>
    </>
  );
}

export default Title;
