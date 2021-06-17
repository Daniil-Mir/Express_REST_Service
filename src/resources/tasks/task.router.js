const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

// /:boardId/tasks

router.route('/').get(async (req, res) => {

  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks);

});

router.route('/').post(async (req, res) => {

  const task = await tasksService.post(req.body, req.params.boardId);
  res.status(201).json(task);

});

router.route('/:taskId').get(async (req, res) => {

  const task = await tasksService.getById(req.params.boardId, req.params.taskId);
  if (task === undefined) res.status(404).send();
  if (task !== -1) res.json(task);

});

router.route('/:taskId').put(async (req, res) => {

  const task = await tasksService.put(req.body, req.params.boardId, req.params.taskId);
  if (task !== -1) res.json(task);

});

router.route('/:taskId').delete(async (req, res) => {

  const index = await tasksService.remove(req.params.taskId);
  if (index !== -1) res.status(204).send();

});

module.exports = router;
