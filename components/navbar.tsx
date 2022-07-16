import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

import {
  HomeIcon,
  ClipboardListIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

const NavbarItem = ({
  item,
  active,
}: {
  item: NavbarItemType;
  active: boolean;
}) => {
  const { ImageComponent, path, alt } = item;
  return (
    <Link href={path}>
      <div
        className={`p-4 mx-2 border-b-2 border-b-blue-600 hover:cursor-pointer ${
          !active
            ? "border-opacity-0 opacity-60 hover:border-opacity-60 hover:opacity-100"
            : ""
        }`}
      >
        <ImageComponent width="30px" height="24px" />
      </div>
    </Link>
  );
};

type NavbarItemType = {
  path: string;
  ImageComponent: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  alt: string;
};
const Navbar = () => {
  const router = useRouter();
  const items: NavbarItemType[] = [
    { path: "/", ImageComponent: HomeIcon, alt: "Home" },
    { path: "/routines", ImageComponent: ClipboardListIcon, alt: "Routines" },
    { path: "/profile", ImageComponent: UserCircleIcon, alt: "Profile" },
  ];

  return (
    <div className="flex items-center px-4 pt-2 border-b-2 border-slate-200/60">
      <div className="mr-2">
        <Image
          src="/hevy.svg"
          width="40px"
          height="28px"
          alt="Hevy logo"
          className="hover:cursor-pointer"
        />
      </div>
      {items.map((item, idx) => (
        <NavbarItem
          item={item}
          key={idx}
          active={router.pathname === item.path}
        />
      ))}
      <div className="ml-auto">
        <Image
          src="/avatar.jpg"
          width="40px"
          height="40px"
          alt="Hevy logo"
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
