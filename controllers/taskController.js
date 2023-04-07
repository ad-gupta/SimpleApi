import { Task } from "../Models/taskModel.js";

export const getMyTask = async (req, resp, next) => {
  const userID = req.user._id;

  const tasks = await Task.find({ user: userID });

  resp.status(200).json({
    success: true,
    tasks,
  });
};

export const newTask = async (req, resp, next) => {
  try{
    const { title, description } = req.body;

  const newTask = await Task.create({
    title,
    description,
    user: req.user,
  });

  resp.status(201).json({
    success: true,
    message: "Task added successfully",
  });
  }catch(err){
    next(err)
  }
};

export const updateTask = async (req, resp, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) return next(new Error("Invalid ID"));

    task.isCompleted = !task.isCompleted;

    await task.save();

    resp.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, resp, next) => {
  try {
    const id = req.params.id;

    const task = await Task.findById({ _id: id });

    if (!task) {
      return next(new Error("Invalid ID"));
    }

    await Task.deleteOne({ _id: id });

    resp.status(200).json({
      success: true,
      message: "Task Deleted",
      task,
    });
  } catch (err) {
    next(err);
  }
};
