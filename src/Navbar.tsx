import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="absolute right-0 bottom-0 z-50 flex gap-2">
      <Link to="/">Room</Link>
      <Link to="/info">Info</Link>
    </div>
  );
}
