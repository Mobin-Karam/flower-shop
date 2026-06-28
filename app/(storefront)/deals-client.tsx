'use client'
import React from 'react'
import DealsRail from './components/deals-rail';
import { products } from '@/lib/products';
import ProductCardHome from '../components/product-card-home';

const DealsClient = () => {
  return (
     <DealsRail
          products={products}
          title="پیشنهادهای ویژه"
          subtitle="بهترین تخفیف‌های امروز"
          showViewAllButton
          onViewAll={() => {
            console.log("view all deals");
          }}
          renderProductCard={(product) => (
            <ProductCardHome product={product} />
          )}
        />
  )
}

export default DealsClient