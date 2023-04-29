export default function MenuItem({ icon: Icon, text }) {
  return (
    <div className="flex">
      <Icon className="w-6" />
      <span className="ml-2">{text}</span>
    </div>
  );
}
