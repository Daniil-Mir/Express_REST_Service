const db = require('../../db');

const getAll = async () => db.users;

const getById = async (id) => {

  const user = await db.getById(id);
  return user;

};

module.exports = {

  getAll,
  getById

};
