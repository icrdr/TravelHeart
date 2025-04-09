import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import {
  createContext,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  EffectComposer,
  N8AO,
  SMAA,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { isMobile } from "react-device-detect";
import { Color, Spherical } from "three";
import { animated, useSpring } from "@react-spring/three";
import { config } from "@react-spring/web";
import { AutoFocusDOF, LensDistortionn } from "@/effects";
import Label from "@/props/Label";
import { fovToZoom, sleep } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router";
import { Bookmark, CameraData } from "./BlenderScene";
import { ToneMappingMode } from "postprocessing";

const AnimatedLensDistortionn = animated(LensDistortionn);

export interface SceneRefMethods {
  resetCamera: (enableTransition: boolean) => void;
  moveCamera: (to: Partial<CameraData>, enableTransition?: boolean) => void;
}

export type SceneContext = {
  onLoad?: (bookmarks: Bookmark[]) => void;
  onDispose?: (bookmarks: Bookmark[]) => void;
};

export type label = {
  bookmark: string;
  title: string;
  subtitle?: string;
};

export const SceneContext = createContext<SceneContext | null>(null);

export default function Scene({
  enabledControl = true,
  bokehScale = 0,
  labels = [],
  bookmarks = [],
  polarRotateSpeed,
  azimuthRotateSpeed,
  truckSpeed,
  dollySpeed,
  children,
  fog,
  bg,
  ref,
}: {
  enabledControl?: boolean;
  bokehScale?: number;
  bookmarks?: Bookmark[];
  labels?: label[];
  polarRotateSpeed?: number;
  azimuthRotateSpeed?: number;
  truckSpeed?: number;
  dollySpeed?: number;
  children: any;
  fog?: [string | Color, number, number];
  bg?: [string | Color];
  ref?: Ref<SceneRefMethods>;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const prevLocationRef = useRef(location);
  const [bookmarkList, setBookmarkList] = useState<Bookmark[]>(bookmarks);
  const [distortion, setDistortion] = useState(0);

  const springs = useSpring({
    distortion,
    config: config.slow,
    onRest: () => {
      setDistortion(0);
    },
  });

  const d = springs.distortion.to([-1, 1], [-1, 1]);
  const f = springs.distortion
    .to((value) => (value > 0 ? value : 0))
    .to([0, 0.5], [1, 0.05]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isTransitionRef = useRef(false);

  const [controls, setControls] = useState<CameraControls | null>(null);

  // 当 Three.js 实际创建控制器时触发
  const handleControlsReady = useCallback((instance: CameraControls) => {
    setControls(instance);
  }, []);

  const startTransition = () => {
    isTransitionRef.current = true;
    controls!.disconnect();
  };

  const endTransition = () => {
    if (isTransitionRef.current) {
      controls!.connect(canvasRef.current!);
      isTransitionRef.current = false;
    }
  };

  useEffect(() => {
    if (!controls) return;
    controls.addEventListener("control", async () => {
      if (isTransitionRef.current) return;
      if (controls.distance >= controls.maxDistance) {
        if (!!location.hash) {
          console.log("start leap out");
          navigate(location.pathname);
        } else {
          const pathComponents = location.pathname.split("/");
          const last = pathComponents.pop();
          const nextPathname = pathComponents.join("/") + `#${last}`;
          if (!!bookmarkList?.find((b) => b.name === nextPathname)) {
            console.log("start leap out");
            startTransition();
            controls.zoom(-100, true);
            await sleep(200);
            navigate(nextPathname);
          }
        }
      } else if (controls.distance <= controls.minDistance) {
        if (!location.hash) return;
        const nextPathname =
          location.pathname + location.hash.replace("#", "/");
        if (!!bookmarkList?.find((b) => b.name === nextPathname)) {
          console.log("start leap in");
          console.log(nextPathname);
          startTransition();
          controls.zoomTo(100, true);
          await sleep(200);
          navigate(nextPathname);
        }
      }
    });
    controls.addEventListener("rest", () => {
      console.log("rest");
      endTransition();
    });
    return () => {
      controls.dispose();
    };
  }, [controls, location]);

  useEffect(() => {
    if (!controls) return;
    const url = location.pathname + location.hash;
    const bookmark = bookmarkList?.find((b) => b.name === url);
    if (!bookmark) return;
    const prevLocation = prevLocationRef.current;
    if (
      prevLocation.pathname === location.pathname &&
      prevLocation.hash !== location.hash
    ) {
      // jump between labels in same level of view
      moveCamera(bookmark.data, true);
    } else if (
      prevLocation.pathname !== location.pathname &&
      prevLocation.pathname.includes(location.pathname)
    ) {
      // leap from low level to high level
      console.log("end leap out");
      moveCamera(bookmark.data);
      controls.dolly(10);
      startTransition();
      controls.dolly(-5, true);
    } else {
      console.log("end leap in");
      moveCamera(bookmark.data);
      controls.dolly(-10);
      startTransition();
      controls.dolly(5, true);
    }
  }, [controls, location]);

  useEffect(() => {
    prevLocationRef.current = location;
  }, [location]);

  const sceneContext = useMemo(() => {
    const onLoad = (bookmarks: Bookmark[]) => {
      bookmarkList.push(...bookmarks);
      setBookmarkList(bookmarkList);
    };

    const onDispose = (bookmarks: Bookmark[]) => {
      setBookmarkList(
        bookmarkList.filter(
          (b) => bookmarks.findIndex((_b) => _b.name === b.name) < 0
        )
      );
    };

    return {
      onLoad,
      onDispose,
    };
  }, []);

  const moveCamera = (to: Partial<CameraData>, enableTransition = false) => {
    if (!controls) return;
    if (enableTransition) {
      startTransition();
    }

    if (to.fov && "fov" in controls.camera) {
      const prevFOV = controls.camera.fov as number;
      controls.zoomTo(fovToZoom(to.fov, prevFOV), enableTransition);
    }
    if (to.position)
      controls.setPosition(
        to.position.x,
        to.position.y,
        to.position.z,
        enableTransition
      );

    if (to.lookat)
      controls.setTarget(
        to.lookat.x,
        to.lookat.y,
        to.lookat.z,
        enableTransition
      );

    const spherical = new Spherical();
    controls.getSpherical(spherical);
    controls.minDistance = spherical.radius * 0.05;
    controls.maxDistance = spherical.radius * 0.8;
    // controls.minAzimuthAngle = spherical.theta - 2;
    // controls.maxAzimuthAngle = spherical.theta + 2;
    controls.minPolarAngle = Math.max(spherical.phi - 0.5, 0);
    controls.maxPolarAngle = Math.min(spherical.phi + 0.5, Math.PI);
  };

  const resetCamera = (_enableTransition = false) => {
    // if (sceneData) moveCamera(sceneData.initCamera, enableTransition);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        resetCamera,
        moveCamera,
      };
    },
    [bookmarkList, controls]
  );

  return (
    <SceneContext.Provider value={sceneContext}>
      <Canvas
        onScroll={(_e) => {
          console.log("first");
        }}
        ref={canvasRef}
        shadows
        gl={{
          antialias: false,
          logarithmicDepthBuffer: false,
        }}
        dpr={isMobile ? 0.5 : 1}
      >
        <group name="main" visible={!!controls}>
          {children}
        </group>
        {fog && <fog attach="fog" args={fog} />}
        {bg && <color attach="background" args={bg} />}

        {controls &&
          labels
            .filter((l) => l.bookmark.split("#")[0] === location.pathname)
            .map((l, i) => {
              const bookmark = bookmarkList.find((b) => b.name === l.bookmark);
              console.log(bookmark);
              if (!bookmark) return null;
              return (
                <Label
                  key={i}
                  position={bookmark!.data.lookat}
                  title={l.title}
                  content={l.subtitle}
                  onClick={() => {
                    if (
                      !isTransitionRef.current &&
                      location.pathname + location.hash !== bookmark!.name
                    )
                      navigate(bookmark!.name);
                  }}
                />
              );
            })}
        <CameraControls
          ref={handleControlsReady}
          makeDefault
          smoothTime={0.5}
          polarRotateSpeed={enabledControl ? polarRotateSpeed || 0.5 : 0}
          azimuthRotateSpeed={enabledControl ? azimuthRotateSpeed || 0.5 : 0}
          truckSpeed={enabledControl ? truckSpeed || 0.5 : 0}
          dollySpeed={enabledControl ? dollySpeed || 0.5 : 0}
          restThreshold={0.1}
        />

        <EffectComposer enabled={true} multisampling={0}>
          <>
            {!isMobile && (
              <>
                <AutoFocusDOF
                  bokehScale={bokehScale} //blur scale
                  resolution={4096} //resolution (decrease for performance)
                  // mouseFocus //if false, the center of the screen will be the focus
                  focusSpeed={0.5} // milliseconds to focus a new detected mesh
                  focalLength={0.003} //how far the focus should go
                />
                <N8AO
                  color="#f5efe6"
                  aoRadius={5}
                  intensity={40}
                  aoSamples={32}
                  denoiseSamples={8}
                />
              </>
            )}
          </>
          <Vignette
            offset={0.5} // vignette offset
            darkness={0.5} // vignette darkness
            eskil={false} // Eskil's vignette technique
          />
          <AnimatedLensDistortionn distortion={d} focalLength={f} />
          <SMAA />
          <ToneMapping mode={ToneMappingMode.AGX} />
        </EffectComposer>
      </Canvas>
    </SceneContext.Provider>
  );
}
