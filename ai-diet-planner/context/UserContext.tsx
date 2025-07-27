import { User } from "@/types/user.types";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 5. Tạo custom hook để dễ dàng sử dụng
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
