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
    // subtitle: "Coronary Artery",
  },
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
    <Scene
      ref={ref}
      labels={labels}
      bokehScale={location.pathname === "/travelheart/ca" ? 10 : 0}
      fog={[color, 19, 25]}
      bg={[color]}
    >
      {/* <Suspense> */}
      <Heart visible={location.pathname === "/travelheart"} />
      <CoronaryArtery visible={location.pathname === "/travelheart/ca"} />
      {/* </Suspense> */}
    </Scene>
  );
}
