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
import { cn } from "./lib/utils";
import { TeamCarousel } from "./components/TeamCarousel";


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
      const newOpacity = Math.max(
        0,
        0.5 - (scrollPosition / homeHeight) * 1.5
      );
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
) => {ref.current?.scrollIntoView({ behavior: "instant" });
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
      description: "无需额外下载软件，点击网页即刻触达。",
    },
    {
      id: 4,
      image: "/images/Highlights/Muti.png?height=400&width=600",
      title: "多端适配",
      description: "在电脑、平板、手机、会议大屏等终端上随时随地运行。",
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


  // Team members data with more entries
    const teamMembers = [
      {
        name: "Dr. Alex Morgan",
        role: "Lead Researcher",
        image: "/src/icons/Heart.svg?height=400&width=400",
        bio: "Ph.D. in Computer Science with 15+ years of experience in AI and machine learning.",
      },
      {
        name: "Dr. Jamie Chen",
        role: "Data Scientist",
        image: "/src/icons/Heart.svg?height=400&width=400",
        bio: "Expert in statistical modeling and big data analytics with publications in top journals.",
      },
      {
        name: "Dr. Sam Wilson",
        role: "UX Researcher",
        image: "/src/icons/Heart.svg?height=400&width=400",
        bio: "Specializes in human-computer interaction and user-centered design methodologies.",
      },
      {
        name: "Dr. Taylor Reed",
        role: "Technology Lead",
        image: "/src/icons/Heart.svg?height=400&width=400",
        bio: "Systems architect with expertise in scalable infrastructure and emerging technologies.",
      },
      {
        name: "Dr. Jordan Lee",
        role: "Biomedical Engineer",
        image: "/src/icons/Heart.svg?height=400&width=400",
        bio: "Specializes in cardiac modeling and simulation with a focus on translational medicine.",
      },
      {
        name: "Dr. Casey Zhang",
        role: "Computational Physicist",
        image: "/src/icons/Heart.svg?height=400&width=400",
        bio: "Expert in multi-physics simulations and high-performance computing for biological systems.",
      },
      {
        name: "Dr. Riley Patel",
        role: "Clinical Advisor",
        image: "/src/icons/Heart.svg?height=400&width=400",
        bio: "Cardiologist with extensive experience in applying computational models to clinical practice.",
      },
      {
        name: "Dr. Morgan Smith",
        role: "Research Coordinator",
        image: "/src/icons/Heart.svg?height=400&width=400",
        bio: "Manages cross-disciplinary research initiatives and coordinates international collaborations.",
      },
    ]

  // 把类型提上来，这样更简洁，而且可以用三元组来简化代码
   const HomeTitleClass = cn(
    "relative flex flex-col justify-center item-center md:items-left gap-2 md:gap-4 grow",
    "font-['Montserrat'] text-center md:text-left",
    "w-full px-10"
   );


  return (
    <main className="relative">
      {/* Home Section */}
      <section
        ref={homeRef}
        className="h-svh w-screen relative bg-black text-white
         overflow-hidden  bg-cover bg-center bg-no-repeat bg-scroll"
        style={{ backgroundImage:"url('/images/HomeBackground.png?height=1920&width=1080')",}}
      >
        <div
          className="absolute w-full h-full bg-black transition-opacity duration-300"
          style={{ opacity: maskOpacity }}

        />
        <div className="flex flex-col w-full h-full  ">
          {/* <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className={HomeTitleClass}
          > */}
          <div className={HomeTitleClass} >
            <h1 className="text-6xl md:text-9xl font-semibold tracking-normal 
            motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md">
              可视心脏
            </h1>
            <h2 className="text-2xl  md:text-6xl font-bold md:px-5
            motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md ">
              Visible Heart
          </h2>
            <h2 className="text-xs md:text-2xl  md:px-5 tracking-normal
            motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md ">
              Multi-Scale and Multi-Physics Cardiac Model
            </h2>
          </div>
          {/* </motion.div> */}

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
        className="min-h-screen w-full flex flex-col items-center justify-center bg-white text-black py-20"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold  font-['Montserrat'] text-center mb-20 md:mb-40 ">
              由临床需求驱动。
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h3 className="text-lg  md:text-2xl font-semibold mb-1 font-['Montserrat'] ">
                心脏数字孪生
              </h3>
              <h3 className="text-lg  md:text-2xl font-semibold mb-4 font-['Montserrat']">
                For Cardiac Digital Twins
              </h3>
              <p className=" text-sm md:text-lg mb-6 text-gray-700 font-['Montserrat']">
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
                className="w-full h-auto rounded-xl overflow-hidden shadow-2xl 
                 active:rotate-x-50 hover:rotate-z-45 transition-transform duration-500"
              />
            </motion.div>
          </div>
       
          <div className="flex justify-center mt-20 intersect-once ">
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
        className="min-h-svh w-full flex flex-col items-center justify-center bg-black text-white py-10 md:py-25"
      >
        <div className="container mx-auto px-2 md:px-6 lg:px-8 center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            // viewport={{ once: true, margin: "-100px" }}
            // className="text-center "
          >
            <h2 className="text-3xl md:text-5xl font-bold mt-10  font-['Montserrat'] text-[#BBBCE2] text-center">
              无需学习，自然上手。
            </h2>
          </motion.div>

          <div className="h-full container relative ">
            <div
              className="h-[55%] w-[47%]  absolute top-[13%] left-[26.5%] md:rounded-2xl rounded overflow-hidden "
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

          <div className="text-center text-[10px] md:text-base md-4 md:-mt-30 text-[#BBBCE2]  ">
            <p>双击进入全屏，点击标签双指缩放进行穿梭</p>
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

      {/* Precision Medicine Section */}
      <section
        ref={precisionMedicineRef}
        className="min-h-svh w-full flex flex-col items-center justify-center bg-gray-200 text-black py-10"
      >
        <div className="container max-w-6xl mx-auto px-4 mt-1 md:mt-30">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            // viewport={{ once: true, margin: "-100px" }}
            className="text-center md:text-center "
          >
            <h2 className="font-bold mb-4 text-3xl md:text-5xl">让医学预见</h2>
            <h2 className="font-bold mb-8 text-2xl  md:text-5xl">
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
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6 "
            >
              <p className=" max-w-3xl mt-10 mx-auto text-1xl md:text-3xl  font-['Montserrat'] ">
                可视人 - 物理人 - 生理人
              </p>
              <Button
                variant="default"
                className="rounded-full px-8 py-6 text-lg bg-orange-500 hover:bg-orange-600 border-none mt-10"
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
              // viewport={{ once: true, margin: "-100px" }}
              className="text-left"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Montserrat']">
                探索的脚步
              </h2>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-['Montserrat']">
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
                  className="text-blue-500 hover:text-blue-700 text-lg flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(teamRef);
                  }}
                >
                  进一步了解 <span className="ml-1">&#62;</span>
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
        <div className="container max-w-6xl mx-auto px-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            // viewport={{ once: true, margin: "-100px" }}
            className=" mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              研究团队
            </h2>
            <p className="text-center mt-6 max-w-3xl mx-auto text-gray-700 font-['Montserrat'] text-balance">
              Meet the brilliant minds behind our groundbreaking research and
              innovation.
            </p>

            <p className=" text-left mt-6 max-w-3xl mx-auto text-gray-700 text-blance font-['Montserrat']">
              经血管植入器械研究院由院长王建安院士领衔，
              团队聚焦经血管植入器械的重大需求，结合高端植介入医疗器械产业的发展趋势，
              建立由临床问题驱动，医学、工程和信息多学科联动的创新模式，突破新一代经血管植介入器械的关键技术，
              打造世界一流的经血管植入器械研发、诊疗中心和人才高地。
              研究院主要研究方向包括：生物力学和近生理检测装备、临床大数据和人工智能、生物医用材料与植介入器械、
              多模态影像数据和数据挖掘、器械体内失效机理、
              器械全生命周期性能优化设计、器械临床转化与应用。
            </p>
          </motion.div>

          <TeamCarousel members={teamMembers} />

          {/* <div className="h-[20vh] w-full">
            <TouchParticleText text="contact us" color="#9ade00" height="100%" />
          </div> */}

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
      <footer className="sticky bottom-0 w-full bg-black/80 text-white py-4 z-10">
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
