import NewTaskInput from "@/components/common/NewTaskInput";
import TasksUser from "@/components/home/TasksUser";
import prisma from "@/lib/client";
import { SlOptions } from "react-icons/sl";
import { FaRegStar } from "react-icons/fa";

async function ImportantTaskPage() {
  const tasksNotCompleted = await prisma.task.findMany({
    where: {
      userId: 11,
      isCompleted: false,
      isImportant: true,
    },
    include: {
      steps: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 96px)" }}>
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <FaRegStar size={40} fill="red" />,
          <h1 className="font-bold text-3xl">Important</h1>
        </div>
        <div className="cursor-pointer">
          <SlOptions size={25} />
        </div>
      </div>

      <TasksUser tasks={tasksNotCompleted} />

      <div className="mt-auto">
        <NewTaskInput type={"important"} />
      </div>
    </div>
  );
}

export default ImportantTaskPage;
