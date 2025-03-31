import { Environment, useGLTF } from "@react-three/drei";
import { useContext } from "react";
import BlenderScene from "@/props/BlenderScene";
import { SceneContext } from "@/props/Scene";

const SCENE_PATH = "/scenes/HeartScene.glb";
useGLTF.preload(SCENE_PATH);

export default function Heart({ visible }: { visible: boolean }) {
  const sceneContext = useContext(SceneContext);
  return (
    <group visible={visible}>
      {sceneContext && (
        <BlenderScene
          path={SCENE_PATH}
          onLoad={sceneContext.onLoad}
          onDispose={sceneContext.onDispose}
        />
      )}
      {/* <ambientLight color="#404040" /> */}
      {visible && (
        <Environment
          background
          files="/images/studio_small_02_1k.exr"
          backgroundBlurriness={0.6}
          backgroundIntensity={10}
          environmentIntensity={0.05}
          environmentRotation={[0, Math.PI * 0, 0]}
        />
      )}
    </group>
  );
}
