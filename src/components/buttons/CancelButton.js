export default function CancelButton({ text }) {
  return (
    <a href="javascript:history.back()">
      <button className="bg-gray-200 py-2 px-4  rounded-lg transition-all duration-700 hover:bg-red-500 hover:transition-all hover:text-white hover:duration-300">
        {text}
      </button>
    </a>
  );
}
