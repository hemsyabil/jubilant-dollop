import apiClient from "./apiClient"

export interface SalesData {
  month: string
  sales: number
  revenue: number
  orders: number
  [key: string]: string | number
}

export interface CategoryData {
  name: string
  value: number
  color: string
  [key: string]: string | number
}

export interface InventoryItem {
  id: number
  name: string
  category: string
  stock: number
  price: number
  lastUpdated: string
}

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

// Since we need demo data for charts, I'll create mock data
// In a real app, these would come from your backend API
const generateSalesData = (): SalesData[] => [
  { month: "Jan", sales: 4000, revenue: 24000, orders: 150 },
  { month: "Feb", sales: 3000, revenue: 18000, orders: 120 },
  { month: "Mar", sales: 2000, revenue: 12000, orders: 80 },
  { month: "Apr", sales: 2780, revenue: 16680, orders: 110 },
  { month: "May", sales: 1890, revenue: 11340, orders: 75 },
  { month: "Jun", sales: 2390, revenue: 14340, orders: 95 },
  { month: "Jul", sales: 3490, revenue: 20940, orders: 140 },
  { month: "Aug", sales: 4200, revenue: 25200, orders: 160 },
  { month: "Sep", sales: 3800, revenue: 22800, orders: 145 },
  { month: "Oct", sales: 4500, revenue: 27000, orders: 170 },
  { month: "Nov", sales: 5200, revenue: 31200, orders: 185 },
  { month: "Dec", sales: 6100, revenue: 36600, orders: 210 },
]

const generateCategoryData = (): CategoryData[] => [
  { name: "Electronics", value: 35, color: "#8884d8" },
  { name: "Clothing", value: 25, color: "#82ca9d" },
  { name: "Books", value: 15, color: "#ffc658" },
  { name: "Sports", value: 12, color: "#ff7300" },
  { name: "Home & Garden", value: 8, color: "#0088fe" },
  { name: "Others", value: 5, color: "#00c49f" },
]

const generateInventoryData = (): InventoryItem[] => [
  {
    id: 1,
    name: "iPhone 15",
    category: "Electronics",
    stock: 45,
    price: 999,
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    name: 'Samsung TV 55"',
    category: "Electronics",
    stock: 12,
    price: 799,
    lastUpdated: "2024-01-14",
  },
  {
    id: 3,
    name: "Nike Air Max",
    category: "Sports",
    stock: 23,
    price: 150,
    lastUpdated: "2024-01-13",
  },
  {
    id: 4,
    name: "Levi's Jeans",
    category: "Clothing",
    stock: 67,
    price: 89,
    lastUpdated: "2024-01-12",
  },
  {
    id: 5,
    name: "Harry Potter Set",
    category: "Books",
    stock: 34,
    price: 45,
    lastUpdated: "2024-01-11",
  },
  {
    id: 6,
    name: "Garden Tools Set",
    category: "Home & Garden",
    stock: 18,
    price: 125,
    lastUpdated: "2024-01-10",
  },
]

export const getSalesData = (): Promise<SalesData[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      resolve(generateSalesData())
    }, 500)
  })
}

export const getCategoryData = (): Promise<CategoryData[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      resolve(generateCategoryData())
    }, 300)
  })
}

export const getInventoryData = (): Promise<InventoryItem[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      resolve(generateInventoryData())
    }, 400)
  })
}

// Alternative: If you want to use real API data, here's an example
// using a public API for demo purposes
export const getRandomChartData = async () => {
  try {
    // Using JSONPlaceholder posts data to create chart data
    const response = await apiClient.get("/posts")
    const posts = response.data.slice(0, 10) as Post[]

    return posts.map((post: Post, index: number) => ({
      name: `Post ${post.id}`,
      value: post.title.length + post.body.length,
      color: `hsl(${index * 36}, 70%, 50%)`,
    }))
  } catch (error) {
    console.error("Failed to fetch chart data:", error)
    return generateCategoryData()
  }
}
