export const getAllTodos = (req, res, next) => {
  res.send("all todos");
};

export const createTodo = (req, res, next) => {
  res.send("created todo");
};

export const getTodo = (req, res, next) => {
  res.send("get todo");
};

export const updateTodo = (req, res, next) => {
  res.send("updated todo");
};

export const deleteTodo = (req, res, next) => {
  res.send("deleted todo");
};
