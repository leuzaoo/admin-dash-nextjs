import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function EditButton() {
  return (
    <div className="cursor-pointer flex justify-center">
      <button>
        <PencilSquareIcon className="w-6 hover:text-blue-600 hover:transition-all hover:duration-300 duration-300" />
      </button>
    </div>
  );
}
