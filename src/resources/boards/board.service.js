const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const post = (body) => boardsRepo.post(body);

const getById = (id) => boardsRepo.getById(id);

const put = (id, body) => boardsRepo.put(id, body);

const remove = (id) => boardsRepo.remove(id);

module.exports = {

  getAll,
  post,
  getById,
  put,
  remove

};
