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
import TouchParticleText from "./components/TouchParticleText";


function Home() {
  const intensity = 20;
  const color = new Color(intensity, intensity, intensity);
  // const [showZoomable, setShowZoomable] = useState(false);
  const homeRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);
  const precisionMedicineRef = useRef<HTMLDivElement>(null)
  const explorationRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null);

  //State for mask opacity and parallax effects
  const [maskOpacity, setMaskOpacity] = useState(0.5);

  //Handle scroll to update mask opacity and parallax effects
  useEffect(() => {
    const handleScroll = () => {
      if (!homeRef.current) return;
      // Get the height of the home section
      const homeHeight = homeRef.current.offsetHeight;
      // Calculate how far we've scrolled
      const scrollPosition = window.scrollY;
      // Calculate opacity based on scroll position
      // Start with 0.7 opacity and fade to 0 as we scroll through the home section
      const newOpacity = Math.max(0.1,0.5 - (scrollPosition / homeHeight) * 1.1);
      setMaskOpacity(newOpacity);
    };
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


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
      console.log(sectionId);
      if (sectionId === "3d") {
        scrollToSectionInstantly(interactiveRef);
      }
    }
  }, [location]);

  // Sample data for the carousel
  const carouselItems = [
    {
      id: 1,
      image: "/images/Highlights/CoronaryArtery_v002.png?height=400&width=600",
      title: "从宏观到微观",
      description: "多尺度心脏模型，跨层级解析心血管的生理和病理机制.",
    },
    {
      id: 2,
      image: "/images/Highlights/FreeTouch_v001.png?height=400&width=600",
      title: "超简单上手",
      description: "用你习惯的缩放、旋转、拖拽手势，自由探索心脏的各个部分。",
    },
    {
      id: 3,
      image: "/images/Highlights/nDisplay.png?height=400&width=600",
      title: "一键直达",
      description:
        "无需额外下载软件，点击网页即刻触达。",
    },
    {
      id: 4,
      image: "/images/Highlights/Muti.png?height=400&width=600",
      title: "多端适配",
      description:
        "在电脑、平板、手机、会议大屏等终端上随时随地运行。",
    },
    {
      id: 5,
      image: "/images/Highlights/Valve_v002.png?height=400&width=600",
      title: "生理模块",
      description: "生动呈现心脏收缩与舒张的动态模拟过程及血流动力学模拟。",
    },
    {
      id: 6,
      image: "/images/Highlights/Valve.png?height=400&width=600",
      title: "病理模块",
      description: "展示疾病在时间尺度上的动态演示，点击出现相关信息。",
    },
    {
      id: 7,
      image: "/images/Highlights/DigtalTwin_v002.png?height=400&width=600",
      title: "个性化模型",
      description:
        "基于患者真实影像数据生成个性化心脏模型，精准反映个体心脏实际情况。",
    },
  ];

  return (
    <main className="relative">
      {/* Home Section */}
      <section
        ref={homeRef}
        className="min-h-svh w-screen flex flex-col items-center justify-center relative bg-black text-white
         overflow-hidden  bg-cover bg-center bg-no-repeat bg-scroll "
        style={{
          backgroundImage:
          "url('/images/HomeBackground.png?height=1920&width=1080')",
        }}
      >
        <div
          className="absolute inset-0 w-full h-full bg-black  transition-opacity duration-300 z-10"
          // style={{ opacity: maskOpacity }}
          style={{ opacity: 0.5 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-20 flex flex-col items-center justify-center text-center "
        >
          <h1 className="text-4xl md:text-8xl font-bold mb-4 font-['Montserrat']">
            可视心脏
          </h1>
          {/* <h2 className="text-lg   md:text-5xl font-bold mb-4">
            Travel Heart
          </h2> */}
          <h2 className="text-xs   md:text-3xl font-semibold mb-4 font-['Montserrat']">
            Multi-Scale and Multi-Physics Cardiac Model
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
            className="rounded-full animate-bounce "
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
          >
            <h2 className="text-3xl md:text-5xl font-bold  font-['Montserrat'] text-center mb-16">
              由临床需求驱动。
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-1 font-['Montserrat']">
                心脏数字孪生 
              </h3>
              <h3 className="text-1xl font-semibold mb-4 font-['Montserrat']">
                For Cardiac Digital Twins
              </h3>
              <p className="text-lg mb-6 text-gray-700 font-['Montserrat']">
                根据患者特定的临床数据开发的数据驱动的心血管系统计算模型可以帮助改进诊断和个性化治疗。
                目前，心血管力学的数据驱动计算建模相关研究成果，大多仅存于学术论文，缺乏直观的可视化呈现与交互式应用。
                本项目聚焦突破这一现状，以直观的可视化精彩呈现多尺度心血管建模、心脏血流模拟、瓣膜力学模拟等复杂研究，实现更广泛的应用。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img
                src="/images/human.png?height=600&width=800"
                alt="Project background"
                className="w-full h-auto rounded-xl overflow-hidden shadow-2xl"
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
          >
            <h2 className="text-3xl md:text-5xl font-bold font-['Montserrat'] text-center mb-16 text-pretty">
              创新看得到，摸得着。
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
        className="h-full w-full flex flex-col items-center justify-center bg-black text-white py-20 "
      >
        <div className="container mx-auto px-2 md:px-6 lg:px-8 center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            // viewport={{ once: true, margin: "-100px" }}
            // className="text-center "
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-2  font-['Montserrat'] text-[#BBBCE2] text-center">
            无需学习，自然上手。
            </h2>
          </motion.div>

            <div className="h-full container relative ">
              <div
                className="h-[55%] w-[47%]  absolute top-[13%] left-[26.5%] md:rounded-2xl rounded overflow-hidden"
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
                src={"/images/HandheldiPad.png"}
                alt="iPad"
                className="relative w-full object-contain center pointer-events-none"
              />
            </div>

            <div className="text-center text-[10px] md:text-base mt-4 text-[#BBBCE2]  ">
              <p>双击进入全屏，点击标签双指缩放进行穿梭</p>
              <p>Double-click to explore the full 3D experience</p>
            </div> 
  

          <div className="flex justify-center mt-5">
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
      
      {/* Precision Medicine Section */}
      <section
        ref={precisionMedicineRef}
        className="h-full w-full flex flex-col items-center justify-center bg-white text-black py-20"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            // viewport={{ once: true, margin: "-100px" }}
            className="text-left md:text-center "
          >
            <h2 className="font-bold mb-4 text-3xl md:text-5xl">让医学预见</h2>
            <h2 className="font-bold mb-8 text-2xl  md:text-5xl">精准到每一帧生命动态。</h2>
            
            <video
              src="/movie/HeartBeat.mp4"
              autoPlay
              loop
              muted
              
              className="w-full h-auto mt-8 rounded-lg  md:rounded-4xl shadow-lg"/>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <p className=" max-w-3xl mx-auto text-1xl md:text-3xl font-bold  font-['Montserrat'] ">可视人 - 物理人 - 生理人</p>
              <Button
                variant="default"
                className="rounded-full px-8 py-6 text-lg bg-orange-500 hover:bg-orange-600 border-none mt-8"
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-left"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Montserrat']">探索的脚步</h2>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-['Montserrat']">从未停歇。</h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-6"
              >
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-700 text-lg flex items-center"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(teamRef)
                  }}
                >
                  About us <span className="ml-1">&#62;</span>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
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
            </motion.div>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section
        ref={teamRef}
        className="min-h-screen w-full flex flex-col items-center justify-center bg-white text-black py-20"
      >
        <div className="container max-w-6xl mx-auto px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className=" mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">研究团队</h2>
            {/* <div className="h-1 w-20 bg-black mx-auto"></div> */}
            <p className="text-center mt-6 max-w-3xl mx-auto text-gray-700 font-['Montserrat'] text-balance">
             Meet the brilliant minds behind our groundbreaking research and innovation.
            </p>

            <p className=" text-left mt-6 max-w-3xl mx-auto text-gray-700 text-blance font-['Montserrat']">
            经血管植入器械研究院由院长王建安院士领衔，
            团队聚焦经血管植入器械的重大需求，结合高端植介入医疗器械产业的发展趋势，
            建立由临床问题驱动，医学、工程和信息多学科联动的创新模式，突破新一代经血管植介入器械的关键技术，
            打造世界一流的经血管植入器械研发、诊疗中心和人才高地。
            研究院主要研究方向包括：生物力学和近生理检测装备、临床大数据和人工智能、生物医用材料与植介入器械、
            多模态影像数据和数据挖掘、器械体内失效机理、 器械全生命周期性能优化设计、器械临床转化与应用。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-[1000px]">
            {[
              {
                name: "王建安",
                role: "Scientist",
                image: "/placeholder.svg?height=400&width=400",
                bio: "主要研究方向：心脏瓣膜病介入治疗和系列器械研发、冠状动脉功能评价、心肌损伤和修复的重要机制揭示等处于国际领先地位",
              },
              {
                name: "计剑",
                role: "Scientist",
                image: "/placeholder.svg?height=400&width=400",
                bio: "主要研究方向：材料学、生物医用高分子-生物医用界面的仿生组装与修饰",
              },
              {
                name: "吴健",
                role: "Scientist",
                image: "/placeholder.svg?height=400&width=400",
                bio: "主要研究方向：医学人工智能",
              },
              {
                name: "Dr. Taylor Reed",
                role: "Scientist",
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
                className="group h-[400px] [transform-style:preserve-3d] transition-all duration-500"
              >
 
                <div className="relative h-full w-full rounded-xl [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all duration-500">
             
                  <div className="absolute inset-0 bg-gray-50 rounded-xl overflow-hidden shadow-lg backface-hidden">
                    <div className="h-64 overflow-hidden">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gray-500 mb-3">{member.role}</p>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl p-6 [transform:rotateY(180deg)] backface-hidden shadow-lg flex flex-col justify-center">
                    <h3 className="text-xl font-semibold mb-4">
                      {member.name}
                    </h3>
                    <p className="text-gray-300 mb-4">{member.role}</p>
                    <p className="text-gray-100">{member.bio}</p>
                    <div className="mt-auto pt-4 flex justify-center space-x-4">
                      <a
                        href="#"
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        <span className="sr-only">Twitter</span>
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="h-[20vh] w-full">
            <TouchParticleText text="contact us" color="#9ade00" height="100%" />
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
