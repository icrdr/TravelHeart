import { isMobile } from "react-device-detect";
import { Canvas } from "@react-three/fiber";

export default function SceneContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Canvas
      shadows
      gl={{
        antialias: false,
        logarithmicDepthBuffer: true,
      }}
      dpr={isMobile ? 0.8 : 1}
    >
      {children}
    </Canvas>
  );
}
