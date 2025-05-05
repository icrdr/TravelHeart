import { useGLTF } from "@react-three/drei";
import { useContext } from "react";
import { SceneContext } from "@/props/Scene";
import BlenderScene from "@/props/BlenderScene";

// const SCENE_PATH = "/scenes/CoronaryArteryScene-transformed.glb";
const SCENE_PATH = "/CoronaryArteryScene_v010.glb";
useGLTF.preload(SCENE_PATH);

export default function CoronaryArtery({ visible }: { visible: boolean }) {
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
      
      {/* {visible && (
        <Environment
          background
          files="/images/studio_country_hall_1k.exr"
          backgroundBlurriness={0.2}
          backgroundIntensity={4}
          environmentIntensity={0.05}
          backgroundRotation={[0, Math.PI * -0.3, 0]}
        />
      )} */}
    </group>
  );
}
