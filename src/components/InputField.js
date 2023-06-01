export default function InputField({ text, placeholder, value, onChange }) {
  return (
    <div>
      <input
        className="bg-gray-100 w-full focus:border-black"
        type={text}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
