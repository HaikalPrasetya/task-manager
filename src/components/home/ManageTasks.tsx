"use client";

import { useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import CardTask from "../CardTask";

function ManageTasks() {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <div className="wrapper mt-2">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-2xl">My Tasks</h4>
        <Button
          onClick={() => {
            setIsModalActive(true);
          }}
        >
          Add new task
        </Button>
        <Modal active={isModalActive} setActive={setIsModalActive}>
          <p>This is modal</p>
        </Modal>
      </div>
    </div>
  );
}
export default ManageTasks;
