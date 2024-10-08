import { MdOutlineNextWeek, MdToday } from "react-icons/md";
import { SiTomorrowland } from "react-icons/si";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const today = new Date();
const tomorrow = new Date();
const nextWeek = new Date();

const todayString = daysOfWeek[today.getDay()];

tomorrow.setDate(today.getDate() + 1);
const tomorrowString = daysOfWeek[tomorrow.getDay()];

nextWeek.setDate(today.getDate() + 7);
const nextWeekString = daysOfWeek[nextWeek.getDay()];

export const dueDates = [
  {
    title: "Today",
    icon: <MdToday size={20} />,
    desc: todayString,
  },
  {
    title: "Tomorrow",
    icon: <SiTomorrowland size={20} />,
    desc: tomorrowString,
  },
  {
    title: "Next Week",
    icon: <MdOutlineNextWeek size={20} />,
    desc: nextWeekString,
  },
];
