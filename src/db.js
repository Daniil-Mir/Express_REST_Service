const uuid = require('uuid').v4;
const User = require('./resources/users/user.model');

const db = {
  users: [],
  tasks: [],
  boards: [],
  getById(id) {

    return this.users.find((user) => user.id === id);

  }
};

// init the db new 3 users for start
(function initDb() {

  for (let i = 0; i < 3; i += 1) {

    const newUser = new User();
    newUser.id = uuid();
    db.users.push(newUser);

  };

})();


module.exports = db;
