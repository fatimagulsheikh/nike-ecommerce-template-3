// "use client";
// import React, { useEffect, useRef, useState } from 'react';
// import Slider from "react-slick";
// import arrowRightIcon from "@public/images/icons/right-arrow.svg";
// import arrowLeftIcon from "@public/images/icons/left-arrow.svg";
// import Card from './Cards/Card';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Image from 'next/image';
// import { fetchProductListByAirMax } from '../api/productApi';
// import { ProductCardTypes } from '../@types/types';

// const ProductSlider = () => {
//   const sliderRef = useRef<Slider | null>(null);
//   const [airMaxProducts, setAirMaxProducts] = useState<ProductCardTypes[]>([]);

//   // Fetching Air Max products using useEffect
//   useEffect(() => {
//     const fetchData = async () => {
//       const products = await fetchProductListByAirMax();
//       setAirMaxProducts(products);
//     };
//     fetchData();
//   }, []);
  
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
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
//       <div className="flex justify-between mb-4 items-center">
//         <h2 className="font-bold">Best of Air Max</h2>
//         <div className="flex items-center gap-4">
//           <p>Shop</p>
//           <div
//             className="bg-[#F5F5F5] px-5 py-4 rounded-full cursor-pointer"
//             onClick={() => sliderRef.current?.slickPrev()}
//           >
//             <Image src={arrowLeftIcon} alt="Arrow Left" />
//           </div>
//           <div
//             className="bg-[#E5E5E5] px-5 py-4 rounded-full cursor-pointer"
//             onClick={() => sliderRef.current?.slickNext()}
//           >
//             <Image src={arrowRightIcon} alt="Arrow Right" />
//           </div>
//         </div>
//       </div>
//       <div className="pb-10">
//         <Slider {...settings} ref={sliderRef}>
//           {airMaxProducts.map((product) => (
//             <Card
//               key={product._id}
//               _id={product._id}
//               status={product.status}
//               name={product.name}
//               color={product.color}
//               currentPrice={product.currentPrice}
//               discountedPrice={product.discountedPrice}
//               image_url={product.image_url}
//             />
//           ))}
//         </Slider>
//       </div>
//     </>
//   );
// };

// export default ProductSlider;





import Link from "next/link";
import React from "react";

const Air = () => {
  return (
    <div className=" flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-sm font-medium text-gray-500">First Look</p>
        <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
          NIKE AIR MAX PULSE
        </h1>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-600">
          Extreme comfort. Hyper durable. Max volume. Introducing the Air Max
          Pulse
          <br />
          —designed to push you past your limits and help you go to the max.
        </p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button className="px-6 py-2 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 sm:px-8 sm:py-3">
            <Link href="/products">Notify Me</Link>
          </button>
          <button className="px-6 py-2 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 sm:px-8 sm:py-3">
            <Link href="/products">Shop Air Max</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Air;