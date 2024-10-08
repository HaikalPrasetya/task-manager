import { IoIosSunny } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { FcPlanner } from "react-icons/fc";
import { Home } from "lucide-react";

export const mainLinks = [
  {
    title: "My Day",
    link: "/myDay",
    icon: <IoIosSunny size={25} fill="orange" />,
  },
  {
    title: "Important",
    link: "/important",
    icon: <FaRegStar size={25} fill="red" />,
  },
  {
    title: "Planned",
    link: "/planned",
    icon: <FcPlanner size={25} />,
  },
  {
    title: "Tasks",
    link: "/tasks",
    icon: <Home size={25} style={{ color: "slateblue" }} />,
  },
];
