"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/AuthContext";
import { Button } from "../ui/button";
import { signOutUser } from "@/lib/api";

const TopBar = () => {
  const currentpath = usePathname();
  const router = useRouter();
  const { user, setIsAuthenticated } = useUserContext();

  const handleSignOutUser = () => {
    signOutUser();
    setIsAuthenticated(false);
    router.replace("signin");
  };
  const isActive = (linkRoute: string) => {
    return currentpath === linkRoute;
  };
  return (
    <section className="topbar p-2">
      <div className="flex-between">
        <Link href="/expenses" className="flex gap-2 items-center p-4">
          <img
            src="/assets/icons/home.svg"
            alt="expenses"
            className={`group-hover:invert-white`}
          />
          Expenses
        </Link>
        <div className="flex gap-4">
          <div className="flex-center gap-4 pr-2"></div>
          <div className="flex gap-2 items-center p-4">
            <p className="small-medium lg:base-medium pl-4">Signout</p>

            <Button
              variant={"ghost"}
              className="shad-button-ghost justify-start"
              onClick={() => handleSignOutUser()}
            >
              <img src="/assets/icons/logout.svg" alt="logout" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
