export default function Input({ placeholder, title, type }) {
  return (
    <div className="flex flex-col justify-center text-left">
      <p className="text-sm font-bold">{title}</p>
      <input
        type={type}
        placeholder={placeholder}
        className="h-10 pl-2 mt-1 flex border-[1px] border-slate-700 rounded-lg"
      />
    </div>
  );
}
