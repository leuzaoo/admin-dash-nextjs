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
  return (
    <aside>
      <div className="p-4">
        <div className="mb-8">
          <MenuItem text="AiTrend Admin" icon={BuildingStorefrontIcon} />
        </div>

        <div className="flex flex-col gap-4">
          <Link href={"/"}>
            <MenuItem text="Dashboard" icon={HomeIcon} />
          </Link>
          <Link href={"/"}>
            <MenuItem text="Products" icon={ListBulletIcon} />
          </Link>
          <Link href={"/"}>
            <MenuItem text="Orders" icon={PaperClipIcon} />
          </Link>
          <Link href={"/"}>
            <MenuItem text="Settings" icon={Cog6ToothIcon} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
