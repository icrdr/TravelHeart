import { Html, Text } from "@react-three/drei";
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
      {/* <Text
        color="black"
        anchorX="left"
        anchorY="middle"
        fontSize={0.1}
        onClick={(_e) => {
          if (onClick) onClick();
        }}
      >
        {title}
      </Text> */}
      <Html >
        <div
          style={{ width: width || 200, whiteSpace: "pre-line" }}
          className="font-[Sarasa_UI_CL] p-2 bg-transparent flex flex-col gap-2"
        >
          <div className="flex justify-between">
            <div
              className="text-xl"
              onClick={(_e) => {
                if (onClick) onClick();
              }}
            >
              {title}
            </div>
          </div>

          <div className="text-sm">{content}</div>
        </div>
      </Html>
    </group>
  );
}
