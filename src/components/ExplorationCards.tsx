"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card" 

const cardData = [
  {
    id: 1,
    title: "Science",
    description: "“动动”密码子表，让 “ 冷门 ” 密码子编码非天然氨基酸",
    image:"/images/Research/Sci.png",
    link: "https://tiiri.z2hospital.com//list/338e6715b028488aa27d714173607da6/bc2af150c19f4e4b8fba002a4857a11e.html",
  },
  {
    id: 2,
    title: "AM",
    description: "浙江大学计剑教授团队《AM》: 聚阳离子界面增强的可喷涂多功能水凝胶涂层构筑新策略",
    image:"/images/Research/PCRHydrogelCoating.png",
    link: "https://tiiri.z2hospital.com//list/338e6715b028488aa27d714173607da6/2f20ee9fce264f57a98f5dcdcf48309e.html",
  },
  {
    id: 3,
    title: "Nature Chemistry",
    description: "林世贤团队合作在 Nature Chemistry上发文报道生物正交剪切反应的新突破",
    image:"/images/Research/Trp-CAGE.png",
    link: "https://tiiri.z2hospital.com//list/338e6715b028488aa27d714173607da6/6a20e62624e54cdabb811de5efd0c829.html",
  },
  {
    id: 4,
    title: "Circulation",
    description: "王建安院士/朱伟教授团队发现新的心脏瓣膜病致病",
    image:"/images/Research/BicuspidAoticValve.png",
    link: "https://mp.weixin.qq.com/s/49E15tshPEFAC2Smm95tfA",
  },
  {
    id: 5,
    title: "Hepatology",
    description: "胡新央/吴蓉蓉团队揭示FMO2通过抑制SREBP1的细胞器转位改善非酒精性脂肪性肝病",
    image:"/images/Research/FM02.png",
    link: "https://mp.weixin.qq.com/s/AiDyp85-DWnGqqVFC4_iqg",
  },
    {
    id: 6,
    title: "Circulation",
    description: "浙江大学陈静海研究员团队发现减少线粒体蛋白翻译促进心肌细胞增殖与心脏再生",
    image:"/images/Research/Circulation.png",
    link: "https://mp.weixin.qq.com/s/kvzNmEFbrSiNB5-AGdaWPQ",
  },
]

export default function ThreeDCardDemo() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cardData.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cardData.length - 1 ? 0 : prevIndex + 1))
  }

  const currentCard = cardData[currentIndex]

  return (
    <div className="flex flex-col items-center space-y-8">
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
            {currentCard.title}
          </CardItem>
          <CardItem as="div" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
            {currentCard.description}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <img
              src={currentCard.image || "/placeholder.svg"}
              className="h-65 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-all duration-300"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <a 
              href={currentCard.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              <CardItem translateZ={20} as="div">
                Learn more →
              </CardItem>
            </a>
            <button
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              type="button"
            >
              <CardItem
                translateZ={20}
                className=""
              >
                科研动态
              </CardItem>
            </button>
          </div>
        </CardBody>
      </CardContainer>

      {/* Navigation Controls */}
      <div className="flex items-center space-x-4">
        <Button onClick={goToPrevious} variant="outline" size="icon" className="rounded-full">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Card Indicators */}
        <div className="flex space-x-2">
          {cardData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? "bg-black dark:bg-white" : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>

        <Button onClick={goToNext} variant="outline" size="icon" className="rounded-full">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Card Counter */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {currentIndex + 1} of {cardData.length}
      </p>
    </div>
  )
}