import { Suspense, useRef } from "react";
import { Detailed, Outlines, useGLTF } from "@react-three/drei";
import { AdditiveBlending, Mesh } from "three";
import Loader from "@/props/Loader";
import Label from "../props/Label";

useGLTF.preload("/Heart.glb");
useGLTF.preload("/Heart_Cutted.glb");
useGLTF.preload("/Heart_WithPulmonaryVessels.glb");

function WithPulmonaryVessels() {
  const ref = useRef(undefined);
  const { nodes: heart } = useGLTF("/Heart_WithPulmonaryVessels.glb") as any;

  return (
    <group ref={ref} dispose={null} rotation={[0, Math.PI, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={heart.Heart_WithPulmonaryVessels.geometry}
      >
        <meshPhysicalMaterial roughness={0.3} color="white" transparent />
      </mesh>
    </group>
  );
}

function Normal() {
  const ref = useRef(undefined);
  const { nodes: heart } = useGLTF("/Heart.glb") as any;

  return (
    <group ref={ref} dispose={null} rotation={[0, Math.PI, 0]}>
      <mesh castShadow receiveShadow geometry={heart.Heart.geometry}>
        <meshPhysicalMaterial roughness={0.3} color="white" transparent />
      </mesh>
    </group>
  );
}

function Cutted() {
  const ref = useRef(undefined);
  const { nodes: heart } = useGLTF("/Heart.glb") as any;
  const { nodes: heartCutted } = useGLTF("/Heart_Cutted.glb") as any;

  return (
    <group ref={ref} dispose={null} rotation={[0, Math.PI, 0]}>
      <mesh geometry={heart.Heart.geometry} scale={0.999}>
        <meshPhysicalMaterial
          roughness={0.3}
          color="white"
          transparent
          opacity={0.1}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={heartCutted.Heart_Cutted.geometry}
      >
        <meshPhysicalMaterial roughness={0.3} color="white" transparent />
      </mesh>
    </group>
  );
}

export default function Heart() {
  return (
    <Suspense fallback={<Loader />}>
      <Detailed distances={[2.5, 4]}>
        {/* <Cutted /> */}
        <Normal />
        <WithPulmonaryVessels />
      </Detailed>
    </Suspense>
  );
}
