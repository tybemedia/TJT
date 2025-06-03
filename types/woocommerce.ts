export interface WooProduct {
  id: number
  name: string
  slug: string
  permalink: string
  date_created: string
  type: string
  status: string
  featured: boolean
  catalog_visibility: string
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  date_on_sale_from: string | null
  date_on_sale_to: string | null
  on_sale: boolean
  purchasable: boolean
  total_sales: number
  virtual: boolean
  downloadable: boolean
  downloads: any[]
  download_limit: number
  download_expiry: number
  tax_status: string
  tax_class: string
  manage_stock: boolean
  stock_quantity: number | null
  stock_status: string
  backorders: string
  backorders_allowed: boolean
  backordered: boolean
  sold_individually: boolean
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  shipping_required: boolean
  shipping_taxable: boolean
  shipping_class: string
  shipping_class_id: number
  reviews_allowed: boolean
  average_rating: string
  rating_count: number
  images: WooImage[]
  featured_image?: string | null
  categories: WooCategory[]
  tags: WooTag[]
  attributes: WooAttribute[]
  variations: number[]
  menu_order: number
  meta_data: WooMetaData[]
}

export interface WooImage {
  id: number
  date_created: string
  date_modified: string
  src: string
  name: string
  alt: string
}

export interface WooCategory {
  id: number
  name: string
  slug: string
}

export interface WooTag {
  id: number
  name: string
  slug: string
}

export interface WooAttribute {
  id: number
  name: string
  position: number
  visible: boolean
  variation: boolean
  options: string[]
}

export interface WooMetaData {
  id: number
  key: string
  value: any
}

export interface WooCartItem {
  key: string
  id: number
  quantity: number
  name: string
  price: number
  total: number
  image: WooImage
}

export interface WooCart {
  cart_key: string
  items: WooCartItem[]
  total: number
  subtotal: number
  shipping: number
  tax: number
} 