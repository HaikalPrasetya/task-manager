import { dueDates } from "@/constans/dueDate";

type Props = {
  handlePickDueDate: (desc: string) => void;
  isPlanned?: boolean;
};

function DueDates({ handlePickDueDate, isPlanned }: Props) {
  return (
    <>
      {isPlanned ? (
        <div className="w-[300px] absolute -translate-y-52 -translate-x-64 p-4 rounded shadow-md bg-white border-2 border-black flex flex-col gap-2">
          {dueDates.map((data) => (
            <div
              key={data.title}
              className="flex justify-between items-center py-2 px-3 cursor-pointer hover:bg-slate-200"
              onClick={() => handlePickDueDate(data.title)}
            >
              <div className="flex gap-5">
                {data.icon}
                {data.title}
              </div>
              <h5 className="text-sm text-slate-500">{data.desc}</h5>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-[300px] absolute -translate-y-52 -translate-x-64 p-4 rounded shadow-md bg-white border-2 border-black flex flex-col gap-2">
          {dueDates.map((data) => (
            <div
              key={data.title}
              className="flex justify-between items-center py-2 px-3 cursor-pointer hover:bg-slate-200"
              onClick={() => handlePickDueDate(data.title)}
            >
              <div className="flex gap-5">
                {data.icon}
                {data.title}
              </div>
              <h5 className="text-sm text-slate-500">{data.desc}</h5>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default DueDates;
