/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/HeartWithInnerScene_Qiyi.glb --transform 
Files: public/HeartWithInnerScene_Qiyi.glb [27.95MB] > C:\Users\admin\TravelHeart\HeartWithInnerScene_Qiyi-transformed.glb [2.6MB] (91%)
*/

import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Model(props) {
  const { scene } = useGLTF('/HeartWithInnerScene_Qiyi-transformed.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  return (
    <group {...props} dispose={null}>
      <spotLight intensity={163054.239} angle={0.39} penumbra={0.389} decay={2} color="#fcfcfc" position={[-1.629, 6.085, -6.436]} rotation={[-2.808, -0.129, -0.386]} target={nodes.Spot.target}>
        <primitive object={nodes.Spot.target} position={[0, 0, -1]} />
      </spotLight>
      <PerspectiveCamera makeDefault={false} far={100} near={0.1} fov={11.563} position={[3.277, 3.461, 2.12]} rotation={[-0.322, 0.88, 0.251]} />
      <PerspectiveCamera makeDefault={false} far={100} near={0.1} fov={11.563} position={[-1.766, 1.007, 9.063]} rotation={[0.212, -0.237, 0.05]} />
      <PerspectiveCamera makeDefault={false} far={100} near={0.001} fov={49.426} position={[0.634, 2.66, 0.553]} rotation={[-0.618, 0.751, 0.452]} />
      <PerspectiveCamera makeDefault={false} far={100} near={0.001} fov={37.299} position={[1.017, 2.705, 0.196]} rotation={[-0.501, 0.571, 0.287]} />
      <PerspectiveCamera makeDefault={false} far={100} near={0.001} fov={53.702} position={[0.026, 3.477, -0.136]} rotation={[-1.712, -0.353, -1.96]} />
      <PerspectiveCamera makeDefault={false} far={100} near={0.001} fov={58.716} position={[0.251, 2.801, 0.445]} rotation={[0.913, -0.678, 0.682]} />
      <pointLight intensity={8696.226} decay={2} position={[0.135, 3.793, 0.825]} rotation={[-1.839, 0.602, 1.932]} />
      <pointLight intensity={5435.141} decay={2} color="#e2defb" position={[1.586, 3.198, 1.767]} rotation={[-1.839, 0.602, 1.932]} />
      <pointLight intensity={10870.283} decay={2} position={[2.345, 1.58, 0.825]} rotation={[-1.839, 0.602, 1.932]} />
      <pointLight intensity={43481.13} decay={2} color="#a5c4fa" position={[-0.028, 0.648, 1.295]} rotation={[-1.839, 0.602, 1.932]} />
      <pointLight intensity={21740.565} decay={2} color="#fde6ec" position={[4.515, 2.946, -3.468]} rotation={[-1.839, 0.602, 1.932]} />
      <pointLight intensity={2717.571} decay={2} color="#efe3e9" position={[-1.547, 4.52, 0.358]} rotation={[-1.839, 0.602, 1.932]} />
      <spotLight intensity={10870.283} angle={0.577} penumbra={0.92} decay={2} position={[2.159, 3.942, -0.679]} rotation={[-2.005, 0.681, 2.913]} target={nodes.LightLeft.target}>
        <primitive object={nodes.LightLeft.target} position={[0, 0, -1]} />
      </spotLight>
      <spotLight intensity={21740.565} angle={0.545} penumbra={1} decay={2} color="#dcd8ef" position={[-0.081, 5.214, -0.647]} rotation={[-1.591, -0.29, -2.19]} target={nodes.LightLV.target}>
        <primitive object={nodes.LightLV.target} position={[0, 0, -1]} />
      </spotLight>
      <pointLight intensity={10870.283} decay={2} color="#efe3e9" position={[-0.385, 4.774, -0.935]} rotation={[-1.839, 0.602, 1.932]} />
      <pointLight intensity={1048.982} decay={2} position={[-0.668, 2.982, -0.269]} rotation={[-1.839, 0.602, 1.932]} />
      <pointLight intensity={1826.208} decay={2} position={[0.635, 2.32, -1.213]} rotation={[-1.839, 0.602, 1.932]} />
      <pointLight intensity={1000.066} decay={2} position={[-0.661, 2.21, 0.297]} rotation={[-1.839, 0.602, 1.932]} />
      <pointLight intensity={1000.066} decay={2} position={[-0.281, 2.116, -1.001]} rotation={[-1.839, 0.602, 1.932]} />
      <pointLight intensity={1087.028} decay={2} color="#aaffe1" position={[0.731, 2.017, 0.477]} rotation={[0.895, 1.155, -1.51]} />
      <spotLight intensity={4348.113} angle={0.602} penumbra={0.15} decay={2} color="#e4e8ff" position={[0.139, 2.86, 0.075]} rotation={[-2.286, -0.379, 2.556]} target={nodes.TricuspidValvePoint002.target}>
        <primitive object={nodes.TricuspidValvePoint002.target} position={[0, 0, -1]} />
      </spotLight>
      <pointLight intensity={326.108} decay={2} color="#aaffe1" position={[0.796, 2.367, -0.326]} rotation={[0.895, 1.155, -1.51]} />
      <pointLight intensity={1630.542} decay={2} color="#aaffe1" position={[0.313, 2.919, -0.424]} rotation={[0.895, 1.155, -1.51]} />
      <pointLight intensity={271.757} decay={2} color="#aaffe1" position={[0.541, 3.042, 0.143]} rotation={[0.895, 1.155, -1.51]} />
      <pointLight intensity={543.514} decay={2} color="#aaffe1" position={[0.637, 3.048, -0.032]} rotation={[0.895, 1.155, -1.51]} />
      <pointLight intensity={271.757} decay={2} color="#9d989c" position={[0.484, 2.582, 0.229]} rotation={[0.895, 1.155, -1.51]} />
      <pointLight intensity={543.514} decay={2} color="#aaffe1" position={[0.185, 2.271, -0.468]} rotation={[0.895, 1.155, -1.51]} />
      <mesh geometry={nodes.Mesh_0001.geometry} material={materials.Material_0} scale={10} />
      <mesh geometry={nodes.Plane.geometry} material={nodes.Plane.material} position={[0.512, 2.988, -0.161]} />
      <mesh geometry={nodes.Cube.geometry} material={materials.PaletteMaterial001} position={[1.001, 2.866, 0.335]} />
      <mesh geometry={nodes.Cube_TricuspidValve.geometry} material={materials.PaletteMaterial002} position={[0.169, 2.111, 0.048]} rotation={[0, 0.788, -0.177]} />
      <mesh geometry={nodes.Cube_MitralValve.geometry} material={materials.PaletteMaterial003} position={[0.838, 2.495, -0.463]} rotation={[-0.445, 1.124, 0.31]} />
    </group>
  )
}

useGLTF.preload('/HeartWithInnerScene_Qiyi-transformed.glb')
