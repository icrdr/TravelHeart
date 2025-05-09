"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
}

interface TeamCarouselProps {
  members: TeamMember[]
}

export function TeamCarousel({ members }: TeamCarouselProps) {
  const [width, setWidth] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [hoveringLeft, setHoveringLeft] = useState(false)
  const [hoveringRight, setHoveringRight] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoScrollRef = useRef<number | null>(null)
  const scrollAmount = useRef(0)

  // 不同设备的滚动速度
  const scrollSpeedDesktop = 2
  const scrollSpeediPad = 4
  const scrollSpeedMobile = 1

  // Calculate the width of the carousel
  useEffect(() => {
    if (carouselRef.current) {
      // Total width of all items + gaps - visible width
      const scrollWidth = carouselRef.current.scrollWidth
      const clientWidth = carouselRef.current.clientWidth
      setWidth(scrollWidth - clientWidth)
    }

    const handleResize = () => {
      if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth
        const clientWidth = carouselRef.current.clientWidth
        setWidth(scrollWidth - clientWidth)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [members])

  // Auto-scrolling functionality
  useEffect(() => {
    const isiPad = /iPad|Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const getScrollSpeed = () => {
      if (isiPad) {
        return scrollSpeediPad
      } else if (isMobile) {
        return scrollSpeedMobile
      } else {
        return scrollSpeedDesktop
      }
    }

    const startAutoScroll = () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current)

      const step = () => {
        if (isPaused || isDragging) return;
        if (isMobile) return; // 手机无自动滚动效果

        let currentScrollSpeed = getScrollSpeed();
        if (hoveringLeft) {
          currentScrollSpeed = -currentScrollSpeed * 2
        } else if (hoveringRight) {
          currentScrollSpeed = currentScrollSpeed * 2
        }

        if (carouselRef.current) {
          scrollAmount.current += currentScrollSpeed

          // Smoothly transition when reaching the end
          if (scrollAmount.current >= width) {
            scrollAmount.current = 0
            carouselRef.current.scrollLeft = 0
          } else if (scrollAmount.current < 0) {
            scrollAmount.current = width
            carouselRef.current.scrollLeft = width
          }

          carouselRef.current.scrollLeft = scrollAmount.current
        }
        autoScrollRef.current = requestAnimationFrame(step)
      }

      autoScrollRef.current = requestAnimationFrame(step)
    }

    startAutoScroll()

    return () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current)
    }
  }, [width, isPaused, isDragging, hoveringLeft, hoveringRight])

  // Update scrollAmount when user manually scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current && !isDragging) {
        scrollAmount.current = carouselRef.current.scrollLeft
      }
    }

    carouselRef.current?.addEventListener("scroll", handleScroll)
    return () => carouselRef.current?.removeEventListener("scroll", handleScroll)
  }, [isDragging])

  // Manual navigation with smoother transitions
  const scroll = (direction: "left" | "right") => {
    setIsPaused(true); // 点击时暂停自动滚动
    if (carouselRef.current) {
      const isiPad = /iPad|Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
      // iPad 左右控制器点击后卡片滑动更多
      const cardWidth = isiPad? (350 + 6) * 2 : 350 + 6; 
      const targetScroll = direction === "left"
        ? Math.max(0, scrollAmount.current - cardWidth)
        : Math.min(width, scrollAmount.current + cardWidth);

      // Smooth transition to the target scroll position
      const startTime = Date.now();
      const startScroll = carouselRef.current.scrollLeft;
      const duration = 300; // ms

      const animateScroll = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out

        if (carouselRef.current) {
          const currentScroll = startScroll + (targetScroll - startScroll) * easeOut;
          carouselRef.current.scrollLeft = currentScroll;
          scrollAmount.current = currentScroll;

          // Handle seamless loop at the end
          if (scrollAmount.current >= width) {
            scrollAmount.current = 0;
            carouselRef.current.scrollLeft = 0;
          } else if (scrollAmount.current < 0) {
            scrollAmount.current = width;
            carouselRef.current.scrollLeft = width;
          }

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          } else {
            setIsPaused(false); // 动画结束后恢复自动滚动
          }
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  // Duplicate members to create the illusion of an infinite loop
  const extendedMembers = [...members, ...members, ...members]; // 增加重复次数确保无限滚动

  // Handle touch events for better iPad/mobile support
  useEffect(() => {
    if (!carouselRef.current) return;

    let startX = 0;
    let startScrollLeft = 0;
    let touchStartTime = 0;
    let touchEndTime = 0;
    let lastTouchX = 0;
    let touchVelocity = 0;

    const handleTouchStart = (e: TouchEvent) => {
      setIsPaused(true);
      setIsDragging(true);
      startX = e.touches[0].clientX;
      startScrollLeft = carouselRef.current!.scrollLeft;
      touchStartTime = Date.now();
      lastTouchX = startX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !carouselRef.current) return;

      const touchX = e.touches[0].clientX;
      const walk = touchX - startX;
      carouselRef.current.scrollLeft = startScrollLeft - walk;
      scrollAmount.current = carouselRef.current.scrollLeft;

      // Calculate velocity for momentum scrolling
      const now = Date.now();
      const dt = now - touchStartTime;
      if (dt > 0) {
        touchVelocity = (lastTouchX - touchX) / dt;
      }
      lastTouchX = touchX;
      touchStartTime = now;
    };

    const handleTouchEnd = () => {
      if (!carouselRef.current) return;

      touchEndTime = Date.now();
      const touchDuration = touchEndTime - touchStartTime;

      // Apply momentum scrolling if the touch was quick
      if (touchDuration < 300 && Math.abs(touchVelocity) > 0.5) {
        const momentum = touchVelocity * 100; // Adjust this multiplier for desired momentum effect
        const targetScroll = carouselRef.current.scrollLeft + momentum;

        // Animate to the target scroll position
        const startTime = Date.now();
        const startScroll = carouselRef.current.scrollLeft;
        const duration = 500; // ms

        const animateMomentumScroll = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out

          if (carouselRef.current) {
            const currentScroll = startScroll + (targetScroll - startScroll) * easeOut;
            carouselRef.current.scrollLeft = currentScroll;
            scrollAmount.current = currentScroll;

            // Handle seamless loop at the end
            if (scrollAmount.current >= width) {
              scrollAmount.current = 0;
              carouselRef.current.scrollLeft = 0;
            } else if (scrollAmount.current < 0) {
              scrollAmount.current = width;
              carouselRef.current.scrollLeft = width;
            }

            if (progress < 1) {
              requestAnimationFrame(animateMomentumScroll);
            } else {
              // End of animation
              setTimeout(() => {
                setIsDragging(false);
                setIsPaused(false);
              }, 100);
            }
          }
        };

        requestAnimationFrame(animateMomentumScroll);
      } else {
        // No momentum, just end the drag
        setTimeout(() => {
          setIsDragging(false);
          setIsPaused(false);
        }, 100);
      }
    };

    const element = carouselRef.current;
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Navigation buttons */}
      <div
        className="absolute left-1 top-1/2 z-20 -translate-y-1/2 md:left-4 hidden md:block"
        onMouseEnter={() => {
          setHoveringLeft(true);
          setIsPaused(true);
        }}
        onMouseLeave={() => {
          setHoveringLeft(false);
          setIsPaused(false);
          // 鼠标移开左控制器时恢复正常滚动速度
          if (autoScrollRef.current) {
            cancelAnimationFrame(autoScrollRef.current);
            const step = () => {
              const isiPad = /iPad|Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
              const isMobile = /Mobi|Android/i.test(navigator.userAgent);
              if (isPaused || isDragging) return;
              if (isMobile) return;

              let currentScrollSpeed = isiPad? scrollSpeediPad : scrollSpeedDesktop;
              if (carouselRef.current) {
                scrollAmount.current += currentScrollSpeed;
                if (scrollAmount.current >= width) {
                  scrollAmount.current = 0;
                  carouselRef.current.scrollLeft = 0;
                } else if (scrollAmount.current < 0) {
                  scrollAmount.current = width;
                  carouselRef.current.scrollLeft = width;
                }
                carouselRef.current.scrollLeft = scrollAmount.current;
              }
              autoScrollRef.current = requestAnimationFrame(step);
            };
            autoScrollRef.current = requestAnimationFrame(step);
          }
        }}
      >
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-white/90 shadow-md backdrop-blur-sm hover:bg-white"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div
        className="absolute right-1 top-1/2 z-20 -translate-y-1/2 md:right-4 hidden md:block"
        onMouseEnter={() => {
          setHoveringRight(true);
          setIsPaused(true);
        }}
        onMouseLeave={() => {
          setHoveringRight(false);
          setIsPaused(false);
          // 鼠标移开右控制器时恢复正常滚动速度
          if (autoScrollRef.current) {
            cancelAnimationFrame(autoScrollRef.current);
            const step = () => {
              const isiPad = /iPad|Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
              const isMobile = /Mobi|Android/i.test(navigator.userAgent);
              if (isPaused || isDragging) return;
              if (isMobile) return;

              let currentScrollSpeed = isiPad? scrollSpeediPad : scrollSpeedDesktop;
              if (carouselRef.current) {
                scrollAmount.current += currentScrollSpeed;
                if (scrollAmount.current >= width) {
                  scrollAmount.current = 0;
                  carouselRef.current.scrollLeft = 0;
                } else if (scrollAmount.current < 0) {
                  scrollAmount.current = width;
                  carouselRef.current.scrollLeft = width;
                }
                carouselRef.current.scrollLeft = scrollAmount.current;
              }
              autoScrollRef.current = requestAnimationFrame(step);
            };
            autoScrollRef.current = requestAnimationFrame(step);
          }
        }}
      >
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-white/90 shadow-md backdrop-blur-sm hover:bg-white cursor-pointer"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="flex w-full cursor-grab overflow-x-scroll scrollbar-hide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setIsDragging(false);
        }}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => {
          setIsPaused(true);
          setIsDragging(true);
        }}
        onTouchEnd={() => {
          setTimeout(() => {
            setIsDragging(false);
            setIsPaused(false);
          }, 1000); // Delay to allow momentum scrolling to settle
        }}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        <motion.div
          className="flex gap-6 px-8 cursor-pointer"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          {extendedMembers.map((member, index) => (
            <div
              key={index}
              className="group h-[400px] min-w-[280px] max-w-[280px] [transform-style:preserve-3d] transition-all duration-500"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Card container with 3D rotation on hover */}
              <div className="relative h-full w-full rounded-xl [transform-style:preserve-3d] active:[transform:rotateY(180deg)] md:group-hover:[transform:rotateY(180deg)] transition-all duration-500">
                {/* Front of card */}
                <div className="absolute inset-0 bg-gray-50 rounded-xl overflow-hidden shadow-lg backface-hidden">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image || "/src/icons/Heart.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 active:scale-110 md:group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-gray-500 mb-3">{member.role}</p>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl p-6 [transform:rotateY(180deg)] backface-hidden shadow-lg flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-4">{member.name}</h3>
                  <p className="text-gray-300 mb-4">{member.role}</p>
                  <p className="text-gray-100">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      {/* Mobile and iPad swipe hint */}
      <div className="md:hidden text-center text-gray-500 mt-4">
        左右滑动卡片查看更多
      </div>
    </div>
  );
}
    