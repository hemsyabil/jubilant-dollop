# Inventory Components

This directory contains reusable components for the Inventory dashboard page.

## Components

### 1. **LoadingSpinner.tsx**

- Simple loading spinner component
- Props: `minHeight?: string`
- Reusable across different pages

### 2. **SalesPerformanceChart.tsx**

- Bar chart showing monthly sales performance
- Props: `salesData: SalesData[]`, `height?: number`
- Displays sales volume and orders

### 3. **CategoryDistributionChart.tsx**

- Pie chart showing inventory by category
- Props: `categoryData: CategoryData[]`, `height?: number`
- Shows distribution of inventory categories

### 4. **RevenueTrendChart.tsx**

- Line chart showing revenue trends over time
- Props: `salesData: SalesData[]`, `height?: number`
- Displays revenue trend analysis

### 5. **InventorySummary.tsx**

- Summary list of current inventory items
- Props: `inventoryData: InventoryItem[]`, `height?: number`
- Shows item name, category, price, and stock levels

### 6. **RecentSalesChart.tsx**

- Bar chart for recent sales vs orders
- Props: `salesData: SalesData[]`, `height?: number`, `monthsToShow?: number`
- Configurable time period display

### 7. **DashboardRow.tsx**

- Layout component for responsive dashboard rows
- Props: `children: ReactNode`, `fullWidth?: boolean`
- Handles responsive layout for different screen sizes

## Custom Hook

### **useInventoryData.ts** (in `/hooks/`)

- Custom hook for managing inventory data state
- Returns: `{ salesData, categoryData, inventoryData, loading, error }`
- Handles async data loading and error states

## Usage

```tsx
import {
  CategoryDistributionChart,
  DashboardRow,
  InventorySummary,
  LoadingSpinner,
  RecentSalesChart,
  RevenueTrendChart,
  SalesPerformanceChart,
} from "../../components/Inventory"

// Or import individually
import LoadingSpinner from "../../components/Inventory/LoadingSpinner"
```

## Benefits

1. **Reusability**: Components can be used across different pages
2. **Maintainability**: Each component has a single responsibility
3. **Testability**: Smaller components are easier to unit test
4. **Type Safety**: Full TypeScript support with proper interfaces
5. **Configurability**: Props allow customization of appearance and behavior
