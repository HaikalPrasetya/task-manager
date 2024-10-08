import { format } from "date-fns";

export const dayDateFormat = (date: Date) => {
  return format(date, "EEE, dd LLL");
};
