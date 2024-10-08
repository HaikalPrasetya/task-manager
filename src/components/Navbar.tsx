import Link from "next/link";
import { RxAvatar } from "react-icons/rx";

function Navbar() {
  return (
    <div className="h-[80px] border-b-2 border-black w-full wrapper flex items-center justify-between">
      <Link href="/" className="font-bold text-3xl text-main">
        Manage Task
      </Link>
      <div className="flex gap-2 items-center">
        <RxAvatar size={30} />
        <span>Haikal Prasetya Alhakim</span>
      </div>
    </div>
  );
}
export default Navbar;
