import CustomTaskInput from "@/components/CustomTaskInput";
import CustomTittleOfTasks from "@/components/CustomTittleOfTasks";
import TasksUser from "@/components/home/TasksUser";
import prisma from "@/lib/client";

async function CustomTasks({ params }: { params: { id: string } }) {
  const getCustomTasks = await prisma.customTask.findFirst({
    where: {
      id: Number(params.id),
      userId: 11,
    },
    include: {
      task: {
        include: {
          steps: true,
        },
      },
    },
  });

  if (!getCustomTasks) return null;

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 96px)" }}>
      <CustomTittleOfTasks
        customTaskId={params.id}
        title={getCustomTasks.title}
      />

      <TasksUser tasks={getCustomTasks.task} />

      <div className="mt-auto">
        <CustomTaskInput customId={params.id} />
      </div>
    </div>
  );
}

export default CustomTasks;
