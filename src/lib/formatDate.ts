import { format, isToday, isTomorrow, isYesterday } from "date-fns";

export const getTaskDateLabel = (dueDate: Date) => {
  if (isToday(dueDate)) {
    return "Today";
  } else if (isYesterday(dueDate)) {
    return "Yesterday";
  } else if (isTomorrow(dueDate)) {
    return "Tomorrow";
  } else {
    return format(dueDate, "iii, d LLL");
  }
};
