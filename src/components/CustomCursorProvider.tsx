"use client"

import { useIsTouchDevice } from "./useIsTouchDevice"
import { CustomCursor } from "./CustomCursor"

export function CustomCursorProvider() {
  const isTouchDevice = useIsTouchDevice()

  // Only render the custom cursor on non-touch devices
  if (isTouchDevice) return null

  return <CustomCursor />
}
