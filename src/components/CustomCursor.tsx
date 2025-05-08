"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Check if the device is a touch device
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0,
      )
    }

    // Run the check immediately
    checkTouchDevice()

    // Also check on resize in case of device orientation changes or external displays
    window.addEventListener("resize", checkTouchDevice)

    // Only set up mouse events if not a touch device
    if (!isTouchDevice) {
      const updatePosition = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY })
      }

      const handleMouseDown = () => setClicked(true)
      const handleMouseUp = () => setClicked(false)

      const handleMouseEnter = () => setHidden(false)
      const handleMouseLeave = () => setHidden(true)

      document.addEventListener("mousemove", updatePosition)
      document.addEventListener("mousedown", handleMouseDown)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("mouseenter", handleMouseEnter)
      document.addEventListener("mouseleave", handleMouseLeave)

      // Add event listeners for all interactive elements
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })

      return () => {
        window.removeEventListener("resize", checkTouchDevice)
        document.removeEventListener("mousemove", updatePosition)
        document.removeEventListener("mousedown", handleMouseDown)
        document.removeEventListener("mouseup", handleMouseUp)
        document.removeEventListener("mouseenter", handleMouseEnter)
        document.removeEventListener("mouseleave", handleMouseLeave)

        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", () => setLinkHovered(true))
          el.removeEventListener("mouseleave", () => setLinkHovered(false))
        })
      }
    }

    return () => {
      window.removeEventListener("resize", checkTouchDevice)
    }
  }, [isTouchDevice])

  // Dynamically update link hover detection when DOM changes
  useEffect(() => {
    // Skip for touch devices
    if (isTouchDevice) return

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [isTouchDevice])

  // Don't render the custom cursor on touch devices
  if (isTouchDevice) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - (linkHovered ? 24 : 4),
          y: position.y - (linkHovered ? 24 : 4),
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width: linkHovered ? 48 : clicked ? 16 : 8,
            height: linkHovered ? 48 : clicked ? 16 : 8,
            borderRadius: "50%",
            backgroundColor: clicked ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.8)",
          }}
          transition={{ duration: 0.15 }}
        >
          {linkHovered && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1.5, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.5)", borderStyle: "solid" }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-white pointer-events-none z-50"
        animate={{
          x: position.x,
          y: position.y,
          opacity: hidden ? 0 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 30 }}
      />
    </>
  )
}
