import { LensDistortionEffect, PixelationEffect } from "postprocessing";
import { forwardRef, useMemo } from "react";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { DepthOfField } from "@react-three/postprocessing";
import { Raycaster, Vector2, Vector3 } from "three";

export const AutoFocusDOF = ({
  bokehScale = 10,
  focalLength = 0.001,
  focusSpeed = 0.05,
  mouseFocus = false,
  resolution = 512,
}) => {
  const { camera, mouse, scene } = useThree();

  const ref = useRef<any>(null);
  const raycaster = new Raycaster();
  const finalVector = new Vector3();

  raycaster.firstHitOnly = true;

  useFrame((state) => {
    if (mouseFocus) {
      raycaster.setFromCamera(mouse, camera);
    } else {
      raycaster.setFromCamera(new Vector2(0, 0), camera);
    }

    const mainGroup = scene.getObjectByName("main");
    const visibleObjects = mainGroup?.children.filter((obj) => obj.visible);
    const intersects = raycaster.intersectObjects(visibleObjects || []);

    if (intersects.length > 0) {
      finalVector.lerp(intersects[0].point, focusSpeed);
      ref.current.target = finalVector;
    }
  });

  return (
    <DepthOfField
      focalLength={focalLength}
      bokehScale={bokehScale}
      height={resolution}
      ref={ref}
    />
  );
};

export const Pixelation = forwardRef(
  ({ granularity = 5 }: { granularity: number }, ref) => {
    const effect = useMemo(
      () => new PixelationEffect(granularity),
      [granularity]
    );
    return <primitive ref={ref} object={effect} dispose={null} />;
  }
);

export const LensDistortionn = forwardRef(
  (
    {
      distortion = [0, 0],
      principalPoint = [0, 0],
      focalLength = [1, 1],
    }: {
      distortion?: [number, number] | number;
      principalPoint?: [number, number];
      focalLength?: [number, number] | number;
    },
    ref
  ) => {
    distortion = Array.isArray(distortion)
      ? distortion
      : [distortion, distortion];
    focalLength = Array.isArray(focalLength)
      ? focalLength
      : [focalLength, focalLength];

    const effect = useMemo(() => {
      return new LensDistortionEffect({
        distortion: new Vector2(distortion[0], distortion[1]),
        principalPoint: new Vector2(principalPoint[0], principalPoint[1]),
        focalLength: new Vector2(focalLength[0], focalLength[1]),
      });
    }, [distortion, principalPoint, focalLength]);

    // useEffect(() => {
    //   effect.distortion = new Vector2(distortion[0], distortion[1]);
    //   effect.principalPoint = new Vector2(principalPoint[0], principalPoint[1]);
    //   effect.focalLength = new Vector2(focalLength[0], focalLength[1]);
    // }, [distortion, principalPoint, focalLength]);

    return <primitive ref={ref} object={effect} dispose={null} />;
  }
);
