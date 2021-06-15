const db = require('../../db');
const User = require('./user.model');

// table's name in database
const TABLE_NAME = 'users';

const getAll = async () => db[TABLE_NAME];

const post = async (body) => {

  const newUser = new User(body);
  newUser.id = await db.post(newUser, TABLE_NAME);
  return newUser;

}

const getById = async (id) => {

  const user = await db.getById(id, TABLE_NAME);
  return user;

};

const put = async (id, body) => {

  const user = await db.put(id, body, TABLE_NAME);
  return user;

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
