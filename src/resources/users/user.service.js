const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const post = (body) => usersRepo.post(body);

const getById = (id) => usersRepo.getById(id);

const put = (id, body) => usersRepo.put(id, body);

const remove = (id) => usersRepo.remove(id);

module.exports = { 

  getAll,
  post,
  getById,
  put,
  remove

};
