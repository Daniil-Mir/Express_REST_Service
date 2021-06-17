const tasksRepo = require('./task.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);

const post = (body, boardId) => tasksRepo.post(body, boardId);

const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const put = (body, boardId, taskId) => tasksRepo.put(body, boardId, taskId);

const remove = (taskId) => tasksRepo.remove(taskId);

module.exports = {

  getAll,
  post,
  getById,
  put,
  remove

};
