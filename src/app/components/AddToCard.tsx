'use client'

import { useState } from 'react'
import { addToCart } from '@/app/actions/actions'
import toast from 'react-hot-toast'
import { ShoppingCart } from 'lucide-react'
import { Product } from '../../../types/products'
import Button from './Button'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      await addToCart(product)
      toast.success(`${product.name} added to cart!`)
    } catch (error) {
      toast.error('Failed to add item to cart.')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      classNames="w-full bg-black text-white hover:bg-black/90 text-xl py-6 flex items-center justify-center gap-3"
    >
      <ShoppingCart className="w-6 h-6" />
      {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
    </Button>
  )
}