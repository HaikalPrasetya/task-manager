"use client";

import { updateCustomTaskTittle } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SlOptions } from "react-icons/sl";

type Props = {
  customTaskId: string;
  title: string;
};

function CustomTittleOfTasks({ customTaskId, title }: Props) {
  const { refresh } = useRouter();
  const [toggleTittleUpdate, setToggleTittleUpdate] = useState(false);
  const [newTittleInput, setNewTittleInput] = useState(title);

  const handleOpenToggle = () => {
    setToggleTittleUpdate(true);
  };

  const updateTitle = async () => {
    if (!newTittleInput) return;

    await updateCustomTaskTittle(Number(customTaskId), newTittleInput);
    setToggleTittleUpdate(false);

    refresh();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4">
        {toggleTittleUpdate ? (
          <form action={updateTitle}>
            <input
              type="text"
              value={newTittleInput}
              onChange={(e) => setNewTittleInput(e.target.value)}
              className="py-2 px-3 rounded focus:outline-none border-2 border-black bg-transparent"
              onBlur={() => setToggleTittleUpdate(false)}
            />
          </form>
        ) : (
          <h1
            className="font-bold text-3xl hover:bg-slate-200 py-2 px-3 cursor-pointer"
            onClick={handleOpenToggle}
          >
            {title}
          </h1>
        )}
      </div>
      <div className="cursor-pointer">
        <SlOptions size={25} />
      </div>
    </div>
  );
}
export default CustomTittleOfTasks;
