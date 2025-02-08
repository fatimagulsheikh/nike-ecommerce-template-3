// "use client"
// import React, {useEffect, useRef, useState} from 'react';
// import Slider from "react-slick";
// import arrowRightIcon from "@public/images/icons/right-arrow.svg";
// import arrowLeftIcon from "@public/images/icons/left-arrow.svg";
// import Card from './Cards/Card';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Image from 'next/image';
// import { fetchProductListByMens } from '../api/productApi';
// import { ProductCardTypes } from '../@types/types';

// const ShopMensSlider = () => {
//     const sliderRef = useRef<Slider | null>(null);
//     const [mensProducts, setmensProducts] = useState<ProductCardTypes[]>([]);

//     // Fetching Mens products using useEffect
//     useEffect(() => {
//       const fetchData = async () => {
//         const products = await fetchProductListByMens();
//         setmensProducts(products);
//       };
//       fetchData();
//     }, []);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <>
//     <div className="flex mb-4 items-center justify-end">
//           <div className="flex items-center gap-4">
//             <p>Shop Men's</p>
//             <div className="bg-[#F5F5F5] px-5 py-4 rounded-full cursor-pointer" onClick={() => sliderRef.current?.slickPrev()}>
//               <Image src={arrowLeftIcon} alt="Arrow Left"/>
//             </div>
//             <div className="bg-[#E5E5E5] px-5 py-4 rounded-full cursor-pointer" onClick={() => sliderRef.current?.slickNext()}>
//               <Image src={arrowRightIcon} alt="Arrow Right"/>
//             </div>
//           </div>
//         </div>
//     <div className="pb-10">
//       <Slider {...settings} ref={sliderRef}>
//         {mensProducts.map((product) => (
//           <Card
//             key={product._id}
//             _id={product._id}
//             status={product.status}
//             name={product.name}
//             color={product.color}
//             currentPrice={product.currentPrice}
//             discountedPrice={product.discountedPrice}
//             image_url={product.image_url}
//           />
//         ))}
//       </Slider>
//     </div>
//     </>
//   );
// }

// export default ShopMensSlider












"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import arrowRightIcon from "@public/images/icons/right-arrow.svg";
import arrowLeftIcon from "@public/images/icons/left-arrow.svg";
import Card from "./Cards/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { fetchProductListByMens } from "../api/productApi";
import { ProductCardTypes } from "../@types/types";

const ShopMensSlider = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [mensProducts, setMensProducts] = useState<ProductCardTypes[]>([]);

  // Fetching Men's products using useEffect
  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProductListByMens();
      setMensProducts(products);
    };
    fetchData();
  }, []);

  // Format price with validation and price adjustment
const formatPrice = (price: any, isDiscounted: boolean): number => {
  // Check if the price is a valid number
  if (isNaN(price) || price === undefined || price === null) {
    console.warn(`Invalid price value: ${price}`);
    return 199; // Default value if price is invalid
  }

  let adjustedPrice = price;

  // Increase price by 10% for current price (when isDiscounted is false)
  if (!isDiscounted) {
    adjustedPrice = adjustedPrice * 1.1; // Increase by 10%
  } else {
    // Decrease price by 10% for discounted price
    adjustedPrice = adjustedPrice * 0.9; // Decrease by 10%
  }

  return parseFloat(adjustedPrice.toFixed(2)); // Return as number
};

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex mb-8 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">Shop Men's</h2>
          <div
            className="bg-[#F5F5F5] p-4 rounded-full cursor-pointer hover:bg-[#e0e0e0] transition-all"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <Image src={arrowLeftIcon} alt="Arrow Left" />
          </div>
          <div
            className="bg-[#E5E5E5] p-4 rounded-full cursor-pointer hover:bg-[#d0d0d0] transition-all"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <Image src={arrowRightIcon} alt="Arrow Right" />
          </div>
        </div>
      </div>

      <div className="pb-10 px-4 md:px-8">
        <Slider {...settings} ref={sliderRef}>
          {mensProducts.map((product) => (
            <div key={product._id} className="flex justify-center">
              <Card
                _id={product._id}
                status={product.status}
                name={product.name}
                color={product.color}
                currentPrice={formatPrice(product.currentPrice, false)} // False means current price, which will increase by 10%
                discountedPrice={formatPrice(product.discountedPrice, true)} // True means discounted price, which will decrease by 10%
                image_url={product.image_url}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ShopMensSlider;
