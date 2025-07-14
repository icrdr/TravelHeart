import React, { useEffect } from "react";
import {  useLocation, useNavigate } from "react-router";
import { useRef} from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Scene from "./props/Scene";
import Heart from "./scenes/TravelHeart/Heart";
import { Color } from "three";
import { InfiniteCarousel } from "./components/InfiniteCarousel";
import { cn } from "./lib/utils";
import { TeamCarousel } from "./components/TeamCarousel";
import Marquee from "./components/Marquee";
import { carouselItems, teamMembers, slices } from "./data.json";
import { isMobile } from "react-device-detect";
import Window from "@/components/Window";
import ThreeDCardDemo from "./components/ExplorationCards";





function Home() {
  const intensity = 20;
  const color = new Color(intensity, intensity, intensity);
  const homeRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);
  const precisionMedicineRef = useRef<HTMLDivElement>(null);
  const explorationRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  //State for mask opacity and parallax effects
  // const [maskOpacity, setMaskOpacity] = useState(0.5);

  //Handle scroll to update mask opacity and parallax effects
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!homeRef.current) return;
  //     const homeHeight = homeRef.current.offsetHeight;
  //     const scrollPosition = window.scrollY;
  //     const newOpacity = Math.max(0, 0.5 - (scrollPosition / homeHeight) * 1.5);
  //     setMaskOpacity(newOpacity);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToSectionInstantly = (
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
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
      // console.log(sectionId);
      if (sectionId === "3d") {
        scrollToSectionInstantly(interactiveRef);
      }
    }
  }, [location]);

  // Sample data for the carousel

  // 把类型提上来，这样更简洁，而且可以用三元组来简化代码
  const homeTitleClass = cn(
    "relative flex flex-col justify-center item-center md:items-left gap-2 xl:gap-4 grow",
    "font-['Montserrat'] text-center",
    "w-full px-10 md:pt-60 xl:px-30"
  );
  const textShowUpClass =
    "motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md";
  const maskClass =
    "absolute w-full h-full bg-gradient-to-b from-transparent to-black transition-opacity duration-300";

  return (
    <main className="relative">
      {/* Home Section */}
      <section
        ref={homeRef}
        className="h-svh w-screen relative bg-[url('/images/Heart.jpg')] text-white
         overflow-hidden  bg-cover bg-center bg-no-repeat bg-scroll"
      >
        <div className={maskClass} />
        <div className="flex flex-col w-full h-full">
          <div className={homeTitleClass}>
            <h1 className={textShowUpClass}>可视心脏</h1>
            <h2>Visible Heart</h2>
            <h3>Multi-Scale and Multi-Physics Cardiac Model</h3>
          </div>
          <div className="flex flex-col items-center justify-center mb-20 ">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full animate-bounce"
              onClick={() => scrollToSection(backgroundRef)}
            >
              <ArrowDown className="h-6 w-6 " />
            </Button>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section
        ref={backgroundRef}
        className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-black py-20"
      >
        <div className="flex flex-col container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold  font-['Montserrat'] text-center mb-40 md:mb-50 tracking-wider">
              由临床需求驱动。
            </h2>
          </motion.div>
          <div className="grid-cols-2 gap-4 items-center ">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative h-[250px] md:h-[500px] w-full flex flex-row-reverse"
            >
              {slices.map((s, index) => {
                const space = isMobile ? 40 : 70;
                const offsetX = (slices.length - index) * space;
                const offsetY = index * 15;
                // const opacity = (2 / slices.length) * (index + 1);
                return (
                  <div
                    key={index}
                    style={{ left: offsetX, top: offsetY }}
                    className={`-rotate-x-20 -rotate-y-40 
                      duration-300 hover:-translate-y-8 active:-translate-y-8 cursor-pointer shrink grow`}
                  >
                    <div className="absolute">
                      <Window title={s.name}>
                        <div
                          className={
                            "relative w-[180px] md:w-[300px] h-[120px] md:h-[200px] overflow-hidden"
                          }
                        >
                          <img
                            src={s.url}
                            className="absolute size-[300px] md:size-[500px] object-cover top-2/3 left-1/2 -translate-1/2"
                          />
                        </div>
                      </Window>
                    </div>
                  </div>
                );
              })}
              <div className="shrink grow">
                <img
                  src="/images/Level/HeartWhite.png"
                  alt="Project background"
                  className="absolute object-contain size-80 md:size-135 -translate-x-1/3 -translate-y-1/3"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative grid-rows-2 gap-6 flex "
            >
              <div>
                <h3 className=" text-base  md:text-1xl font-semibold  font-['Montserrat'] ">
                  心脏数字孪生
                </h3>
                <h3 className=" text-sm md:text-1xl font-semibold  font-['Montserrat'] ">
                  For Cardiac Digital Twins
                </h3>
              </div>
              <p className=" text-sm  md:text-sm mb-20 text-gray-500  font-['Montserrat']  md:max-w-4/5 shrink text-pretty">
                根据患者特定的临床数据开发的数据驱动的心血管系统计算模型可以帮助改进诊断和个性化治疗。
                目前，心血管力学的数据驱动计算建模相关研究成果，大多仅存于学术论文，缺乏直观的可视化呈现与交互式应用。
                本项目聚焦突破这一现状，以直观的可视化精彩呈现多尺度心血管建模、心脏血流模拟、瓣膜力学模拟等复杂研究，实现更广泛的应用。
              </p>
            </motion.div>
          </div>

          <div className="flex justify-center mt-1 intersect-once ">
            <Button
              variant="outline"
              onClick={() => scrollToSection(highlightsRef)}
              className="rounded-full px-8 "
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
          >
            <h2 className="text-3xl md:text-5xl font-bold font-['Montserrat'] text-center mb-16 text-pretty tracking-wider">
              创新看得到。
            </h2>
          </motion.div>

          <main className="container mx-auto font-['Montserrat']">
            <InfiniteCarousel items={carouselItems} />
          </main>

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
        className="min-h-svh w-full flex flex-col items-center justify-center bg-black text-white py-10 md:py-25"
      >
        <div className="container mx-auto px-2 md:px-6 lg:px-8 center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center "
          >
            <h2 className="text-3xl md:text-5xl font-bold mt-1 mb-10 md:mb-20 font-['Montserrat'] text-[#BBBCE2] text-center tracking-wider">
              {/* 无需学习，自然上手。 */}
              多尺度心脏模型。
            </h2>
            
          </motion.div>

          <div className="h-full container relative ">
            <div
              className="h-[58%] w-[65%]  absolute top-[6%] left-[18%] md:rounded-2xl rounded overflow-hidden cursor-grab"
              onDoubleClick={handleClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClick();
                }
              }}
            >
              <Scene bg={[color]}>
                <Heart visible={true} />
              </Scene>
            </div>
            <img
              src={"/images/iPadHand.png"}
              alt="iPad"
              className="relative w-full object-contain center pointer-events-none"
            />
          </div>

          <div className="text-center text-[10px] md:text-base md-4 md:-mt-30 text-[#BBBCE2]  ">
            <p>双击进入全屏，点击标签后双指缩放进行跨尺度穿梭</p>
            <p>Double-click to explore the full 3D experience</p>
          </div>

          <div className="flex justify-center mt-30 md-40">
            <Button
              variant="outline"
              onClick={() => scrollToSection(precisionMedicineRef)}
              className="rounded-full px-8 border-white text-black hover:bg-white hover:text-blue-500"
            >
              Future Research
            </Button>
          </div>
        </div>
      </section>

      {/* Future Research Section */}
      <section
        ref={precisionMedicineRef}
        className="min-h-svh w-full flex flex-col items-center justify-center bg-gray-200 text-black py-10"
      >
        <div className="container max-w-6xl mx-auto px-4 mt-1 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            // viewport={{ once: true, margin: "-100px" }}
            className="text-center md:text-center "
          >
            <h2 className="font-bold mb-4 text-3xl md:text-5xl tracking-wider">
              让医学预见
            </h2>
            <h2 className="font-bold mb-8 text-2xl  md:text-5xl tracking-wider">
              精准到每一帧生命动态。
            </h2>

            <video
              src="/movie/HeartBeat.mp4"
              autoPlay
              loop
              muted
              className="w-full h-auto mt:5 md:mt-20 rounded-lg  md:rounded-4xl shadow-lg"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className=" mt-10 mx-auto text-1xl md:text-2xl  font-['Montserrat'] text-center text-gray-500">
                可视人 - 物理人 - 生理人
              </p>
              <Button
                variant="default"
                className="rounded-full px-8 py-6 text-lg bg-orange-500 hover:bg-orange-600 border-none mt-10 mb-20"
                onClick={() => scrollToSection(explorationRef)}
              >
                <span className="mr-2">+</span> 即将到来
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Exploration Section */}
      <section
        ref={explorationRef}
        className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 text-black py-20"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center ">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              // viewport={{ once: true, margin: "-100px" }}
              className="text-left md:pl-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Montserrat'] tracking-wider">
                探索的脚步
              </h2>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-['Montserrat'] tracking-wider">
                从未停歇。
              </h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-6"
              >
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-700 text-lg  flex items-center font-['Montserrat']"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(teamRef);
                  }}
                >
                  进一步了解 <span className="ml-1">&#62;</span>
                </a>
              </motion.div>
            </motion.div>
            <ThreeDCardDemo/>
            {/* <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-xl overflow-hidden shadow-2xl"
            >      
              <img
                src="/images/Paper.png"
                alt="Library of research materials arranged in a circular pattern with copper hanging lamps"
                className="w-full h-auto"
              />
            </motion.div> */}
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section
        ref={teamRef}
        className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-black py-20"
      >
        <div className="container  mx-auto px-10 mb-18">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            // viewport={{ once: true, margin: "-100px" }}
            // className=" mb-10"
          >
            {/* <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            以临床需求为原点
            </h2> */}
            <h2 className="text-2xl md:text-5xl font-bold mb:2 md:mb-6 text-center  ont-['Montserrat'] tracking-wider">
              这支多学科交叉团队，
            </h2>
            <h2 className="text-2xl  md:text-5xl font-bold mb-6 text-center font-['Montserrat'] tracking-wider">
              用开创性研究重塑未来。
            </h2>
            <h2 className="text-blue-500 hover:text-blue-700 text-sm  mb:text-4xl mb:mt-10 font-bold text-center font-['Montserrat']">
              Meet the brilliant minds !
            </h2>
          </motion.div>
          <TeamCarousel members={teamMembers} />
          <Marquee />

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
