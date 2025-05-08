"use client"

import { useState, useEffect } from "react"

export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Function to check if the device is a touch device
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0,
      )
    }

    // Check immediately on mount
    checkTouchDevice()

    // Also check on resize in case of device orientation changes or external displays
    window.addEventListener("resize", checkTouchDevice)

    return () => {
      window.removeEventListener("resize", checkTouchDevice)
    }
  }, [])

  return isTouchDevice
}
