import RotatableKnob from "@/components/RotatableKnob";
import SceneContainer from "@/components/SceneContainer";
import Title from "@/components/Title";
import TravelHeart from "./scenes/TravelHeart/index";
import { Flow, Heart, Valve } from "@/icons";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";
import Info from "@/components/Info";
import { useLocation, useNavigate } from "react-router";
import { cn, sleep } from "./lib/utils";
import Welcome from "@/scenes/Welcome";
import Scene, { SceneRefMethods } from "./props/Scene";
import UnderDev from "./components/UnderDev";

const WELCOME_DURATION = 3000;

function App() {
  const welcomeRef = useRef<SceneRefMethods>(null);
  const sceneRef = useRef<SceneRefMethods>(null);
  const stages = [
    {
      title: "Travel Heart",
      pathname: "/travelheart",
      icon: <Heart width={32} />,
      content: <TravelHeart ref={sceneRef} />,
    },
    {
      title: "Blood Flow",
      pathname: "/bloodflow",
      icon: <Flow width={32} />,
      content: <UnderDev />,
    },
    {
      title: "Valve",
      pathname: "/valve",
      icon: <Valve width={32} />,
      content: <UnderDev />,
    },
    {
      title: "Heart Beat",
      pathname: "/heartbeat",
      icon: <Heart width={32} />,
      content: <UnderDev />,
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();

  const stageIndex = useMemo(() => {
    let stageIndex = stages.findIndex((s) =>
      location.pathname.startsWith(s.pathname)
    );
    stageIndex = stageIndex < 0 ? 0 : stageIndex;
    return stageIndex;
  }, [location.pathname]);

  const isHomePage = location.pathname === "/";
  const [isWelcoming, setIsWelcoming] = useState(isHomePage);
  useEffect(() => {
    if (!isWelcoming && isHomePage) setIsWelcoming(true);
  }, [isWelcoming, isHomePage]);

  return (
    <div className="w-screen h-screen bg-gray-200 overflow-hidden relative">
      <div
        className={cn(
          "absolute w-screen h-screen touch-none",
          isHomePage ? "opacity-0" : "opacity-100"
        )}
      >
        {stages[stageIndex].content}
      </div>
      {isWelcoming && (
        <div
          className={cn(
            "absolute w-screen h-screen",
            `transition duration-[${WELCOME_DURATION}ms]`,
            "select-none",
            isHomePage ? "opacity-100" : "opacity-0"
          )}
          onClick={async () => {
            if (!isHomePage) return;
            if (!welcomeRef.current || !sceneRef.current) return;
            welcomeRef.current.resetCamera(true);
            sceneRef.current.resetCamera(true);
            navigate("/travelheart");
            await sleep(WELCOME_DURATION);
            setIsWelcoming(false);
          }}
        >
          <Welcome ref={welcomeRef} />
          <div
            className={cn(
              "absolute w-screen h-screen top-0 left-0",
              "flex items-center justify-center",
              "bg-white/30 backdrop-blur-md",
              "transition duration-1000",
              isHomePage ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="text-4xl">Home</div>
          </div>
        </div>
      )}

      <RotatableKnob
        show={!isHomePage}
        items={stages}
        stageIndex={stageIndex}
        onChange={(step) => {
          navigate(stages[step].pathname);
        }}
      />
      {/* <Info /> */}
      <Title />
    </div>
  );
}

export default App;
