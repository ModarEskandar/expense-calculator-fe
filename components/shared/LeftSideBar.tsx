"use client";

import { sidebarLinks } from "@/app/constants";
import { INavLink } from "@/app/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useUserContext } from "@/app/context/AuthContext";
import { signOutUser } from "@/lib/api";

const LeftSideBar = () => {
    const currentpath = usePathname();
    const { user,setIsAuthenticated } = useUserContext();
    const router = useRouter();
    const handleSignOutUser = ()=>{
      signOutUser();
      setIsAuthenticated(false);
      router.replace('signin')
    }
    return (
      <nav className="leftsidebar">
        <div className="flex flex-col gap-6">

          <Link href={`/profile/${user._id}`} className="flex-center gap-4 pr-2">
            <img
              src="/assets/images/profile.png"
              alt="profile"
              className="h-14 w-14 rounded-full"
            ></img>
            <div className="flex flex-col">
            <p className="small-regular text-light-3 ">Hello</p>

<p className="body-bold">{user.name}</p>
            </div>
          </Link>
          <ul className="flex flex-col gap-2">
            {sidebarLinks.map((link: INavLink) => {
              const isActive = currentpath === link.route;
              return (
                <li
                  key={link.label}
                  className={`leftsidebar-link group ${
                    isActive && "bg-primary-500"
                  }`}
                >
                  <Link
                    href={link.route}
                    className="flex gap-2 items-center p-4"
                  >
                    <img
                      src={link.img_url}
                      alt={link.label}
                      className={`group-hover:invert-white ${
                        isActive && "invert-white"
                      }`}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Button
          variant={"ghost"}
          className="shad-button-ghost justify-start"
          onClick={() => handleSignOutUser()}
        >
          <img src="/assets/icons/logout.svg" />
          <p className="small-medium lg:base-medium pl-4"> Logout</p>
        </Button>
      </nav>
    );
  };
  
  export default LeftSideBar;