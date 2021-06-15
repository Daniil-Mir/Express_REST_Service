const uuid = require('uuid').v4;
const User = require('./resources/users/user.model');
const Board = require('./resources/boards/board.model');

const db = {
  users: [],
  tasks: [],
  boards: [],

  post(instanceOfClass, tableName) { 

    const entity = instanceOfClass;
    entity.id = uuid();
    db[tableName].push(entity);
    return entity.id;

  },

  getById(id, tableName) { 
    
    const concreteEntity = this[tableName].find((entity) => entity.id === id);
    return concreteEntity;
  
  },

  put(id, body, tableName) {

    const concreteEntity = this[tableName].find((entity) => entity.id === id);
    if (concreteEntity !== -1) {

      // for users
      if (body.name) concreteEntity.name = body.name;
      if (body.login) concreteEntity.login = body.login;
      if (body.password) concreteEntity.password = body.password;

      // for boards
      if (body.title) concreteEntity.title = body.title;
      if (body.columns) concreteEntity.columns = body.columns;

    };

    return concreteEntity;

  },

  remove(id, tableName) {

    const index = this[tableName].findIndex((entity) => entity.id === id);
    if (index !== -1) this[tableName].splice(index, 1);
    return index;

  }

};

// init the db new 3 users for start
(function initUsers() {

  for (let i = 0; i < 3; i += 1) {

    const newUser = new User();
    newUser.id = uuid();
    db.users.push(newUser);

  };

})();

// init the db new 3 boards for start
(function initBoards() {

  for (let i = 0; i < 3; i += 1) {

    const newBoard = new Board();
    newBoard.id = uuid();
    db.boards.push(newBoard);

  };

})();


module.exports = db;
