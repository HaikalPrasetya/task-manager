import prisma from "@/lib/client";
import SidebarComp from "./SidebarComp";

async function Sidebar() {
  const user = await prisma.user.findFirst({
    where: {
      id: 11,
    },
  });

  const customTasks = await prisma.customTask.findMany({
    where: {
      userId: 11,
    },
  });

  if (!user) return null;

  return <SidebarComp user={user} customTasks={customTasks} />;
}
export default Sidebar;
