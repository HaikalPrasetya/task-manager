import NewTaskInput from "@/components/common/NewTaskInput";
import TasksUser from "@/components/home/TasksUser";
import prisma from "@/lib/client";
import { SlOptions } from "react-icons/sl";
import { IoIosSunny } from "react-icons/io";

async function MyDayPage() {
  const tasksNotCompleted = await prisma.task.findMany({
    where: {
      userId: 11,
      isCompleted: false,
      addedToMyDay: true,
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
          <IoIosSunny size={40} fill="orange" />,
          <h1 className="font-bold text-3xl">My Day</h1>
        </div>
        <div className="cursor-pointer">
          <SlOptions size={25} />
        </div>
      </div>

      <TasksUser tasks={tasksNotCompleted} />

      <div className="mt-auto">
        <NewTaskInput type="myDay" />
      </div>
    </div>
  );
}

export default MyDayPage;
