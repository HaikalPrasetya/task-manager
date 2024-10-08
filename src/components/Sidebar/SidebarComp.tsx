"use client";

import { useSidebar } from "@/context/MobileSidebar";
import Button from "../Button";
import { useState } from "react";
import { List } from "lucide-react";
import Input from "../Input";
import Link from "next/link";
import { mainLinks } from "@/constans/mainLinks";
import { CustomTask, User } from "@prisma/client";
import Avatar from "../Avatar";
import { usePathname, useRouter } from "next/navigation";
import { addNewCustomTask } from "@/lib/actions";

function SidebarComp({
  user,
  customTasks,
}: {
  user: User;
  customTasks: CustomTask[];
}) {
  const { active, toggleActive } = useSidebar();
  const { refresh } = useRouter();
  const [addNewListIsActive, setAddNewListIsActive] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState("");
  const pathname = usePathname();

  const addNewTask = async () => {
    await addNewCustomTask(newTaskInput);

    setAddNewListIsActive(false);
    setNewTaskInput("");

    refresh();
  };

  return (
    <div
      className={`${
        active ? "flex w-[400px] absolute" : "hidden w-[320px]"
      } lg:block flex-col gap-2 bg-white h-screen border-r-2 border-black relative`}
    >
      {active && (
        <Button className="absolute right-4" onClick={() => toggleActive()}>
          X
        </Button>
      )}
      {/* PROFILE SECTION */}
      <div className="flex gap-3 items-center p-3">
        <Avatar imageUrl={user.profilePicture || "/noAvatar.png"} />
        <div>
          <h3 className="font-bold text-lg">{user.name}</h3>
          <h3 className="font-bold text-xs text-wrap text-slate-600">
            {user.email}
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* TOP SECTION */}
        <div className="flex flex-col gap-3 mt-4 border-b-2 border-black p-3">
          {mainLinks.map((links) => (
            <Link
              href={`${links.link}`}
              key={links.title}
              className={`flex items-center gap-3 hover:bg-slate-200 py-2 px-1 rounded cursor-pointer relative ${
                pathname === links.link && "bg-slate-200"
              }`}
            >
              {pathname === links.link && (
                <div className="absolute left-0 h-1/2 w-1 bg-slate-800 rounded-full" />
              )}
              {links.icon}
              {links.title}
            </Link>
          ))}
        </div>
        {/* BOTTOM SECTION */}
        <div className="flex flex-col gap-3 mt-2 px-3">
          {customTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 hover:bg-slate-400 py-2 px-1 rounded cursor-pointer"
            >
              <List />
              <Link href={`/customTask/${task.id}`}>{task.title}</Link>
            </div>
          ))}
          {addNewListIsActive && (
            <div className="flex items-center gap-3">
              <List />
              <form action={addNewTask}>
                <Input
                  value={newTaskInput}
                  setValue={setNewTaskInput}
                  placeholder="New task..."
                  name="newTask"
                />
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-3 left-2">
        <Button
          className="bg-black text-white"
          onClick={() => setAddNewListIsActive(true)}
        >
          + New List
        </Button>
      </div>
    </div>
  );
}
export default SidebarComp;
