"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Step, Task } from "@prisma/client";
import TaskInteraction from "../common/TaskInteraction";
import TaskDetail from "../common/TaskDetail";

type Props = Task & { steps: Step[] };

function TasksUser({ tasks }: { tasks: Props[] }) {
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <div className="overflow-scroll hide-scrollbar h-fit">
      <audio ref={audioRef} src="/notification.mp3" />

      {tasks.length === 0 ? (
        <div
          className="flex justify-center items-center"
          style={{ height: "calc(100vh - 160px)" }}
        >
          <div className="flex flex-col gap-3 items-center">
            <Image
              src="https://images.pexels.com/photos/268349/pexels-photo-268349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              width={60}
              height={60}
              className="w-36 h-36 object-cover"
            />
            <p className="text-sm font-medium">
              Tasks with due dates or reminders show up here
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-5">
          {tasks
            .filter((task) => !task.isCompleted)
            .map((t) => (
              <TaskInteraction
                key={t.id}
                task={t}
                audioRef={audioRef}
                setIsDrawerActive={setIsDrawerActive}
                setSelectedTask={setSelectedTask}
              />
            ))}
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
export default TasksUser;
