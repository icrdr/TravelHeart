import { Html } from "@react-three/drei";
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
  return (
    <group position={position}>
      <Html zIndexRange={[0, 0]}>
        <div
          style={{ width: width || 200, whiteSpace: "pre-line" }}
          className="p-2 bg-transparent flex flex-col gap-2 select-none"
          onClick={(_e) => {
            if (onClick) onClick();
          }}
        >
          <div className="flex justify-between">
            <div className="text-xl">{title}</div>
          </div>
          <div className="text-sm">{content}</div>
        </div>
      </Html>
    </group>
  );
}
