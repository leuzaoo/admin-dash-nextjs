import Link from "next/link";
import { useRouter } from "next/router";

import MenuItem from "./MenuItem";

import {
  RectangleGroupIcon,
  ListBulletIcon,
  PaperClipIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const inactiveLink =
    "p-3 hover:bg-black hover:mx-4 hover:rounded-xl hover:text-white duration-300";
  const activeLink = `${inactiveLink} mx-4 bg-black text-white rounded-xl`;
  const router = useRouter();

  const { pathname } = router;

  return (
    <aside>
      <div className="pt-4">
        <div className="pr-32 flex pt-4 pl-4 pb-4 border-b-[1px] border-slate-400">
          <h3 className="ml-2 font-bold text-2xl">AiTrend</h3>
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
            <MenuItem text="Produtos" icon={ListBulletIcon} />
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
          <div className="flex pl-3 py-4 hover:bg-red-800 hover:mx-4 hover:rounded-xl hover:text-white hover:cursor-pointer duration-300">
            <ArrowLeftOnRectangleIcon className="w-6" />
            <button className="pl-2 ">Logout</button>
          </div>
        </div>
      </div>
    </aside>
  );
}
