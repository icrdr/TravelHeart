import { JSX, Ref, Suspense, useState } from "react";
import CoronaryArtery from "./CoronaryArtery";
import Heart from "./Heart";
import Scene, { SceneRefMethods } from "@/props/Scene";
import { useLocation } from "react-router";
import { Vector3 } from "three";
import { Bookmark } from "@/props/BlenderScene";

const labels = [
  {
    bookmark: "/travelheart#ca",
    title: "冠脉",
  },
];

export default function TravelHeartStage({
  ref,
}: {
  ref?: Ref<SceneRefMethods>;
}) {
  const location = useLocation();
  return (
    <Scene ref={ref} labels={labels}>
      {/* <Suspense> */}
      <Heart visible={location.pathname === "/travelheart"} />
      <CoronaryArtery visible={location.pathname === "/travelheart/ca"} />
      {/* </Suspense> */}
    </Scene>
  );
}
