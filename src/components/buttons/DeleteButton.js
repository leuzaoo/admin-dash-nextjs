import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-white bg-red-700 gap-1 px-2 py-1 rounded-md shadow-sm shadow-gray-300  text-sm"
    >
      <TrashIcon className="w-6" /> {text}
    </button>
  );
}
