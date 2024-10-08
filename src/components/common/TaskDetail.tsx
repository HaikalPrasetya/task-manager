"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Drawer from "../Drawer";
import { Step, Task } from "@prisma/client";
import {
  Calendar,
  Circle,
  CircleCheckBig,
  Plus,
  Star,
  Trash,
  X,
} from "lucide-react";
import { getTaskDateLabel } from "@/lib/formatDate";
import {
  addedTaskToMyDay,
  addNoteIntoTask,
  deleteStepFromTask,
  deleteTask,
  handleStepOfTask,
  promoteToTask,
  removeFromMyDay,
  switchStepCompleteStatus,
  switchTaskToImportant,
  switchToCompletedTask,
  updateDueDateOfTask,
} from "@/lib/actions";
import { useRouter } from "next/navigation";
import { IoIosSunny } from "react-icons/io";
import { TbCalendarDue } from "react-icons/tb";
import { useToastContext } from "@/context/ToastContext";
import { dayDateFormat } from "@/lib/datDate";
import { dueDates } from "@/constans/dueDate";
import { SlOptions } from "react-icons/sl";

function TaskDetail({
  isDrawerActive,
  setIsDrawerActive,
  selectedTask,
}: {
  isDrawerActive: boolean;
  setIsDrawerActive: Dispatch<SetStateAction<boolean>>;
  selectedTask: Task & { steps: Step[] };
}) {
  const { refresh } = useRouter();
  const { setToast } = useToastContext();
  const [note, setNote] = useState(selectedTask?.note || "");
  const [dueDateToggleIsActive, setDueDateToggleIsActive] = useState(false);
  const [addStepLineIsActive, setAddStepLineIsActive] = useState(false);
  const [stepInput, setStepInput] = useState("");

  const changeStarOfTask = async (taskId: number, prevState: boolean) => {
    await switchTaskToImportant(taskId, prevState);

    refresh();
  };

  const changeStatusOfTask = async (taskId: number, prevState: boolean) => {
    await switchToCompletedTask(taskId, prevState);

    refresh();
  };

  const addNote = async () => {
    await addNoteIntoTask(selectedTask.id, note as string);

    refresh();
  };

  const handleDeleteTask = async () => {
    setIsDrawerActive(false);
    await deleteTask(selectedTask.id);
    refresh();

    setToast("Task has been deleted");
  };

  const handleUpdateDueDateOfTask = async () => {
    await updateDueDateOfTask(selectedTask.id);

    refresh();
  };

  const handlePickDueDate = async (title: string) => {
    let date;
    if (title === "Today") {
      date = new Date();
    } else if (title === "Tomorrow") {
      const currentDate = new Date();
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);
      date = tomorrow;
    }

    await updateDueDateOfTask(selectedTask.id, date);

    refresh();
  };

  const addStep = async () => {
    await handleStepOfTask(selectedTask.id, stepInput);

    refresh();

    setStepInput("");
    setAddStepLineIsActive(true);
  };

  const handleStatusStep = async (stepId: number) => {
    await switchStepCompleteStatus(stepId, selectedTask.id);

    refresh();
  };

  const handleDeleteStep = async (stepId: number) => {
    await deleteStepFromTask(stepId, selectedTask.id);

    refresh();
  };

  const handleSwitchToMainTask = async (stepId: number) => {
    await promoteToTask(stepId, selectedTask.id);

    refresh();
  };

  const handleRemoveFromMyDay = async () => {
    await removeFromMyDay(selectedTask.id);

    setIsDrawerActive(false);

    refresh();
  };

  const handleTaskToMyDay = async () => {
    await addedTaskToMyDay(selectedTask.id);

    refresh();
  };

  return (
    <Drawer active={isDrawerActive} setActive={setIsDrawerActive}>
      <div className="flex flex-col gap-4 h-screen">
        <button
          className="self-end mr-2 mt-3 text-md font-semibold"
          onClick={() => setIsDrawerActive(!isDrawerActive)}
        >
          X
        </button>
        <div className="bg-white flex flex-col gap-4 border-2 border-black shadow-sm rounded p-2">
          <div className="flex w-full bg-white rounded cursor-pointer justify-between">
            <div className="flex gap-4 items-center">
              <input
                type="checkbox"
                className="w-5"
                checked={selectedTask.isCompleted}
                onChange={() =>
                  changeStatusOfTask(selectedTask.id, selectedTask.isCompleted)
                }
              />
              {!selectedTask.dueDate ? (
                <span className="text-2xl font-semibold">
                  {selectedTask.title}
                </span>
              ) : (
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold">
                    {selectedTask.title}
                  </span>
                  <div className="flex items-center gap-3">
                    <Calendar size={15} />
                    <span suppressHydrationWarning={true}>
                      {getTaskDateLabel(selectedTask.dueDate)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={() =>
                changeStarOfTask(selectedTask.id, selectedTask.isImportant)
              }
            >
              {selectedTask.isImportant ? <Star fill="orange" /> : <Star />}
            </div>
          </div>
          {selectedTask.steps.length > 0 && (
            <>
              {selectedTask.steps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <input
                      type="checkbox"
                      checked={step.isCompleted}
                      onChange={() => handleStatusStep(step.id)}
                    />
                    <span>{step.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleCheckBig
                      size={17}
                      className="cursor-pointer"
                      onClick={() => handleStatusStep(step.id)}
                      fill={step.isCompleted ? "green" : "white"}
                    />
                    <Plus
                      size={17}
                      className="cursor-pointer"
                      onClick={() => handleSwitchToMainTask(step.id)}
                    />
                    <Trash
                      size={17}
                      className="cursor-pointer"
                      onClick={() => handleDeleteStep(step.id)}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
          <div className="flex gap-3">
            {addStepLineIsActive ? (
              <div className="flex items-center justify-between">
                <form action={addStep} className="flex gap-4 items-center">
                  <Circle size={25} />
                  <input
                    type="text"
                    className="w-[70%] py-2 px-1 bg-transparent border-b-2 border-black focus:outline-none"
                    value={stepInput}
                    onChange={(e) => setStepInput(e.target.value)}
                    onBlur={() => setAddStepLineIsActive(false)}
                  />
                </form>
                <div className="cursor-pointer">
                  <SlOptions />
                </div>
              </div>
            ) : (
              <>
                <Plus
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setAddStepLineIsActive(true)}
                />
                Add a step
              </>
            )}
          </div>
        </div>
        <div className="bg-white border-2 border-black shadow-md rounded p-2 flex items-center gap-4 ">
          {selectedTask.addedToMyDay ? (
            <div className="text-blue-500 flex items-center justify-between w-full gap-2">
              <div className="flex gap-2 hover:bg-slate-200 cursor-pointer flex-1 py-1 rounded">
                <IoIosSunny size={25} />
                <span>Added to My Day</span>
              </div>
              <form action={handleRemoveFromMyDay}>
                <button className="hover:bg-slate-200 rounded py-1">
                  <X />
                </button>
              </form>
            </div>
          ) : (
            <form action={handleTaskToMyDay} className="flex w-full">
              <button className="flex gap-2 hover:bg-slate-200 cursor-pointer flex-1 py-1 rounded">
                <IoIosSunny size={25} />
                <span>Add to My Day</span>
              </button>
            </form>
          )}
        </div>
        {selectedTask.dueDate ? (
          <div className="bg-white border-2 border-black shadow-md rounded p-2 flex items-center justify-between cursor-pointer">
            <div className="flex gap-4 hover:bg-slate-200 flex-1 p-2 rounded">
              <TbCalendarDue size={25} />
              <span>Due {dayDateFormat(selectedTask.dueDate)}</span>
            </div>
            <button
              className="hover:bg-slate-200 p-2 rounded"
              onClick={handleUpdateDueDateOfTask}
            >
              <X />
            </button>
          </div>
        ) : (
          <div
            className="bg-white border-2 border-black shadow-md rounded p-2 flex items-center gap-4 hover:bg-slate-200 cursor-pointer relative"
            onClick={() => setDueDateToggleIsActive(true)}
          >
            <TbCalendarDue size={25} />
            <span>Add due date</span>

            {dueDateToggleIsActive && (
              <div className="w-[250px] absolute p-4 top-0 rounded shadow-md bg-white border-2 border-black flex flex-col gap-2">
                {dueDates.slice(0, dueDates.length - 1).map((data) => (
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
          </div>
        )}
        <div className="bg-white border-2 border-black shadow-md rounded p-2 flex items-center gap-4 hover:bg-slate-200 cursor-pointer">
          <form action={addNote} className="flex gap-2">
            <textarea
              className="w-full bg-transparent focus:ring-0 focus:border-none focus:outline-none"
              placeholder="Add a note"
              value={note || ""}
              onChange={(e) => setNote(e.target.value)}
            />
            <button>Add</button>
          </form>
        </div>
        <div className="mt-auto w-full flex justify-center border-t-2 border-black py-4 relative">
          <span>Created at {dayDateFormat(selectedTask.createdAt)}</span>
          <button className="absolute right-2" onClick={handleDeleteTask}>
            <Trash />
          </button>
        </div>
      </div>
    </Drawer>
  );
}
export default TaskDetail;
