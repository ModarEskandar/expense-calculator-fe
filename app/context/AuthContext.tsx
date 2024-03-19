'use client';

import { redirect, usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { IContextType, IUser } from "../types";
import { getCurrentUser, setAuthToken } from "@/lib/api";

const INITIAL_USER = {
  _id: "",
  name: "",
  email: "",

};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
  token:'',
  setToken:()=>{}
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentpath = usePathname();
const router = useRouter();
  const checkAuthUser = async () => {
    try {
      
      const currentAccount = await getCurrentUser() as unknown as IUser;      
      if (currentAccount) {        
        setUser({
          _id: currentAccount._id,
          name: currentAccount.name,
          email: currentAccount.email
        });
        setIsAuthenticated(true);        
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    
    if (
      (cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined) && currentpath !== "/signin"
    ) {
      router.push("/signin");
    }
   
    const decodedJwt =cookieFallback?JSON.parse(atob(cookieFallback!.split(".")[1])):{exp:Date.now()};
    if (decodedJwt.exp * 1000 < Date.now()) {
      router.push("/signin");
    }
      setAuthToken(cookieFallback!);     
    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,

  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);

