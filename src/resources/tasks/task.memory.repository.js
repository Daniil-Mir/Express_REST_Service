const db = require('../../db');
const Task = require('./task.model');
const NOT_FOUND_ERROR = require('../../errors/appError');

// table's name in database
const TABLE_NAME = 'tasks';

const getAll = async (boardId) => 

  // return array of tasks
   db.getAll(TABLE_NAME).filter((task) => task.boardId === boardId)

;

const post = async(body, boardId) => {

  const newTask = new Task(body);
  newTask.boardId = boardId;
  newTask.id = await db.post(newTask, TABLE_NAME);
  return newTask;

};

const getById = async (boardId, taskId) => {

  const tasksOnBoard = await getAll(boardId);
  const oneTask = tasksOnBoard.filter((task) => task.id === taskId);
  
  // Error if some entities has same id
  if (oneTask.length > 1) {

    console.error(`The DB data is damaged. Table: ${TABLE_NAME}. Entity id: ${taskId}`);
    throw new Error('The DB data is damaged.');

  };

  // Error if task not found
  if (!oneTask[0] || oneTask[0].boardId !== boardId) throw new NOT_FOUND_ERROR(
    `Couldn't find a task with id: ${taskId} on board: ${boardId}`
  );

  return oneTask[0];

};

const put = async (body, boardId, taskId) => {

  const task = await db.put(taskId, body, TABLE_NAME, boardId);
  return task;

};

const remove = async (taskId) => {

  const index = await db.remove(taskId, TABLE_NAME);

  // Error if task not found
  if (index === -1) throw new NOT_FOUND_ERROR(`Couldn't find a task with id: ${taskId}`);

  return index;

};

module.exports = {

  getAll,
  post,
  getById,
  put,
  remove

};
