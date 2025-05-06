"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const images = [
  "/slider-10.jpg",
  "/slider-11.jpg",
  "/slider-12.jpg",
  "/slider-13.jpg",
  "/slider-14.jpg",
  "/slider-15.jpg",
];

export default function Slider() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const lengthItems = images.length;

  const goToSlide = (index: number) => {
    setActive(index);
  };

  const nextSlide = () => {
    const nextIndex = active + 1 >= lengthItems ? 0 : active + 1;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = active - 1 < 0 ? lengthItems - 1 : active - 1;
    goToSlide(prevIndex);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  const handleDotClick = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    goToSlide(index);
  };

  return (
    <div className="slider bg-blue-500">
      <div className="slider__container relative mx-auto h-[500px] max-w-[1300px] overflow-hidden bg-red-500">
        {/* Slider content container */}
        <div
          className="slider__content flex transition-transform duration-1000 h-full"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${(100 / images.length) * active}%)`,
          }}
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              className="slider__item w-full flex-shrink-0 h-full"
              style={{ width: `${100 / images.length}%` }}
            >
              <img
                src={src}
                alt={`slider-${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="slider__btn absolute top-1/2 left-0 w-full flex justify-between px-6 -translate-y-1/2 z-10">
          <button
            className="slider__btn-prev ml-10"
            onClick={() => {
              if (intervalRef.current) clearInterval(intervalRef.current);
              prevSlide();
            }}
          >
            <ArrowLeftIcon className="h-[30px] w-[30px] rounded-full bg-white p-1 border border-gray-300 text-blue-500 hover:border-blue-500 hover:bg-gray-200 transition cursor-pointer" />
          </button>
          <button
            className="slider__btn-next mr-10"
            onClick={() => {
              if (intervalRef.current) clearInterval(intervalRef.current);
              nextSlide();
            }}
          >
            <ArrowRightIcon className="h-[30px] w-[30px] rounded-full bg-white p-1 border border-gray-300 text-blue-500 hover:border-blue-500 hover:bg-gray-200 transition cursor-pointer" />
          </button>
        </div>

        {/* Dots */}
        <ul className="slider__dots absolute bottom-[10px] left-0 w-full m-0 p-0 flex justify-center z-10">
          {images.map((_, index) => (
            <li
              key={index}
              className={`list-none h-[10px] ${
                active === index ? "w-[30px]" : "w-[10px]"
              } bg-white mx-[10px] rounded-[20px] transition-all duration-500 cursor-pointer`}
              onClick={() => handleDotClick(index)}
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
