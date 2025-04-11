import { useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { motion, PanInfo, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 4; // 总档位数
const STEP_ANGLE = 15; // 每档角度（360/24=15°）
const MAX_ANGLE = (TOTAL_STEPS - 1) * STEP_ANGLE; // 最大旋转角度（45°）
const SPRING_CONFIG = { damping: 10, stiffness: 200, restDelta: 0.1 };
const SENSITIVITY = 0.2; // 拖动灵敏度

const RotatableKnob = ({
  show = true,
  items,
  stageIndex,
  onChange,
}: {
  show?: boolean;
  items: { icon: any; title: string }[];
  stageIndex?: number;
  onChange?: (step: number) => void;
}) => {
  const itemCount = 24;
  const radius = isMobile? 1050 / 2 : 1600 / 2; // 圆盘半径
  // const radius = 1130 / 2;
  const height = isMobile? 70 : 30; // 圆盘显示高度

  const [step, setStep] = useState(stageIndex || 0);
  const currentRotation = useRef(0); // 拖动过程中的临时角度

  // react-spring 旋转动画
  const rotate = useSpring(-step * STEP_ANGLE, SPRING_CONFIG);

  const onPan = (_event: any, info: PanInfo) => {
    // 实时拖动时的临时角度计算

    const delta = -info.offset.x * SENSITIVITY;
    const startRotation = step * STEP_ANGLE;
    const rawAngle = startRotation + delta;

    // 角度边界限制
    const clampedAngle = Math.min(Math.max(rawAngle, 0), MAX_ANGLE);

    currentRotation.current = clampedAngle;
    rotate.jump(-clampedAngle);
  };

  const onPanEnd = (_event: any, _info: any) => {
    const targetStep = Math.round(-rotate.get() / STEP_ANGLE);
    const finalAngle = targetStep * STEP_ANGLE;
    currentRotation.current = finalAngle;
    setStep(targetStep);
    if (onChange) onChange(targetStep);
    rotate.set(-finalAngle);
  };

  return (
    <div
      style={{
        bottom: show ? `-${radius * 2-height}px` : `-${radius * 2 + 200}px`,
      }}
      className={cn(
        "absolute left-1/2",
        "select-none",
        "transition-all duration-1000"
      )}
    >
      <div
        style={{
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          bottom: `${70}px`,
        }}
        className={cn(
          "absolute -translate-x-1/2",
          "rounded-full",
          "bg-gradient-to-b from-gray-600 to-white to-[1.5%]",
          "shadow-2xl"
        )}
      ></div>
      <motion.div
        dragListener
        onPan={onPan}
        onPanEnd={onPanEnd}
        style={{
          rotate,
          width: `${radius * 2 + 100}px`,
          height: `${radius * 2 + 100}px`,
          bottom: `${20}px`,
        }}
        className={cn(
          "absolute -translate-x-1/2",
          "rounded-full",
          "bg-transparent",
          "touch-none cursor-grab"
        )}
      >
        <div
          style={{
            width: `${radius * 2 - 1}px`,
            height: `${radius * 2 - 1}px`,
          }}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "rounded-full",
            "bg-gradient-to-r from-zinc-10 via-white to-white"
          )}
        ></div>
        {items.map((item, index) => {
          const isSelect = index === step;
          return (
            <div
              key={index}
              style={{
                transform: `rotate(${(index * 360) / itemCount}deg)`,
              }}
              className={cn(
                "absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2 ",
                "transition",
                isSelect || isMobile ? "opacity-100" : "opacity-30"
              )}
            >
              <div
                style={{ top: `-${radius}px` }}
                className="absolute -translate-x-1/2"
              >
                <div
                  className={cn(
                    "absolute top-[24px] -translate-x-1/2 -translate-y-1/2",
                    "w-24",
                    "text-center text-stone-950 text-sm font-['Montserrat']",
                    isSelect ? "font-bold" : "font-medium"
                  )}
                >
                  {item.title}
                </div>
                <div
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2",
                    "w-[5px] h-[5px]",
                    "bg-stone-950 rounded-full"
                  )}
                ></div>
                <div className="absolute -translate-x-1/2 bottom-3">
                  {item.icon}
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
      <div
        style={{
          bottom: `${radius * 2}px`,
        }}
        className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2",
          "w-[1px] h-[20px]",
          "bg-black"
        )}
      ></div>
      <div
        style={{
          bottom: `${radius * 2 + 20}px`,
        }}
        className={cn(
          "absolute left-1/2 -translate-x-1/2",
          "rounded-full size-[8px]",
          "bg-black"
        )}
      ></div>
    </div>
  );
};

export default RotatableKnob;
