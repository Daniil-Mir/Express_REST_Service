const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {

  const boards = await boardsService.getAll();
  res.json(boards);

});

router.route('/').post(async (req, res) => {

  const board = await boardsService.post(req.body);
  res.json(board);

});

router.route('/:id').get(async (req, res) => {

  const board = await boardsService.getById(req.params.id);
  if (board !== -1) res.json(board);

});

router.route('/:id').put(async (req, res) => {

  const board = await boardsService.put(req.params.id, req.body);
  if (board !== -1) res.json(board);

});

router.route('/:id').delete(async (req, res) => {

  const index = await boardsService.remove(req.params.id);
  if (index !== -1) res.sendStatus(204);

});

module.exports = router;
