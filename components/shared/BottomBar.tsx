"use client";

import { bottombarLinks } from "@/app/constants";
import { INavLink } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = () => {

    const currentpath = usePathname();
    return (
      <section className="bottom-bar">
        {bottombarLinks.map((link: INavLink) => {
          const isActive = currentpath === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex-center flex-col gap-1 p-2 transition ${
                isActive && "bg-primary-500 rounded-md"
              }`}
            >
              <Image
                src={link.img_url}
                alt={link.label}
                width={16}
                height={16}
                className={` ${isActive && "invert-white"}`}
              />
              <p className="tiny-medium text-light-2">{link.label}</p>
            </Link>
          );
        })}
      </section>
    );
  };
  
  export default BottomBar;