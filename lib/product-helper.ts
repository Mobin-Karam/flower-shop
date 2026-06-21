import { products }
  from "./products"

export function getProductBySlug(
  slug: string
) {
  return products.find(
    product =>
      product.slug === slug
  )
}

export function getFeaturedProducts() {
  return products.slice(0, 4)
}