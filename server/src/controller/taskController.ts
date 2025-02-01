import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  try {
    const task = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        attachments: true,
        comments: true,
      },
    });
    res.json(task);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving task: ${error.message}` });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });
    res.status(201).json(newTask);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating a Task: ${error.message}` });
  }
};

export const updateTasksStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status: status,
      },
    });
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating task: ${error.message}` });
  }
};


export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  
  try {
    const task = await prisma.task.findMany({
      where: {
        OR:[
          {authorUserId:Number(userId)},
          {assignedUserId:Number(userId)}
        ]
      },
      include: {
        author: true,
        assignee: true,
        attachments: true,
        comments: true,
      },
    });
    res.json(task);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user's task: ${error.message}` });
  }
};