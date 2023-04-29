export default function Input({ placeholder, title, type, value }) {
  return (
    <div className="flex flex-col justify-center text-left">
      <p className="text-sm font-bold">{title}</p>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="h-10 pl-2 mt-1 flex border-[1px] rounded-lg border-gray-300 outline-none focus:text-sm focus:transition-all duration-300 focus:duration-300 focus:border-blue-400"
      />
    </div>
  );
}
