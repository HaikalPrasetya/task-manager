"use client";

import { Calendar, Plus } from "lucide-react";
import { useState } from "react";
import { TbSquareRoundedPlus2 } from "react-icons/tb";
import { addNewTask } from "@/lib/actions";
import { useRouter } from "next/navigation";
import DueDates from "./DueDates";

function NewTaskInput({
  isPlanned,
  type,
}: {
  isPlanned?: boolean;
  type?: "important" | "myDay";
}) {
  const [startNewTask, setStartNewTask] = useState(false);
  const [dropDownCalendar, setDropDownCalendar] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [pickDueDate, setPickDueDate] = useState("");

  const { refresh } = useRouter();

  const handleClick = () => {
    setStartNewTask(true);
  };

  const handlePickDueDate = (desc: string) => {
    setPickDueDate(desc);
    setDropDownCalendar(false);
  };

  const addNewTaskAction = async () => {
    let date;

    if (pickDueDate === "Today") {
      date = new Date();
    } else if (pickDueDate === "Tomorrow") {
      const currentDate = new Date();
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);
      date = tomorrow;
    } else if (pickDueDate === "Next Week") {
      const currentDate = new Date();
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(currentDate.getDate() + 7);
      date = nextWeek;
    }

    await addNewTask(
      taskInput,
      isPlanned && !pickDueDate ? new Date() : date,
      type
    );
    setTaskInput("");
    setPickDueDate("");
    refresh();
  };

  return (
    <div className="mt-4">
      {!startNewTask ? (
        <button
          className="bg-white flex gap-5  border-2 border-black shadow-sm rounded py-2 px-3 cursor-pointer hover:bg-white/55 w-full"
          onClick={handleClick}
        >
          <Plus size={25} />
          <span>Add a task</span>
        </button>
      ) : isPlanned ? (
        <form action={addNewTaskAction}>
          <div className="bg-white flex rounded py-2 px-3 border-2 border-black shadow-sm hover:bg-white/55">
            <div className="flex w-full">
              <div className="flex gap-5 flex-1">
                <TbSquareRoundedPlus2 size={25} />
                <input
                  type="text"
                  className="bg-transparent outline-none border-none ring-0 focus:ring-0 focus:border-none focus:outline-none flex-1"
                  name="task"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  autoFocus
                  onFocus={() => setDropDownCalendar(false)}
                />
              </div>
              {taskInput.length > 0 && (
                <div className="flex gap-2 ml-4">
                  {dropDownCalendar && (
                    <DueDates
                      handlePickDueDate={handlePickDueDate}
                      isPlanned={isPlanned}
                    />
                  )}
                  <Calendar
                    className="cursor-pointer"
                    onClick={() => setDropDownCalendar((prev) => !prev)}
                  />
                  <span>{pickDueDate || "Today"}</span>
                </div>
              )}
            </div>
          </div>
        </form>
      ) : (
        <form action={addNewTaskAction}>
          <div className="bg-white flex rounded py-2 px-3 border-2 border-black shadow-sm hover:bg-white/55">
            <div className="flex w-full">
              <div className="flex gap-5 flex-1">
                <TbSquareRoundedPlus2 size={25} />
                <input
                  type="text"
                  className="bg-transparent outline-none border-none ring-0 focus:ring-0 focus:border-none focus:outline-none flex-1"
                  name="task"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  autoFocus
                  onFocus={() => setDropDownCalendar(false)}
                />
              </div>
              {taskInput.length > 0 && (
                <div className="flex gap-2 ml-4">
                  {dropDownCalendar && (
                    <DueDates handlePickDueDate={handlePickDueDate} />
                  )}
                  <Calendar
                    className="cursor-pointer"
                    onClick={() => setDropDownCalendar((prev) => !prev)}
                  />
                  {pickDueDate && <span>{pickDueDate}</span>}
                </div>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default NewTaskInput;
