class Task {

  constructor({
    title = 'Task',
    order = 0,
    description = 'Description',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

}

module.exports = Task;
