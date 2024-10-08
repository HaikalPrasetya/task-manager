"use client";

import Button from "@/components/Button";
import TaskDetail from "@/components/common/TaskDetail";
import TaskInteraction from "@/components/common/TaskInteraction";
import { Task } from "@prisma/client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";

function CompletedTasks({ tasks }: { tasks: Task[] }) {
  const [isExpand, setIsExpand] = useState(true);
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <div>
      <audio autoPlay src="/uncompleted.mp3" />
      <div className="flex items-center gap-2">
        <Button
          className="text-md font-semibold bg-cyan-500"
          onClick={() => setIsExpand(!isExpand)}
        >
          Completed {tasks.length}
        </Button>
        {isExpand ? <ChevronDown /> : <ChevronUp />}
      </div>

      <div className="flex flex-col gap-2 mt-5">
        {tasks &&
          isExpand &&
          tasks.map((task) => (
            <TaskInteraction
              key={task.id}
              task={task}
              audioRef={audioRef}
              setSelectedTask={setSelectedTask}
              setIsDrawerActive={setIsDrawerActive}
            />
          ))}
        {isDrawerActive && selectedTask && (
          <TaskDetail
            isDrawerActive={isDrawerActive}
            setIsDrawerActive={setIsDrawerActive}
            selectedTask={
              tasks.find((data) => data.id === selectedTask.id) as Task
            }
          />
        )}
      </div>
    </div>
  );
}
export default CompletedTasks;
