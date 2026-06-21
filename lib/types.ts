export type Product = {
  id: string
  name: string
  slug: string
  price: number
  image: string
  description: string
  category: string
}

export type CartItem = Product & {
  quantity: number
}