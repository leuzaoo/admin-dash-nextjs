export default function MenuItem({ icon: Icon, text }) {
  return (
    <div className="flex items-center">
      <Icon className="w-5" />
      <span className="ml-2">{text}</span>
    </div>
  );
}
