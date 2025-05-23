import { Bvh, Detailed, useGLTF } from "@react-three/drei";
import {
  Light,
  Mesh,
  PerspectiveCamera,
  Vector3,
} from "three";
import { JSX, useEffect, useMemo } from "react";
import { getAbsolutePosition } from "@/lib/utils";
// import { useLoader } from "@react-three/fiber";
// import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

// const textureLoader = new TextureLoader();
// const lightMap = textureLoader.load('/images/lightmap.hdr');

export type CameraData = {
  position: Vector3;
  lookat: Vector3;
  fov?: number;
};

export type Bookmark = {
  name: string;
  data: CameraData;
};

export default function BlenderScene({
  path,
  onLoad,
  onDispose,
}: {
  path: string;
  onLoad?: (bookmarks: Bookmark[]) => void;
  onDispose?: (bookmarks: Bookmark[]) => void;
}) {
  const { scene: origialScene } = useGLTF(path);
  // const lightMap = useLoader(RGBELoader, "/images/Lightmap.hdr");

  const { scene, extra, bookmarks } = useMemo(() => {
    const scene = origialScene.clone();
    // console.log(scene.children.map((o) => o.name));
    const extra: JSX.Element[] = [];
    const bookmarks: Bookmark[] = [];
    let mainCamera: PerspectiveCamera | undefined = undefined;

    scene.traverse((node) => {
      node.visible = node.userData["B2R3F_isVisible"];
      if (
        Object.keys(node.userData).includes("B2R3F_lookat") &&
        node instanceof PerspectiveCamera
      ) {
        const lookatObjectName = node.userData["B2R3F_lookat"]?.replace(
          ".",
          ""
        );
        const lookatObject = scene.getObjectByName(lookatObjectName);
        // if (!lookatObject) console.log(scene.children, lookatObjectName);
        const lookat = getAbsolutePosition(lookatObject!);
        bookmarks.push({
          name: node.userData["B2R3F_name"],
          data: {
            position: getAbsolutePosition(node),
            lookat,
            fov: node.fov,
          },
        });
      }
      if (Object.keys(node.userData).includes("B2R3F_isMainCamera")) {
        mainCamera = node as PerspectiveCamera;
      }
      if (Object.keys(node.userData).includes("B2R3F_LOD_lod0")) {
        node.visible = false;
        const levelObjects = [];
        const levelThresholds = [0];
        let previewObjectName = node.name;
        for (let level = 0; level < 3; level++) {
          let objectName = node.userData[`B2R3F_LOD_lod${level}`].replace(
            ".",
            ""
          );
          objectName = objectName === "" ? previewObjectName : objectName;
          previewObjectName = objectName;
          const object = scene.getObjectByName(objectName);
          if (!object) continue;
          object.visible = false;
          levelObjects.push(object);
          if (level > 0)
            levelThresholds.push(node.userData[`B2R3F_LOD_threshold${level}`]);
        }

        extra.push(
          <Detailed key={node.name} distances={levelThresholds}>
            {levelObjects.map((o) => (
              <primitive key={o.name} object={o} />
            ))}
          </Detailed>
        );
      }

      if (node instanceof Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        // if (node.name === "Mesh_0001") {
        //   node.material.lightMap = lightMap;
        //   node.material.lightMapIntensity = 1;
        // }

        node.material.sheen *= 0.1;
        if (node.material.transparent) {
          node.material.depthWrite = true;
          node.material.depthTest = true;
        }
      } else if (node instanceof Light) {
        node.intensity *= 0.002;
        node.castShadow = node.userData["B2R3F_isShadowEnable"];
        node.shadow!.mapSize.width = 2048;
        node.shadow!.mapSize.height = 2048;
        // node.shadow!.bias = -0.0001;
        node.shadow!.radius = 100;
      }
    });

    if (!mainCamera) throw "Not found main camera";
    mainCamera = mainCamera as PerspectiveCamera;
    return { scene, extra, bookmarks, mainCamera };
  }, [origialScene]);

  useEffect(() => {
    onLoad?.(bookmarks);
    return () => {
      onDispose?.(bookmarks);
    };
  }, [scene]);

  return (
    <group dispose={null}>
      <Bvh firstHitOnly>
        <primitive object={scene} />
        {extra}
      </Bvh>
    </group>
  );
}
