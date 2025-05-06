"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  items: {
    id: number
    image: string
    title: string
    description: string
  }[]
  autoScroll?: boolean
  autoScrollInterval?: number
  className?: string
}

export function InfiniteCarousel({ items, autoScroll = true, autoScrollInterval = 3000, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Clone items to create the illusion of infinite scrolling
  const extendedItems = [...items, ...items, ...items]

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1
      // If we reach the end of the first set, jump back to the beginning of the second set
      if (nextIndex === items.length * 2) {
        return items.length
      }
      return nextIndex
    })
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1
      // If we reach the beginning of the second set, jump to the end of the second set
      if (nextIndex < 0) {
        return items.length * 2 - 1
      }
      return nextIndex
    })
  }

  // Auto scroll functionality
  useEffect(() => {
    if (!autoScroll || isHovering) return

    const interval = setInterval(() => {
      goToNext()
    }, autoScrollInterval)

    return () => clearInterval(interval)
  }, [autoScroll, autoScrollInterval, isHovering])

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={carouselRef}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex * 100) / extendedItems.length}%)`,
          width: `${extendedItems.length * 100}%`,
        }}
      >
        {extendedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="relative w-full shrink-0 px-4"
            style={{ width: `${100 / extendedItems.length}%` }}
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-80"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 shadow-md backdrop-blur-sm hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 shadow-md backdrop-blur-sm hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              currentIndex % items.length === index ? "bg-primary" : "bg-gray-300 dark:bg-gray-600",
            )}
            onClick={() => setCurrentIndex(index + items.length)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
