export default function SaveButton({ text, type }) {
  return (
    <div>
      <button
        type={type}
        className="py-2 px-4 bg-black text-white rounded-lg duration-300 hover:bg-blue-600 hover:duration-300"
      >
        {text}
      </button>
    </div>
  );
}
