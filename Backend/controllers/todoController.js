import Todo from "../models/todoModel.js";
//create todo
export const createTodo = async (req, res) => {
try {
  const { title, description, completed, createdBy } = req.body;
  if (!title || !description || !createdBy) {
    return res.status(400).json({ message: "Title, description, and createdBy are required" });
  }
  // Create a new todo item
  const todoItem = new Todo({
    title,
    description,
    completed: completed || false,
    createdBy
  });
 const result= await  todoItem.save();
  return res.status(201).json({ message: "Todo created successfully",  todoItem: result });
} catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Internal server error" });
}
};
//get all todos
export const getAllTodos = async (req, res) => {
  try {
   const { userId } = req.params;
    if (!userId) {
      return res.status(400).send({ success: false, message: "User ID is required" });
    }
   const todos = await Todo.find({ createdBy: userId });
  if(!todos){
    return res.status(404).send({
      success:true, message: "You have no todos yet" });
  }
  res.status(200).send({
    success: true,
    message: "Todos fetched successfully",
     todos 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "Error fetching todos" });
  }
};
//delete todo
export const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    if (!todoId) {
      return res.status(400).send({ success: false, message: "Todo ID is required" });
    }
    const deletedTodo = await Todo.findByIdAndDelete({ _id: todoId });
    if (!deletedTodo) {
      return res.status(404).send({ success: false, message: "Todo not found" });
    }
    return res.status(200).send({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "Error when deleting todo" });
  }
};
//update todo
export const updateTodo=async (req,res) => {
try {
  const { todoId } = req.params;
  const data = req.body;
  if (!todoId) {
    return res.status(400).send({ success: false, message: "Todo ID is required" });
  }
  const updatedTodo = await Todo.findByIdAndUpdate(todoId, { $set: data }, { returnOriginal: false });
  if (!updatedTodo) {
    return res.status(404).send({ success: false, message: "Todo not found" });
  }
  return res.status(200).send({ success: true, message: "Todo updated successfully", todo: updatedTodo });
} catch (error) {
  console.log(error);
  return res.status(500).send({ success: false, message: "Error when updating todo" });
}

}