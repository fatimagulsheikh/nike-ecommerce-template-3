'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart, Eye } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
//import Button from '../components/Button';
import { Product } from '../../../types/products';
import { addToCart } from '../actions/actions';
import Button from '../components/Button';

export default function ExploreProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [showMoreVisible, setShowMoreVisible] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const products: Product[] = await client.fetch('*[_type == "product"]');
      setAllProducts(products);
      setDisplayedProducts(products.slice(0, 16));
      setShowMoreVisible(products.length > 16);
    }
    fetchProducts();
  }, []);

  const loadMoreProducts = () => {
    const currentLength = displayedProducts.length;
    const nextProducts = allProducts.slice(currentLength, currentLength + 8);
    setDisplayedProducts([...displayedProducts, ...nextProducts]);
    if (displayedProducts.length + nextProducts.length >= allProducts.length) {
      setShowMoreVisible(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Explore Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <div key={product._id} className="bg-white border shadow-lg rounded-md overflow-hidden">
<Link href={`/product/${product.slug.current}`} className="block">
              <Image
  src={urlFor(product.image).url()}
  alt={product.name || "Product image"}
  width={500}
  height={500}
  className="w-full h-64 object-cover"
/>
  <Image
    src={urlFor(product.image).url()}
    alt={product.name}
    width={500}
    height={500}
    className="w-full h-64 object-cover"
  />
  <div className="p-4">
    <h3 className="font-medium text-lg">{product.name}</h3>
    <p className="text-blue-700 font-medium">${product.price}</p>
  </div>
</Link>

            <div className="p-4 flex justify-between">
              <Button className="bg-black text-white px-4 py-2 rounded" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
              <Heart className="text-red-500 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
      {showMoreVisible && (
        <div className="flex justify-center mt-8">
          <Button className="bg-blue-600 text-white px-6 py-2 rounded" onClick={loadMoreProducts}>
            Show More Products
          </Button>
        </div>
      )}
    </section>
  );
}
