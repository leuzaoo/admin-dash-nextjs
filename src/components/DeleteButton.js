import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteButton() {
  return (
    <div className="cursor-pointer flex justify-center">
      <button className="w-4 hover:text-red-600 hover:transition-all hover:duration-300 duration-300">
        <TrashIcon />
      </button>
    </div>
  );
}
