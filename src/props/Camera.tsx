import { CameraControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { lerp } from "three/src/math/MathUtils.js";

// 参数配置
const MIN_SPEED = 0.02;
const MAX_SPEED = 0.5;
const NEAR_DISTANCE = 1;
const FAR_DISTANCE = 6;

export default function DynamicZoomCamera() {
  const { camera } = useThree();
  const controls = useRef<CameraControls>(null);
  const prevDistance = useRef(camera.position.length());

  // 每帧更新逻辑
  useFrame((_, delta) => {
    if (!controls.current) return;

    // 获取当前相机距离
    const distance = controls.current.distance;

    // 仅在距离变化时更新速度
    if (distance - prevDistance.current < 0) {
      controls.current.dollySpeed = lerp(
        MIN_SPEED,
        MAX_SPEED,
        Math.min(1, (distance - NEAR_DISTANCE) / (FAR_DISTANCE - NEAR_DISTANCE))
      );
    } else {
      controls.current.dollySpeed = (MAX_SPEED + MAX_SPEED) / 2;
    }
    prevDistance.current = distance;

    // 手动更新控制器（某些库需要）
    controls.current.update(delta);
  });

  return (
    <CameraControls
      ref={controls}
      minDistance={NEAR_DISTANCE}
      maxDistance={FAR_DISTANCE}
      minPolarAngle={(Math.PI * 1) / 3}
      maxPolarAngle={(Math.PI * 2) / 3}
      polarRotateSpeed={0.5}
      azimuthRotateSpeed={0.5}
      truckSpeed={0.0}
      dollySpeed={MIN_SPEED}
    />
  );
}
