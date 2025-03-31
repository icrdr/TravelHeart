import { Box3, Mesh, Object3D, Quaternion, Vector3 } from "three";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const string2URI = (string: string) => {
  let uri = string.replace(/\s+/g, "").replace(/[\x00-\x1F]/g, "");
  return encodeURIComponent(uri);
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const DEFAULT_SENSOR_HEIGHT = 36;

export function quaternionToSphericalAngles(quaternion: Quaternion): {
  azimuth: number;
  polar: number;
} {
  const initialDir = new Vector3(0, 0, 1);
  const currentDir = initialDir.clone().applyQuaternion(quaternion).normalize();

  // 计算极角（垂直角度）
  const polar = Math.acos(currentDir.y);

  // 计算方位角（水平角度）
  let azimuth = 0;
  if (Math.abs(currentDir.x) > 1e-6 || Math.abs(currentDir.z) > 1e-6) {
    azimuth = Math.atan2(currentDir.x, -currentDir.z);
  }

  return { azimuth, polar };
}

export function direactionToSphericalAngles(dir: Vector3): {
  azimuth: number;
  polar: number;
} {
  const currentDir = dir.clone().normalize(); // 确保归一化（可选，但推荐）

  // 钳制 y 分量在 [-1, 1] 范围内，避免 NaN
  const clampedY = Math.max(-1, Math.min(1, currentDir.y));

  // 计算极角（垂直角度）
  const polar = Math.acos(-clampedY);

  const azimuth = Math.atan2(-currentDir.x, -currentDir.z);

  return { azimuth, polar };
}

export const getAbsolutePosition = (object: Object3D): Vector3 => {
  const position = new Vector3();
  object.getWorldPosition(position); // 自动计算世界坐标
  return position;
};

export const getBBoxCenter = (object: Object3D[] | Object3D): Vector3 => {
  const objects = Array.isArray(object) ? object : [object];
  const center = new Vector3();
  const bbox = new Box3();
  for (const object of objects) {
    if (object instanceof Mesh) {
      bbox.union(new Box3().setFromObject(object));
    } else {
      const position = getAbsolutePosition(object);
      bbox.union(new Box3(position, position));
    }
  }
  bbox.getCenter(center);
  return center;
};

// Zoom 转 FOV（需要相机初始 FOV）
export const zoomToFov = (zoom: number, initialFov: number): number =>
  initialFov / zoom;

// FOV 转 Zoom（需要相机初始 FOV）
export const fovToZoom = (targetFov: number, initialFov: number): number =>
  initialFov / targetFov;

// FOV 转物理焦距（需要传感器高度）
export const fovToFocalLength = (
  fov: number,
  sensorHeight: number = DEFAULT_SENSOR_HEIGHT
): number => {
  const fovRad = (fov * Math.PI) / 180; // 转为弧度
  return sensorHeight / 2 / Math.tan(fovRad / 2);
};

// 物理焦距转 FOV（需要传感器高度）
export const focalLengthToFov = (
  focalLength: number,
  sensorHeight: number = DEFAULT_SENSOR_HEIGHT
): number => {
  const fovRad = 2 * Math.atan(sensorHeight / (2 * focalLength));
  return (fovRad * 180) / Math.PI; // 转为角度
};
