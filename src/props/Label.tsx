import { Html } from "@react-three/drei";
import { useState } from "react";
import { Vector3 } from "three";

// 标签组件
export default function Label({
  position,
  title,
  content,
  width,
  onClick,
}: {
  position: Vector3 | [x: number, y: number, z: number];
  title: string;
  content?: string;
  width?: number;
  onClick?: () => void;
}) {
  const [hidden, set] = useState<boolean>();
  return (
    <group position={position}>
      <Html
        zIndexRange={[0, 0]}
        occlude
        onOcclude={set}
        style={{
          transition: "all 0.5s",
          opacity: hidden ? 0 : 1,
          transform: `scale(${hidden ? 0.2 : 1})`,
        }}
      >
        <div
          style={{ width: width || 200, whiteSpace: "pre-line" }}
          className="p-2 bg-transparent flex flex-col gap-0 select-none "
          onClick={(_e) => {
            if (onClick) onClick();
          }}
        >
          <div className="text-xs  md:text-sm text-stone-700 md:text-gray-800  tracking-wider ">
            {title}
          </div>
          <div className="text-sm md:text-[10px] ">{content}</div>
        </div>
      </Html>
    </group>
  );
}
