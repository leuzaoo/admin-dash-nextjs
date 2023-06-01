import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function EditButton({ text }) {
  return (
    <button className="flex items-center text-white bg-blue-700 gap-1 px-2 py-1 rounded-md shadow-sm shadow-gray-300  text-sm">
      <PencilSquareIcon className="w-6" /> {text}
    </button>
  );
}
