
"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useUserContext } from "@/app/context/AuthContext";


export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const {isAuthenticated}=useUserContext();


    useEffect(() => {
      if (!isAuthenticated) {
        return redirect("/signin");
      }
    }, []);


    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}