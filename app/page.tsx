"use client";

import { useEffect } from "react";
import { useUserContext } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/shared/Loader";

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();
  const { isAuthenticated } = useUserContext();

  useEffect(() => {
    console.log(isAuthenticated);

    isAuthenticated ? router.replace("/expenses") : router.replace("/signin");
  }, []);

  return (
    <div className="flex-center h-screen ">
      <Loader />
    </div>
  );
}

export default MyApp;
