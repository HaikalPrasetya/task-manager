"use server";

import prisma from "./client";
import bcrypt from "bcrypt";
import { isToday } from "date-fns";

export const registerUser = async ({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string | undefined;
}) => {
  if (password !== confirmPassword) {
    return { success: false, message: "Password do not match!" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { success: false, message: "User already exist" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: email.split("@")[0],
      },
    });

    const hashedUserId = await bcrypt.hash(newUser.id.toString(), 10);

    return {
      success: true,
      message: "User registered successfully",
      data: hashedUserId,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const addNewTask = async (
  title: string,
  date: Date | undefined,
  type?: "important" | "myDay"
) => {
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        dueDate: date,
        user: {
          connect: { id: 11 },
        },
        addedToMyDay: type === "myDay" ? true : isToday(date!),
        isImportant: type === "important" ? true : false,
      },
    });

    return {
      success: true,
      message: "Successfully added new Task",
      data: newTask,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const switchToCompletedTask = async (
  taskId: number,
  prevStatus: boolean
) => {
  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        isCompleted: prevStatus ? false : true,
      },
    });
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong!" };
  }
};

export const switchTaskToImportant = async (
  taskId: number,
  prevState: boolean
) => {
  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        isImportant: !prevState,
      },
    });
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error!" };
  }
};

export const addNoteIntoTask = async (taskId: number, note: string) => {
  try {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
      },
    });

    if (task) {
      await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          note,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong!" };
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong!" };
  }
};

export const updateDueDateOfTask = async (taskId: number, dueDate?: Date) => {
  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        dueDate: dueDate ? dueDate : null,
        addedToMyDay: isToday(dueDate!),
      },
    });
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const handleStepOfTask = async (taskId: number, desc: string) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (task) {
      await prisma.step.create({
        data: {
          name: desc,
          taskId,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const switchStepCompleteStatus = async (
  stepId: number,
  taskId: number
) => {
  try {
    const existingStep = await prisma.step.findUnique({
      where: {
        id: stepId,
        taskId,
      },
    });

    if (existingStep) {
      await prisma.step.update({
        where: {
          id: existingStep.id,
        },
        data: {
          isCompleted: !existingStep.isCompleted,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong!" };
  }
};

export const deleteStepFromTask = async (stepId: number, taskId: number) => {
  try {
    const existingStep = await prisma.step.findFirst({
      where: {
        id: stepId,
        taskId,
      },
    });

    if (existingStep) {
      await prisma.step.delete({
        where: {
          id: existingStep.id,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong!" };
  }
};

export const promoteToTask = async (stepId: number, taskId: number) => {
  try {
    const existingStep = await prisma.step.findFirst({
      where: {
        id: stepId,
        taskId,
      },
    });

    if (existingStep) {
      await prisma.step.delete({
        where: {
          id: stepId,
          taskId,
        },
      });

      await prisma.task.create({
        data: {
          title: existingStep.name,
          userId: 11,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const removeFromMyDay = async (taskId: number) => {
  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        addedToMyDay: false,
      },
    });
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const addedTaskToMyDay = async (taskId: number) => {
  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        addedToMyDay: true,
      },
    });
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const addNewCustomTask = async (title: string) => {
  try {
    await prisma.customTask.create({
      data: {
        title: title ? title : "Untitled list",
        user: {
          connect: { id: 11 },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong!" };
  }
};

export const updateCustomTaskTittle = async (id: number, title: string) => {
  try {
    const customTask = await prisma.customTask.findFirst({
      where: {
        id,
      },
    });

    if (customTask) {
      await prisma.customTask.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong!" };
  }
};

export const addNewTaskOnCustomTask = async (
  customId: number,
  title: string,
  date: Date
) => {
  try {
    await prisma.task.create({
      data: {
        title,
        customId,
        userId: 11,
        dueDate: date,
        isCustomTask: true,
      },
    });
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};
