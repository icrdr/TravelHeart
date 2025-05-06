
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Scene from "./props/Scene";
import Heart from "./scenes/TravelHeart/Heart";
import { Color } from "three";
import { InfiniteCarousel } from "./components/InfiniteCarousel";


function Home() {
  const intensity = 20;
  const color = new Color(intensity, intensity, intensity);
  // const [showZoomable, setShowZoomable] = useState(false);
  const homeRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);


  //State for mask opacity and parallax effects
  const [maskOpacity, setMaskOpacity] = useState(0.8);
  
  //Handle scroll to update mask opacity and parallax effects
  useEffect(() => {
    const handleScroll = () => {
      if (!homeRef.current) return
      // Get the height of the home section
      const homeHeight = homeRef.current.offsetHeight
      // Calculate how far we've scrolled
      const scrollPosition = window.scrollY
      // Calculate opacity based on scroll position
      // Start with 0.7 opacity and fade to 0 as we scroll through the home section
      const newOpacity = Math.max(0.6, 0.8 - (scrollPosition / homeHeight) * 1.2)
      setMaskOpacity(newOpacity)}
    // Add scroll event listener
     window.addEventListener("scroll", handleScroll)
    // Clean up
    return () => window.removeEventListener("scroll", handleScroll)
    }, [])

  // Handle parallax effect on background image
  const scrollToSection= (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToSectionInstantly = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "instant" });
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/travelheart");
  };

  const location = useLocation();
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const sectionId = hash.slice(1);
      console.log(sectionId)
      if (sectionId === "3d") {
        scrollToSectionInstantly(interactiveRef);
      }
    }
  }, [location]);

    // Sample data for the carousel
    const carouselItems = [
      {
        id: 1,
        image: "/placeholder.svg?height=400&width=600",
        title: "从宏观到微观",
        description: "多尺度心脏模型，跨层级解析心血管的生理和病理机制.",
      },
      {
        id: 2,
        image: "/placeholder.svg?height=400&width=600",
        title: "轻松交互  自由视角",
        description: "通过简单的手势，轻松地探索心脏的各个部分。",
      },
      {
        id: 3,
        image: "/placeholder.svg?height=400&width=600",
        title: "多端兼容  一键直达",
        description: "无需安装额外软件，通过浏览器即可访问，支持多种设备和操作系统。",
      },
      {
        id: 4,
        image: "/placeholder.svg?height=400&width=600",
        title: "生理模块",
        description: "生动呈现心脏收缩与舒张的动态模拟过程及血流动力学模拟。",
      },
      {
        id: 5,
        image: "/placeholder.svg?height=400&width=600",
        title: "病理模块",
        description: "展示疾病在时间尺度上的动态演示，点击出现相关信息。",
      },
      {
        id: 6,
        image: "/placeholder.svg?height=400&width=600",
        title: "个性化模型",
        description: "基于患者真实影像数据生成个性化心脏模型，精准反映个体心脏实际情况。",
      },
    ]

  return (
    <main className="relative">
      {/* Home Section */}
      <section
        ref={homeRef}
        className="min-h-svh w-screen flex flex-col items-center justify-center relative bg-black text-white
         overflow-hidden  bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/HeroHeart_v002.png?height=1920&width=1080')"}}
      >
        <div
          className="absolute inset-0 w-full h-full bg-black  transition-opacity duration-300 z-10"
          style={{ opacity: maskOpacity }}
          // style={{ opacity: 0.9 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-20 flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-6xl sm:text-6xl md:text-8xl font-bold mb-4 ">
            可视心脏
          </h1>
          <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold mb-4">
            Travel Heart
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className=" bottom-40 z-20 "
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full animate-bounce"
            onClick={() => scrollToSection(backgroundRef)}
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </section>

      {/* Background Section */}
      <section
        ref={backgroundRef}
        className="min-h-screen w-full flex flex-col items-center justify-center bg-white text-black py-20"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Montserrat']">
              Project Background
            </h2>
            <div className="h-1 w-20 bg-black mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-semibold mb-4 font-['Montserrat']">Our Journey</h3>
              <p className="text-lg mb-6 text-gray-700 font-['Montserrat']">
                本项目旨在通过直观的可视化展示和交互展示心血管力学的计算建模成果，并结合多尺度建模、四腔心脏模型、血流动力学模拟等技术，
                进一步探索深度学习与物理驱动方法在心血管力学中的应用。
              </p>
            </motion.div>

             <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src="/images/human.png?height=600&width=800"
                alt="Project background"
                className="w-full h-auto"
              />
            </motion.div> 
          </div>

          <div className="flex justify-center mt-16">
            <Button
              variant="outline"
              onClick={() => scrollToSection(highlightsRef)}
              className="rounded-full px-8"
            >
              Explore Highlights
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section
        ref={highlightsRef}
        className="min-h-svh w-full flex flex-col items-center justify-center bg-gray-100 text-black py-20"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Montserrat']">
              Project Highlights
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <main className="container mx-auto py-4">
             <InfiniteCarousel items={carouselItems} />
            </main>
          </motion.div>

          <div className="flex justify-center mt-16">
            <Button
              variant="outline"
              onClick={() => scrollToSection(interactiveRef)}
              className="rounded-full px-8"
            >
              Explore 3D Interactive
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive 3D Section */}
      <section
        id="interactive"
        ref={interactiveRef}
        className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white py-20 "
      >
        {/* h-svh表示100svh,代表视口安全高度：在移动设备上,浏览器的地址栏等界面元素可能会在用户滚动或与页面交互时出现或隐藏,
        这会导致视口高度发生变化。使用100svh可以让元素(如一个全屏的容器)在这种动态变化的环境中,
        尽可能地占满可视的安全区域,避免出现因为视口高度变化导致布局混乱的情况。 */}
        {/* 响应式填充：container类根据当前的断点设置最大宽度,mx-auto将其水平居中,而填充类(px-4sm:px-6 lg:px-8)确保在更大的屏幕上内容不会紧贴边缘。 */}
        <div className="container mx-auto px-4sm:px-6 lg:px-8 center">
          {/* 文字 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Montserrat'] ">
              Interactive Experience
            </h2>
            <div className="text-center mt-8 text-gray-400 ">
              <p>双击进入全屏体验</p>
              <p>Double-click to explore the full 3D experience</p>
            </div>
            {/* <img
              src={"/images/Ipad.png"}
              alt="iPad"
              className="  object-contain center"
            /> */}
          </motion.div>
          {/* 背景图 */}
          {/* <div className=" center h-[800px] w-full object-contain  bg-center bg-no-repeat "
            style={{ backgroundImage: "url('/images/Ipad.png?height=1920&width=1080')"}}>
          </div> */}
        
          <motion.div
            initial={{ opacity: 0}}
            whileInView={{ opacity: 1}}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="container h-full w-full  relative"
            onDoubleClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick();
              }
            }}
            aria-label="Open 3D interactive experience (double-click to activate)"
          >
            <div className=" absolute  h-[28em] w-[60em] items-center justify-center px-9 py-3 top-40 z-10">
              <Scene bg={[color]} >
                <Heart visible={true} />
              </Scene>
            </div>
            <img
              src={"/images/Ipad.png"}
              alt="iPad"
              className=" container object-contain center "
            />
            
          </motion.div>
          
          {/* 底下按键 */}
          <div className="flex justify-center mt-16">
            <Button
              variant="outline"
              onClick={() => scrollToSection(teamRef)}
              className="rounded-full px-8 border-white text-black hover:bg-white hover:text-blue-500"
            >
              Meet Our Team
            </Button>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section
        ref={teamRef}
        className="min-h-screen w-full flex flex-col items-center justify-center bg-white text-black py-20"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Montserrat']">
              Research Team
            </h2>
            <div className="h-1 w-20 bg-black mx-auto"></div>
            <p className="mt-6 max-w-2xl mx-auto text-gray-700">
              Meet the brilliant minds behind our groundbreaking research and
              innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. xxx",
                role: "xxx Researcher",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Ph.D. in xxx Science with x+ years of experience in AI and machine learning.",
              },
              {
                name: "Dr. xxx",
                role: "xxx Scientist",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Expert in xxx and big data analytics with publications in top journals.",
              },
              {
                name: "Dr. xxx",
                role: "xxx Researcher",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Specializes in xxx interaction and user-centered design methodologies.",
              },
              {
                name: "Dr. xxx",
                role: "xxx Lead",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Systems architect with expertise in scalable infrastructure and emerging technologies.",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-500 mb-3">{member.role}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 text-center"
          >
            <Button
              variant="default"
              onClick={() => scrollToSection(homeRef)}
              className="rounded-full px-8"
            >
              Back to Top
            </Button>
          </motion.div>
        </div>
      </section>
      {/* Sticky Footer */}
      <footer className="sticky bottom-0 w-full bg-black text-white py-4 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-2 md:mb-0">
              © 2025 Research Project. All rights reserved.
            </div>
            {/* <div className="flex items-center space-x-6">
              <a
                href="mailto:contact@research-project.com"
                className="text-sm hover:text-gray-300"
              >
                contact@research-project.com
              </a>
              <a href="tel:+1234567890" className="text-sm hover:text-gray-300">
                +86 (12345678910)
              </a>
            </div> */}
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;
