const uuid = require('uuid').v4;
const User = require('./resources/users/user.model');
const Board = require('./resources/boards/board.model');

const db = {
  users: [
    {
      id: '2',
      name: 'Pavel',
      login: 'Samec',
      password: 'SpiderMan'
    }
  ],
  tasks: [
    {
      id: uuid(),
      title: 'firstTask',
      order: 0,
      description: 'firstTask description',
      userId: '2',
      boardId: '4',
      columnId: 'inProgress'
    },
    {
      id: uuid(),
      title: 'secondTask',
      order: 1,
      description: 'secondTask description',
      userId: '2',
      boardId: '4',
      columnId: 'blocked'
    },
    {
      id: uuid(),
      title: 'thirdTask',
      order: 3,
      description: 'thirdTask description',
      userId: '1',
      boardId: '4',
      columnId: 'review'
    }
  ],
  boards: [
    {
      id: '4',
      title: 'it IS a dinosaur',
      columns: []
    }
  ],

  usersFix(userId) {

    // changing the task.userId field to null after deleting the user
    if (userId) this.tasks.forEach((task) => { 

      const changingTask = task; // to avoid "no-param-reassign" error
      changingTask.userId = changingTask.userId === userId ? null : changingTask.userId 
    
    });

  },

  boardsFix(boardId) {

    // deleting board's tasks after removing the board
    if (boardId) this.tasks = this.tasks.filter((task) => task.boardId !== boardId);

  },

  post(instanceOfClass, tableName) { 

    const entity = instanceOfClass;
    entity.id = uuid();
    db[tableName].push(entity);
    return entity.id;

  },

  getAll(tableName) {

    const table = JSON.parse(JSON.stringify(this[tableName]));
    return table;

  },

  getById(id, tableName) { 
    
    const concreteEntities = this[tableName].filter((entity) => entity.id === id);

    // Error if some entities has same id
    if (concreteEntities.length > 1) {

      console.error(`The DB data is damaged. Table: ${tableName}. Entity id: ${id}`);
      throw new Error('The DB data is damaged.');

    };

    return concreteEntities[0];
  
  },

  put(id, body, tableName, boardId = null) {

    let concreteEntity;

    if (boardId) {

      // additional filtration for the task's table
      const filteredTable = this[tableName].filter((entity) => entity.boardId === boardId);
      concreteEntity = filteredTable.find((entity) => entity.id === id);

    } else {

      concreteEntity = this[tableName].find((entity) => entity.id === id);

    };

    if (concreteEntity !== -1) {

      // for users
      if (body.name) concreteEntity.name = body.name;
      if (body.login) concreteEntity.login = body.login;
      if (body.password) concreteEntity.password = body.password;

      if (boardId) {

        // for tasks
        if (body.title) concreteEntity.title = body.title;
        if (body.order) concreteEntity.order = body.order;
        if (body.description) concreteEntity.description = body.description;
        if (body.userId) concreteEntity.userId = body.userId;
        if (body.boardId) concreteEntity.boardId = body.boardId;
        if (body.columnId) concreteEntity.columnId = body.columnId;

      } else {

        // for boards
        if (body.title) concreteEntity.title = body.title;
        if (body.columns) concreteEntity.columns = body.columns;

      }

    };

    return concreteEntity;

  },

  remove(id, tableName) {

    const index = this[tableName].findIndex((entity) => entity.id === id);
    if (index !== -1) this[tableName].splice(index, 1);
    
    // Fix task table after deleting user or board
    if (tableName !== 'tasks') this[`${tableName}Fix`](id);

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
