const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {

  const users = await usersService.getAll();

  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));

});

router.route('/').post(async (req, res) => {

  const user = await usersService.post(req.body);

  // to exclude secret fields like "password"
  res.json(User.toResponse(user));

});

router.route('/:id').get(async (req, res) => {

  const user = await usersService.getById(req.params.id);

  // to exclude secret fields like "password"
  if (user !== -1) res.json(User.toResponse(user));

});

router.route('/:id').put(async (req, res) => {

  const user = await usersService.put(req.params.id, req.body);

  // to exclude secret fields like "password"
  if (user !== -1) res.json(User.toResponse(user));

});

router.route('/:id').delete(async (req, res) => {

  const index = await usersService.remove(req.params.id);
  if (index !== -1) res.sendStatus(204);

});

module.exports = router;
