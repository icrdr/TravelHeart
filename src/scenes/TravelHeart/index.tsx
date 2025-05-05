import { Ref } from "react";
import CoronaryArtery from "./CoronaryArtery";
import Heart from "./Heart";
import Scene, { SceneRefMethods } from "@/props/Scene";
import { useLocation } from "react-router";
import { Color } from "three";

const labels = [
  {
    bookmark: "/travelheart#ca",
    title: "冠状动脉",
    location: [1, 2.9, 0.4] as [number, number, number],
    subtitle: "Coronary Artery",
  },
  {
    bookmark: "/travelheart#tv",
    title: "三尖瓣",
    location: [-0.35, 2.5, 0.2] as [number, number, number],
    subtitle: "Tricuspid  Valve",
  },
  {
    bookmark: "/travelheart#mv",
    title: "二尖瓣",
    location: [1.1, 3, -0.4] as [number, number, number],
    subtitle: "Mitral  Valve",
  },
  {
    bookmark: "/travelheart#ao",
    title: "主动脉瓣",
    location: [-0.12, 3.3, 0.2] as [number, number, number],
    subtitle: "Aortic Valve",
  },
  {
    bookmark: "/travelheart#pa",
    title: "肺动脉瓣",
    location: [0.33, 3.3, 0.3] as [number, number, number],
    subtitle: "Pulmonary Valve",
  },
  // {
  //   bookmark: "/travelheart#media",
  //   title: "血管中膜",
  //   location: [0, 1, 0] as [number, number, number],
  //   subtitle: "Tunica Media",
  // },
];
const intensity = 20;
const color = new Color(intensity, intensity, intensity);

export default function TravelHeartStage({
  ref,
}: {
  ref?: Ref<SceneRefMethods>;
}) {
  const location = useLocation();
  return (
    <>
      <Scene
        ref={ref}
        labels={labels}
        bokehScale={location.pathname === "/travelheart/ca" ? 10 : 8}
        // fog={[color, 14, 20]}
        bg={[color]}
      >
        
        <Heart visible={location.pathname === "/travelheart"} />
        <CoronaryArtery visible={location.pathname === "/travelheart/ca"} />
      </Scene>
    </>
  );
}
