import NewTaskInput from "@/components/common/NewTaskInput";
import TasksUser from "@/components/home/TasksUser";
import prisma from "@/lib/client";
import { Home } from "lucide-react";
import { SlOptions } from "react-icons/sl";
import CompletedTasks from "./CompletedTasks";

async function Tasks() {
  const getTasks = await prisma.task.findMany({
    where: {
      userId: 11,
      isCustomTask: false,
    },
    include: {
      steps: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const filterTaskIsCompleted = getTasks.filter((data) => data.isCompleted);

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 96px)" }}>
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Home size={40} style={{ color: "slateblue" }} />
          <h1 className="font-bold text-3xl">Home</h1>
        </div>
        <div className="cursor-pointer">
          <SlOptions size={25} />
        </div>
      </div>

      <TasksUser tasks={getTasks} />
      {filterTaskIsCompleted.length > 0 && (
        <div className="mt-5">
          <CompletedTasks tasks={filterTaskIsCompleted} />
        </div>
      )}

      <div className="mt-auto">
        <NewTaskInput />
      </div>
    </div>
  );
}

export default Tasks;
