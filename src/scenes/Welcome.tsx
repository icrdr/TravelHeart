import { Environment, useGLTF } from "@react-three/drei";
import BlenderScene from "@/props/BlenderScene";
import { Ref, useContext } from "react";
import Scene, { SceneContext, SceneRefMethods } from "@/props/Scene";

const SCENE_PATH = "/scenes/Welcome.glb";
useGLTF.preload(SCENE_PATH);

function Welcome() {
  const sceneContext = useContext(SceneContext);
  return (
    <>
      {sceneContext && (
        <BlenderScene
          path={SCENE_PATH}
          onLoad={sceneContext.onLoad}
          onDispose={sceneContext.onDispose}
        />
      )}
      <Environment
        background
        files="/images/studio_small_02_1k.exr"
        backgroundBlurriness={0.6}
        backgroundIntensity={1}
        environmentIntensity={0.2}
        environmentRotation={[0, Math.PI * 0, 0]}
      />
    </>
  );
}

export default function WelcomeStage({ ref }: { ref?: Ref<SceneRefMethods> }) {
  return (
    <Scene enabledControl={false} ref={ref}>
      <Welcome />
    </Scene>
  );
}
