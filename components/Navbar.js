import Link from "next/link";

import MenuItem from "./MenuItem";

import {
  BuildingStorefrontIcon,
  HomeIcon,
  ListBulletIcon,
  PaperClipIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const inactiveLink = "p-1";
  const activeLink = `${inactiveLink} bg-yellow-700 rounded-l-lg`;
  return (
    <aside>
      <div className="pt-4 pl-4">
        <div className="mb-8 pr-20">
          <MenuItem text="AiTrend Admin" icon={BuildingStorefrontIcon} />
        </div>

        <div className="flex flex-col gap-8">
          <Link href={"/"} className={activeLink}>
            <MenuItem text="Dashboard" icon={HomeIcon} />
          </Link>
          <Link href={"/produtos"} className={inactiveLink}>
            <MenuItem text="Produtos" icon={ListBulletIcon} />
          </Link>
          <Link href={"/pedidos"} className={inactiveLink}>
            <MenuItem text="Pedidos" icon={PaperClipIcon} />
          </Link>
          <Link href={"/configuracoes"} className={inactiveLink}>
            <MenuItem text="Configurações" icon={Cog6ToothIcon} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
