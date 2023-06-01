export default function SaveButton({ text, type }) {
  return (
    <div>
      <button
        type={type}
        className="bg-blue-600 text-white rounded-lg center w-[94.8px] h-[40px] transition-all  hover:bg-black hover:transition-all hover:duration-500 duration-500"
      >
        {text}
      </button>
    </div>
  );
}
