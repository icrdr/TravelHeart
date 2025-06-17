"use client"

import { cn } from "../../lib/utils"
import type React from "react"
import { 
  createContext, 
  useState, 
  useContext, 
  useRef, 
  useEffect, 
  useCallback,
  ElementType,
  ComponentPropsWithoutRef,
  ReactNode,
  ForwardedRef,
  forwardRef
} from "react"

const MouseEnterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined>(undefined)

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 25
    const y = (e.clientY - top - height / 2) / 25
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
    containerRef.current.style.transition = "none"
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsMouseEntered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return
    setIsMouseEntered(false)
    containerRef.current.style.transition = "transform 0.5s ease"
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`
  }, [])

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("py-20 flex items-center justify-center", containerClassName)}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn("flex items-center justify-center relative", className)}
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.1s ease-out",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div 
      className={cn("h-96 w-96", className)}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  )
}

type CardItemProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">

type CardItemRef<T extends ElementType> = React.ComponentPropsWithRef<T> extends { ref?: React.Ref<infer R> }
  ? R
  : never;

// Define the function as a non-generic, using "div" as the default element type
const CardItemInner = (
  {
    as,
    children,
    className,
    translateX = 0,
    translateY = 0,
    translateZ = 0,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    ...rest
  }: CardItemProps<"div">,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const Tag = as || "div";
  const internalRef = useRef<HTMLElement>(null);
  const [isMouseEntered] = useMouseEnter();

  // 合并refs
  const combinedRef = useCallback((element: HTMLElement | null) => {
    internalRef.current = element;

    if (typeof ref === "function") {
      ref(element as HTMLDivElement);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = element as HTMLDivElement;
    }
  }, [ref]);

  useEffect(() => {
    const element = internalRef.current;
    if (!element) return;

    const transform = isMouseEntered 
      ? `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : "translate3d(0, 0, 0) rotateX(0) rotateY(0) rotateZ(0)";

    element.style.transform = transform;
    element.style.transition = "transform 0.2s ease";
    element.style.transformStyle = "preserve-3d";
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag
      ref={combinedRef as any}
      className={cn("w-fit", className)}
      {...rest}
      style={{
        ...(rest.style as React.CSSProperties),
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </Tag>
  );
};

export const CardItem = forwardRef(CardItemInner);

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext)
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a CardContainer")
  }
  return context
}