import React from "react";
import { StarIcon } from "@heroicons/react/24/outline";

const texts = [
  "MIỄN PHÍ ĐỔI HÀNG 30 NGÀY!",
  "SĂN DEAL CHILL NGÀY LỄ",
  "LƯƠNG VỀ SALE TO",
  "MUA NHIỀU GIẢM SÂU",
  "ƯU ĐÃI ĐẶC BIỆT CUỐI TUẦN!",
  "SALE KHỦNG CHÀO THÁNG MỚI!",
  "GIẢM GIÁ ĐẬM ĐÀ MÙA HÈ!",
];

const Marquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap bg-blue-700 text-white p-4 min-h-12 flex items-center">
      <div className="inline-block animate-marquee text-center ">
        {texts.map((text, index) => (
          <span key={index} className="inline-flex items-center mr-4 text-lg">
            {text}{" "}
            <StarIcon className="w-6 h-6 ml-2 relative top-[-2px]"></StarIcon>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
