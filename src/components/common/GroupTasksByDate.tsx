"use client";

import { TaskWithSteps } from "@/app/(main)/planned/page";
import TaskInteraction from "./TaskInteraction";
import Button from "../Button";
import { useState } from "react";
import { Step, Task } from "@prisma/client";
import TaskDetail from "./TaskDetail";

function GroupTasksByDate({
  tasks,
  title,
}: {
  tasks: TaskWithSteps[];
  title: string;
}) {
  const [openDropdown, setOpenDropdown] = useState(true);
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  return (
    <div className="flex flex-col gap-2 mt-4">
      {tasks.length > 0 && (
        <div>
          <Button
            className="w-fit text-white font-semibold text-md mb-3"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            {title} ({tasks.length})
          </Button>
          <div className="flex flex-col gap-4">
            {openDropdown &&
              tasks.map((task) => (
                <TaskInteraction
                  key={task.id}
                  task={task}
                  setIsDrawerActive={setIsDrawerActive}
                  setSelectedTask={setSelectedTask}
                />
              ))}
          </div>
        </div>
      )}
      {isDrawerActive && selectedTask && (
        <TaskDetail
          isDrawerActive={isDrawerActive}
          setIsDrawerActive={setIsDrawerActive}
          selectedTask={
            tasks.find((data) => data.id === selectedTask.id) as Task & {
              steps: Step[];
            }
          }
        />
      )}
    </div>
  );
}
export default GroupTasksByDate;
