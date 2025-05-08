import React from "react";

function About() {
  return (
    <div className="w-full h-screen px-36 py-40 bg-neutral-100 inline-flex flex-col justify-between items-center overflow-hidden">
      <div className="text-center justify-start text-black text-6xl font-bold font-['Source_Han_Sans_CN'] tracking-[6.40px]">
        让医学预见
        <br />
        精准到每一帧生命动态。
      </div>
      <div className="w-[1465px] text-center justify-start text-black text-xl font-normal font-['Source_Han_Sans_CN'] tracking-widest">
        可视人-物理人-生理人
        <br />
        融合多学科前沿技术，从组学到定制化治疗方案，让医疗干预直达核心，开启医学精准时代。
      </div>
      <div className="w-96 h-32 relative">
        <div className="w-96 h-28 left-0 top-[9px] absolute bg-orange-600 rounded-[56px]" />
        <div className="w-52 h-32 left-[101px] top-0 absolute justify-start text-neutral-100 text-4xl font-medium font-['Source_Han_Sans_CN'] leading-[130px] tracking-[4px]">
          + 即将到来
        </div>
      </div>
    </div>
  );
}

export default About;
