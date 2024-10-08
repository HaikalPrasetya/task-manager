"use client";

import { switchTaskToImportant, switchToCompletedTask } from "@/lib/actions";
import { getTaskDateLabel } from "@/lib/formatDate";
import { Step, Task } from "@prisma/client";
import { Calendar, NotebookPen, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { IoSunny } from "react-icons/io5";

function TaskInteraction({
  task,
  audioRef,
  setIsDrawerActive,
  setSelectedTask,
}: {
  task: Task & { steps: Step[] };
  audioRef?: MutableRefObject<HTMLAudioElement | null>;
  setIsDrawerActive: Dispatch<SetStateAction<boolean>>;
  setSelectedTask: Dispatch<
    SetStateAction<
      | {
          id: number;
          userId: number;
          title: string;
          dueDate: Date | null;
          note: string | null;
          isCompleted: boolean;
          isImportant: boolean;
          addedToMyDay: boolean;
          updatedAt: Date;
          createdAt: Date;
        }
      | undefined
    >
  >;
}) {
  const { refresh } = useRouter();

  let countStepOfTaskIsCompleted = 0;

  for (let i = 0; i < task.steps.length; i++) {
    if (task.steps[i].isCompleted) {
      countStepOfTaskIsCompleted++;
    }
  }

  const changeStatusOfTask = async (taskId: number, prevState: boolean) => {
    await switchToCompletedTask(taskId, prevState);

    if (!prevState) {
      if (audioRef?.current) {
        audioRef.current.play();
      }
    }

    refresh();
  };

  const changeStarOfTask = async (taskId: number, prevState: boolean) => {
    await switchTaskToImportant(taskId, prevState);

    refresh();
  };

  const handleClickTask = () => {
    setIsDrawerActive(true);
    setSelectedTask(task);
  };

  return (
    <div
      className="flex w-full bg-white py-2 px-3 rounded border-2 border-black shadow-md cursor-pointer hover:bg-slate-200 items-center h-[70px] justify-between"
      onClick={handleClickTask}
    >
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex gap-2">
          <input
            onClick={(e) => e.stopPropagation()}
            type="checkbox"
            className="w-5"
            checked={task.isCompleted}
            onChange={() => changeStatusOfTask(task.id, task.isCompleted)}
          />

          <span>{task.title}</span>
        </div>
        <div className="flex gap-2">
          {!task.dueDate ? (
            <div className="flex gap-1 items-center">
              <NotebookPen size={15} />
              <span>Note</span>
            </div>
          ) : (
            <div className="flex">
              <div className="flex items-center gap-3">
                <Calendar size={15} />
                <span suppressHydrationWarning={true}>
                  {getTaskDateLabel(task.dueDate)}
                </span>
              </div>
            </div>
          )}
          {task.steps.length > 0 && (
            <div className="flex gap-1">
              <span>{countStepOfTaskIsCompleted}</span>
              <span>of</span>
              <span>
                {"➡️"} {task.steps.length} {"➡️"}
              </span>
            </div>
          )}
          {task.note && <p>{task.note}</p>}
          {task.addedToMyDay && (
            <div className="flex gap-2 items-center">
              <IoSunny />
              <span>My Day</span>
            </div>
          )}
        </div>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          changeStarOfTask(task.id, task.isImportant);
        }}
      >
        {task.isImportant ? <Star fill="orange" /> : <Star />}
      </div>
    </div>
  );
}
export default TaskInteraction;
