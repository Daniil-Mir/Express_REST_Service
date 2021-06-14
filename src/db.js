const uuid = require('uuid').v4;
const User = require('./resources/users/user.model');

const db = {
  users: [],
  tasks: [],
  boards: [],

  post(body) { 

    const newUser = new User(body);
    newUser.id = uuid();
    db.users.push(newUser);
    return newUser;

  },

  getById(id) { 
    
    const concreteUser = this.users.find((user) => user.id === id);
    return concreteUser;
  
  },

  put(id, body) {

    const concreteUser = this.users.find( (user) => user.id === id );
    if (concreteUser !== -1) {

      if (body.name) concreteUser.name = body.name;
      if (body.login) concreteUser.login = body.login;
      if (body.password) concreteUser.password = body.password;
      
    };
    
    return concreteUser;

  },

  remove(id) {

    const index = this.users.findIndex( (user) => user.id === id );
    
    if (index !== -1) this.users.splice(index, 1);

    return index;

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
