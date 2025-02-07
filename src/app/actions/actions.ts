
import { Product } from "../../../types/products";


export const addToCart = (product : Product) => {
    const cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')

    const axisxtingProductIndex = cart.findIndex(item => item._id === product._id)

    if(axisxtingProductIndex > -1) {
        cart[axisxtingProductIndex].inventory += 1
    }
    else {
        cart.push({
            ...product, inventory: 1
        })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
}

export const removeFormCart = (productId : string) => {
    let cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    cart = cart.filter(item => item._id !== productId)
    localStorage.setItem('cart',JSON.stringify(cart))
}

export const uupdateCartQuantity = (prodductId : string, quantity : number) => {
    const cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const productIndex = cart.findIndex(item => item._id === prodductId)

    if(productIndex > -1) {
        cart[productIndex].inventory = quantity
    }
}

export const getCartItems = () : Product[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]')
}