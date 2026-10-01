import * as Icons from "lucide-react";

export default function Icon({ name, ...props }) {
  const Cmp = Icons[name] || Icons.Circle;
  return <Cmp aria-hidden="true" {...props} />;
}
