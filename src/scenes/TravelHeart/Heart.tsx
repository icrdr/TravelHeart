import { useGLTF } from "@react-three/drei";
import { useContext } from "react";
import BlenderScene from "@/props/BlenderScene";
import { SceneContext } from "@/props/Scene";

const SCENE_PATH = "HeartWithInnerScene_Qiyi.glb";
useGLTF.preload(SCENE_PATH);

export default function Heart({ visible }: { visible: boolean }) {
  const sceneContext = useContext(SceneContext);
  return (
    <group visible={visible}>
      {/* <BlenderScene path={SCENE_PATH} /> */}
      {sceneContext && (
        <BlenderScene
          path={SCENE_PATH}
          onLoad={sceneContext.onLoad}
          onDispose={sceneContext.onDispose}
        />
      )}
      {/* {visible && (
        <Environment 
          background
          files="/images/studio_small_02_1k.exr"
          backgroundBlurriness={0.6}
          backgroundIntensity={10}
          environmentIntensity={0.2}
          environmentRotation={[0, Math.PI * 0, 0]}
        />
      )} */}
    </group>
  );
}
