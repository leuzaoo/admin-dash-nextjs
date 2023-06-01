import { PlusSmallIcon } from "@heroicons/react/24/outline";

export default function NewButton({ text }) {
  return (
    <div>
      <div className=" bg-blue-600 flex items-center gap-2 px-4 py-2 text-white rounded-tr-[16px] rounded-tl-[8px] rounded-bl-[16px] rounded-br-[8px] hover:bg-sky-600 hover:transition-all hover:duration-500 duration-500">
        <span>{text}</span>
        <PlusSmallIcon className="w-6 font-bold" />
      </div>
    </div>
  );
}
