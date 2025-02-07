// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { getCartItems } from "@/app/actions/actions";
// import Link from "next/link";
// import { Product } from "../../../types/products";
// import { urlFor } from "@/sanity/lib/image";
// import { CgChevronRight } from "react-icons/cg";
// import Swal from "sweetalert2";
// import { client } from "@/sanity/lib/client";

// export default function CheckoutPage() {
//   const [cartItems, setCartItems] = useState<Product[]>([]);
//   const [discount, setDiscount] = useState<number>(0);
//   const [formValues, setFormValues] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     city: "",
//     zipCode: "",
//     phone: "",
//     email: "",
//   });

//   const [formErrors, setFormErrors] = useState({
//     firstName: false,
//     lastName: false,
//     address: false,
//     city: false,
//     zipCode: false,
//     phone: false,
//     email: false,
//   });

//   useEffect(() => {
//     setCartItems(getCartItems());
//     const appliedDiscount = localStorage.getItem("appliedDiscount");
//     if (appliedDiscount) {
//       setDiscount(Number(appliedDiscount));
//     }
//   }, []);

//   const subtotal = cartItems.reduce(
//     (total, item) => total + item.price * item.inventory,
//     0
//   );
//   const total = Math.max(subtotal - discount, 0);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValues({
//       ...formValues,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const validateForm = () => {
//     const errors = {
//       firstName: !formValues.firstName,
//       lastName: !formValues.lastName,
//       address: !formValues.address,
//       city: !formValues.city,
//       zipCode: !formValues.zipCode,
//       phone: !formValues.phone,
//       email: !formValues.email,
//     };
//     setFormErrors(errors);
//     return Object.values(errors).every((error) => !error);
//   };

//   const handlePlaceOrder = async () => {
//     if (!validateForm()) {
//       Swal.fire("Error!", "Please fill in all the fields before proceeding.", "error");
//       return;
//     }

//     Swal.fire({
//       title: "Processing your order...",
//       text: "Please wait a moment.",
//       icon: "info",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Proceed",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const orderData = {
//           _type: "order",
//           firstName: formValues.firstName,
//           lastName: formValues.lastName,
//           address: formValues.address,
//           city: formValues.city,
//           zipCode: formValues.zipCode,
//           phone: formValues.phone,
//           email: formValues.email,
//           cartItems: cartItems.map((item) => ({
//             _type: "reference",
//             _ref: item._id,
//           })),
//           total: total,
//           discount: discount,
//           orderDate: new Date().toISOString(),
//         };

//         try {
//           await client.create(orderData);
//           localStorage.removeItem("appliedDiscount");
//           Swal.fire("Success!", "Your order has been successfully processed!", "success");
//         } catch (error) {
//           console.error("Error creating order", error);
//           Swal.fire("Error!", "Something went wrong. Please try again later.", "error");
//         }
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Breadcrumb */}
//       <div className="mt-6">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <nav className="flex items-center gap-2 py-4">
//             <Link href="/cart" className="text-[#666666] hover:text-black transition text-sm">
//               Cart
//             </Link>
//             <CgChevronRight className="w-4 h-4 text-[#666666]" />
//             <span className="text-sm">Checkout</span>
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Order Summary */}
//           <div className="bg-white border rounded-lg p-6 space-y-4">
//             <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//             {cartItems.length > 0 ? (
//               cartItems.map((item) => (
//                 <div key={item._id} className="flex items-center gap-4 py-3 border-b">
//                   <div className="w-16 h-16 rounded overflow-hidden">
//                     {item.image && (
//                       <Image
//                         src={urlFor(item.image).url()}
//                         alt={item.productName}
//                         width={64}
//                         height={64}
//                         className="object-cover w-full h-full"
//                       />
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-sm font-medium">{item.productName}</h3>
//                     <p className="text-xs text-gray-500">Quantity: {item.inventory}</p>
//                   </div>
//                   <p className="text-sm font-medium">${item.price * item.inventory}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-sm text-gray-500">Your cart is empty.</p>
//             )}
//             <div className="text-right pt-4">
//               <p className="text-sm">Subtotal: <span className="font-medium">${subtotal}</span></p>
//               <p className="text-sm">Discount: <span className="font-medium">-${discount}</span></p>
//               <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
//             </div>
//           </div>

//           {/* Billing Form */}
//           <div className="bg-white border rounded-lg p-6 space-y-6">
//             <h2 className="text-xl font-semibold">Billing Information</h2>
//             {Object.keys(formValues).map((key) => (
//               <div key={key}>
//                 <label htmlFor={key} className="capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
//                 <input
//                   id={key}
//                   placeholder={`Enter your ${key}`}
//                   value={formValues[key as keyof typeof formValues]}
//                   onChange={handleInputChange}
//                   className="border w-full p-2 rounded"
//                 />
//                 {formErrors[key as keyof typeof formErrors] && (
//                   <p className="text-sm text-red-500">{`${key.replace(/([A-Z])/g, " $1")} is required.`}</p>
//                 )}
//               </div>
//             ))}
//             <button className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white" onClick={handlePlaceOrder}>
//               Place Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCartItems } from "@/app/actions/actions";
import Link from "next/link";
import { Product } from "../../../types/products";
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";
import Swal from "sweetalert2";
import { client } from "@/sanity/lib/client";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.inventory,
    0
  );
  const total = Math.max(subtotal - discount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      address: !formValues.address,
      city: !formValues.city,
      zipCode: !formValues.zipCode,
      phone: !formValues.phone,
      email: !formValues.email,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      Swal.fire("Error!", "Please fill in all the fields before proceeding.", "error");
      return;
    }

    Swal.fire({
      title: "Processing your order...",
      text: "Please wait a moment.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const orderData = {
          _type: "order",
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          address: formValues.address,
          city: formValues.city,
          zipCode: formValues.zipCode,
          phone: formValues.phone,
          email: formValues.email,
          cartItems: cartItems.map((item) => ({
            _type: "reference",
            _ref: item._id,
          })),
          total: total,
          discount: discount,
          orderDate: new Date().toISOString(),
        };

        try {
          await client.create(orderData);
          localStorage.removeItem("appliedDiscount");
          Swal.fire("Success!", "Your order has been successfully processed!", "success");
        } catch (error) {
          console.error("Error creating order", error);
          Swal.fire("Error!", "Something went wrong. Please try again later.", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-4">
            <Link href="/cart" className="text-[#666666] hover:text-black transition text-sm font-medium">
              Cart
            </Link>
            <CgChevronRight className="w-4 h-4 text-[#666666]" />
            <span className="text-sm font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white border rounded-lg p-6 space-y-4 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 py-3 border-b">
                  <div className="w-16 h-16 rounded overflow-hidden">
                    {item.image && (
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.productName}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-700">{item.productName}</h3>
                    <p className="text-xs text-gray-500">Quantity: {item.inventory}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-800">${item.price * item.inventory}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
            <div className="text-right pt-4">
              <p className="text-sm text-gray-700">Subtotal: <span className="font-medium">${subtotal}</span></p>
              <p className="text-sm text-gray-700">Discount: <span className="font-medium">-${discount}</span></p>
              <p className="text-lg font-semibold text-gray-900">Total: ${total.toFixed(2)}</p>
            </div>
          </div>

          {/* Billing Form */}
          <div className="bg-white border rounded-lg p-6 space-y-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">Billing Information</h2>
            {Object.keys(formValues).map((key) => (
              <div key={key} className="space-y-2">
                <label htmlFor={key} className="capitalize text-sm font-medium text-gray-700">{key.replace(/([A-Z])/g, " $1")}</label>
                <input
                  id={key}
                  placeholder={`Enter your ${key}`}
                  value={formValues[key as keyof typeof formValues]}
                  onChange={handleInputChange}
                  className="border w-full p-2 rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors[key as keyof typeof formErrors] && (
                  <p className="text-sm text-red-500">{`${key.replace(/([A-Z])/g, " $1")} is required.`}</p>
                )}
              </div>
            ))}
            <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
