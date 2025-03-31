import { Suspense, useRef } from "react";
import { Detailed, useGLTF } from "@react-three/drei";
import Loader from "@/props/Loader";

useGLTF.preload("/models/CoronaryAtery.glb");
useGLTF.preload("/models/CoronaryAtery_WithFat.glb");

function WithFat() {
  const ref = useRef(undefined);
  const { nodes: ca } = useGLTF("/models/CoronaryAtery_WithFat.glb") as any;
  console.log(ca);
  return (
    <group ref={ref} dispose={null} rotation={[0, Math.PI, 0]}>
      <mesh castShadow receiveShadow geometry={ca.mesh_0.geometry}>
        <meshPhysicalMaterial roughness={0.3} color="white" transparent />
      </mesh>
      <mesh castShadow receiveShadow geometry={ca.Fat.geometry}>
        <meshPhysicalMaterial roughness={0.3} color="white" transparent />
      </mesh>
    </group>
  );
}

function Normal() {
  const ref = useRef(undefined);
  const { nodes: ca } = useGLTF("/models/CoronaryAtery.glb") as any;
  console.log(ca);
  return (
    <group ref={ref} dispose={null} rotation={[0, Math.PI, 0]}>
      <mesh castShadow receiveShadow geometry={ca.mesh_0.geometry}>
        <meshPhysicalMaterial roughness={0.3} color="white" transparent />
      </mesh>
    </group>
  );
}

export default function CoronaryAtery() {
  return (
    <Suspense fallback={<Loader />}>
      <Detailed distances={[0, 3]}>
        <Normal />
        <WithFat />
      </Detailed>
    </Suspense>
  );
}
