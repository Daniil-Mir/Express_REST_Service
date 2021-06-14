const db = require('../../db');

const getAll = async () => db.users;

const post = async (body) => {

  const newUser = await db.post(body);
  return newUser;

}

const getById = async (id) => {

  const user = await db.getById(id);
  return user;

};

const put = async (id, body) => {

  const user = await db.put(id, body);
  return user;

};

const remove = async (id) => {
  
  const result = await db.remove(id);
  return result;

}

module.exports = {

  getAll,
  post,
  getById,
  put,
  remove

};
