const db = require('../../db');
const User = require('./user.model');
const NOT_FOUND_ERROR = require('../../errors/appError');

// table's name in database
const TABLE_NAME = 'users';

const getAll = async () => db.getAll(TABLE_NAME);

const post = async (body) => {

  const newUser = new User(body);
  newUser.id = await db.post(newUser, TABLE_NAME);
  return newUser;

}

const getById = async (id) => {

  const user = await db.getById(id, TABLE_NAME);

  // Error if user not found
  if (!user) throw new NOT_FOUND_ERROR(`Couldn't find a user with id: ${id}`);

  return user;

};

const put = async (id, body) => {

  const user = await db.put(id, body, TABLE_NAME);

  // Error if user not found
  if (!user) throw new NOT_FOUND_ERROR(`Couldn't find a user with id: ${id}`)

  return user;

};

const remove = async (id) => {
  
  const index = await db.remove(id, TABLE_NAME);

  // Error if user not found 
  if (index === -1) throw new NOT_FOUND_ERROR(`Couldn't find a user with id: ${id}`);

  return index;

}

module.exports = {

  getAll,
  post,
  getById,
  put,
  remove

};
