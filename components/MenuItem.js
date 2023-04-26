import Link from "next/link";

export default function MenuItem({ icon: Icon, text }) {
  return (
    <Link href={"/"} className="flex items-center text-white">
      <Icon className="text-white w-8" />
      <span>{text}</span>
    </Link>
  );
}
