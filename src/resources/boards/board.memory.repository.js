const uuid = require('uuid').v4;  // need for generating id for child columns
const db = require('../../db');
const Board = require('./board.model');

// table's name in database
const TABLE_NAME = 'boards';

const getAll = async () => db[TABLE_NAME];

const post = async (body) => {

  const newBoard = new Board(body);
  
  // generate id for child columns
  if (newBoard.columns.length > 0) newBoard.columns.forEach((column) => {

    // instead of column.id = uuid(), to avoid eslint's error "no-return-assign" and "no-param-reassign"
    const tempTasksList = column;
    tempTasksList.id = uuid();
    
  });
  newBoard.id = await db.post(newBoard, TABLE_NAME);
  return newBoard;

};

const getById = async (id) => {

  const board = await db.getById(id, TABLE_NAME);
  return board;

};

const put = async (id, body) => {

  // instead of body.hasOwnPrototype, to avoid eslint's error "no-prototype-builtins"
  const hasBodyProperty = Object.prototype.hasOwnProperty.call(body, 'columns');

  if (hasBodyProperty && body.columns.length > 0) body.columns.forEach((column) => {

    // instead of column.id = uuid(), to avoid eslint's error "no-return-assign" and "no-param-reassign"
    const tempTasksList = column;
    tempTasksList.id = uuid();

  });
  const board = await db.put(id, body, TABLE_NAME);
  return board;

};

const remove = async (id) => {

  const result = await db.remove(id, TABLE_NAME);
  return result;

}

module.exports = {

  getAll,
  post,
  getById,
  put,
  remove

};
