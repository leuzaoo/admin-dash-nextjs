export default function MenuItem({ icon: Icon, text }) {
  return (
    <div className="flex items-center text-white">
      <Icon className="text-white w-6" />
      <span className="ml-2 ">{text}</span>
    </div>
  );
}
