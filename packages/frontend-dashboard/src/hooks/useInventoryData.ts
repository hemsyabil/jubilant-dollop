import { useEffect, useState } from "react"
import {
  getCategoryData,
  getInventoryData,
  getSalesData,
  type CategoryData,
  type InventoryItem,
  type SalesData,
} from "../utils/web/chartService"

interface UseInventoryDataResult {
  salesData: SalesData[]
  categoryData: CategoryData[]
  inventoryData: InventoryItem[]
  loading: boolean
  error: string | null
}

const useInventoryData = (): UseInventoryDataResult => {
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [sales, categories, inventory] = await Promise.all([
          getSalesData(),
          getCategoryData(),
          getInventoryData(),
        ])

        setSalesData(sales)
        setCategoryData(categories)
        setInventoryData(inventory)
      } catch (err) {
        console.error("Failed to load chart data:", err)
        setError("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return {
    salesData,
    categoryData,
    inventoryData,
    loading,
    error,
  }
}

export default useInventoryData
