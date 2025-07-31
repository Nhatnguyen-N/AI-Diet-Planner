import { MealPlanWithRecipe } from "@/types/meal.types";
import { createContext, ReactNode, useContext, useState } from "react";

interface RefreshDataContextType {
  refreshData: number | null;
  setRefreshData: (data: number | null) => void;
}

export const RefreshDataContext = createContext<RefreshDataContextType>({
  refreshData: null,
  setRefreshData: () => {},
});

export const RefreshDataProvider = ({ children }: { children: ReactNode }) => {
  const [refreshData, setRefreshData] = useState<number | null>(null);

  return (
    <RefreshDataContext.Provider value={{ refreshData, setRefreshData }}>
      {children}
    </RefreshDataContext.Provider>
  );
};

// 5. Tạo custom hook để dễ dàng sử dụng
export const useRefreshData = () => {
  const context = useContext(RefreshDataContext);
  if (!context) {
    throw new Error("useUser must be used within a RefreshDataProvider");
  }
  return context;
};
