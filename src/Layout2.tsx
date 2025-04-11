// import RotatableKnob from "@/components/RotatableKnob";
import Title from "@/components/Title";
// import { Flow, Heart, Valve } from "@/icons";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { cn, sleep } from "./lib/utils";
import Welcome from "@/scenes/Welcome";
import { SceneRefMethods } from "@/props/Scene";
import { useProgress } from "@react-three/drei";

const WELCOME_DURATION = 3000;

function Layout({ children }: { children: React.ReactNode }) {
  const welcomeRef = useRef<SceneRefMethods>(null);
  // const stages = [
  //   {
  //     title: "Travel Heart",
  //     pathname: "/travelheart",
  //     icon: <Heart width={32} />,
  //   },
  //   {
  //     title: "Blood Flow",
  //     pathname: "/bloodflow",
  //     icon: <Flow width={32} />,
  //   },
  //   {
  //     title: "Valve",
  //     pathname: "/valve",
  //     icon: <Valve width={32} />,
  //   },
  //   {
  //     title: "Heart Beat",
  //     pathname: "/heartbeat",
  //     icon: <Heart width={32} />,
  //   },
  // ];
  const navigate = useNavigate();
  const location = useLocation();

  // const stageIndex = useMemo(() => {
  //   let stageIndex = stages.findIndex((s) =>
  //     location.pathname.startsWith(s.pathname)
  //   );
  //   stageIndex = stageIndex < 0 ? 0 : stageIndex;
  //   return stageIndex;
  // }, [location.pathname]);

  const isHomePage = location.pathname === "/";
  const [isWelcoming, setIsWelcoming] = useState(isHomePage);
  useEffect(() => {
    if (!isWelcoming && isHomePage) setIsWelcoming(true);
  }, [isWelcoming, isHomePage]);

  const { progress } = useProgress();

  return (
    <div className="w-screen h-screen bg-gray-200 overflow-hidden relative">
      <div
        className={cn(
          "absolute w-screen h-screen touch-none",
          isHomePage ? "opacity-0" : "opacity-100"
        )}
      >
        {children}
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
            if (progress !== 100) return;
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
            <div className="text-4xl">
              {progress === 100
                ? "Travel Heart"
                : `${progress.toFixed(1)}% loaded`}{" "}
            </div>
          </div>
        </div>
      )}
      {progress !== 100 && (
        <div
          className={cn(
            "absolute w-screen h-screen top-0 left-0",
            "flex items-center justify-center",
            "bg-white/30 backdrop-blur-md"
          )}
        >
          <div className="text-4xl">
            {progress === 100
              ? "Travel Heart"
              : `${progress.toFixed(1)}% loaded`}{" "}
          </div>
        </div>
      )}
      {/* <RotatableKnob
        show={!isHomePage}
        items={stages}
        stageIndex={stageIndex}
        onChange={(step) => {
          navigate(stages[step].pathname);
        }}
      /> */}
      {/* <Info /> */}
      <Title />
    </div>
  );
}

export default Layout;
