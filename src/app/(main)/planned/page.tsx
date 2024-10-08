import NewTaskInput from "@/components/common/NewTaskInput";
import prisma from "@/lib/client";
import { Step, Task } from "@prisma/client";
import { isToday, isTomorrow } from "date-fns";
import { FcPlanner } from "react-icons/fc";
import { SlOptions } from "react-icons/sl";
import GroupTasksByDate from "@/components/common/GroupTasksByDate";

export type TaskWithSteps = Task & { steps: Step[] };

const groupTasksByDay = (tasks: TaskWithSteps[]) => ({
  today: tasks.filter(
    (task) => task.dueDate && isToday(new Date(task.dueDate))
  ),
  tomorrow: tasks.filter(
    (task) => task.dueDate && isTomorrow(new Date(task.dueDate))
  ),
  nextWeek: tasks.filter(
    (task) =>
      task.dueDate && !isTomorrow(task.dueDate) && !isToday(task.dueDate)
  ),
});

async function PlannedTaskPage() {
  const tasks = await prisma.task.findMany({
    where: {
      userId: 11,
    },
    include: {
      steps: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const groupedTasks = groupTasksByDay(tasks);

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 96px)" }}>
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <FcPlanner size={40} fill="red" />,
          <h1 className="font-bold text-3xl">Planned</h1>
        </div>
        <div className="cursor-pointer">
          <SlOptions size={25} />
        </div>
      </div>

      {groupedTasks.today.length > 0 && (
        <GroupTasksByDate tasks={groupedTasks.today} title="Today" />
      )}

      {groupedTasks.tomorrow.length > 0 && (
        <GroupTasksByDate tasks={groupedTasks.tomorrow} title="Tomorrow" />
      )}

      {groupedTasks.nextWeek.length > 0 && (
        <GroupTasksByDate tasks={groupedTasks.nextWeek} title="Later" />
      )}

      <div className="mt-auto">
        <NewTaskInput isPlanned />
      </div>
    </div>
  );
}

export default PlannedTaskPage;
