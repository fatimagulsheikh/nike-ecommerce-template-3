// "use client"

// import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";
// import { allProducts, four } from "@/sanity/lib/querirs";
// import { Product } from "../../../../types/products";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { addToCart } from "@/app/actions/actions";
// import Swal from "sweetalert2";




// const SHOES = () => {
//   const [Products, setProducts] = useState<Product[]>([])

//   useEffect(() => {
//     async function fetchproducts() {
//         const fetchedProducts : Product[] = await client.fetch(allProducts)
//         setProducts(fetchedProducts)
//     }
//     fetchproducts()
// },[]);

// const handleAddToCart = (e: React.MouseEvent, product:Product) => {
//     e.preventDefault()
//     Swal.fire({
//         position : "top-right",
//         icon : "success",
//         title : `${product.productName} added to cart`,
//         showConfirmButton : false,
//         timer : 1000
//     })
//     addToCart(product)

// }

// return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-6 text-center">Our Latest Shoes</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {Products.map((product) => (
//             <div
//              key={product._id}
//              className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
//              >
//                 <Link href={`/product/${product.slug.current}`}>
//                 {product.image && (
//                     <Image
//                     src={urlFor(product.image).url()}
//                     alt="image"
//                     // alt={product.productName}
//                     width={200}
//                     height={200}
//                     className="w-full h-48 object-cover rounded-md"
//                     />
//                 )}
//                 <h2 className="text-lg font-semibold mt-4">{product.productName}</h2>
//                 <p className="text-gray-500 mt-2">
//                     {product.price ? `$${product.price}` : "Price not available"}
//                 </p>
//                 <button 
//                 className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-300 ease-out"
//                 onClick={(e) => handleAddToCart(e, product)}
//                 >
//                     Add To Cart
//                 </button>
//                 </Link>
//             </div>
//         ))}
//     </div>
//     </div>
// );
// };

// export default SHOES;












'use client'

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { allProducts } from "@/sanity/lib/querirs";
import { Product } from "../../../../types/products";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { addToCart } from "@/app/actions/actions";
import Swal from "sweetalert2";

const SHOES = () => {
  const [Products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchproducts() {
      const fetchedProducts: Product[] = await client.fetch(allProducts);
      setProducts(fetchedProducts);
    }
    fetchproducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: `${product.productName} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12 tracking-wide">
        Our Latest <span className="text-blue-600">Shoes</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Products.map((product) => (
          <div
            key={product._id}
            className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <Link href={`/product/${product.slug.current}`} className="block">
              {product.image && (
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.productName}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">{product.productName}</h2>
                <p className="text-gray-600 mt-2">
                  {product.price ? `$${product.price}` : "Price not available"}
                </p>
                <button
                  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Add To Cart
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SHOES;
