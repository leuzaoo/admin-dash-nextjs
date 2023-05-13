import Link from "next/link";
import { useRouter } from "next/router";

import { signOut } from "next-auth/react";

import MenuItem from "./MenuItem";

import {
  RectangleGroupIcon,
  ListBulletIcon,
  PaperClipIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  DevicePhoneMobileIcon
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const inactiveLink =
    "p-4 ml-4 text-sm text-gray-400  hover:bg-black hover:mx-4 rounded-xl hover:rounded-xl  hover:text-white duration-300";
  const activeLink = `${inactiveLink} font-bold !text-black hover:!text-white text-base pl-10`;
  const router = useRouter();

  const { pathname } = router;

  return (
    <aside>
      <div className="pt-4 min-h-screen bg-white my-2 mx-2 rounded-md">
        <div className="pr-32 flex pt-4 pl-4 pb-4">
          <img src="/aitrend-logo.png" className="w-24" />
        </div>
        <div className="flex flex-col gap-8 pt-4">
          <Link
            href={"/"}
            className={pathname === "/" ? activeLink : inactiveLink}
          >
            <MenuItem text="Dashboard" icon={RectangleGroupIcon} />
          </Link>
          <Link
            href={"/products"}
            className={
              pathname.includes("/products") ? activeLink : inactiveLink
            }
          >
            <MenuItem text="Produtos" icon={DevicePhoneMobileIcon} />
          </Link>
          <Link
            href={"/categories"}
            className={
              pathname.includes("/categories") ? activeLink : inactiveLink
            }
          >
            <MenuItem text="Categorias" icon={ListBulletIcon} />
          </Link>
          <Link
            href={"/orders"}
            className={pathname.includes("/orders") ? activeLink : inactiveLink}
          >
            <MenuItem text="Pedidos" icon={PaperClipIcon} />
          </Link>
          <Link
            href={"/settings"}
            className={
              pathname.includes("/settings") ? activeLink : inactiveLink
            }
          >
            <MenuItem text="Configurações" icon={Cog6ToothIcon} />
          </Link>
        </div>
        <div
          onClick={() => signOut()}
          className="flex pl-3 py-4 mb-4 ml-4 mt-8 hover:bg-red-800 hover:mx-4 hover:rounded-xl hover:text-white hover:cursor-pointer duration-300"
        >
          <ArrowLeftOnRectangleIcon className="w-6" />
          <button className="pl-2">Logout</button>
        </div>
      </div>
    </aside>
  );
}
