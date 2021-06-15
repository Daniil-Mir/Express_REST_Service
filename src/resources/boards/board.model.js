class Board {
  constructor({
    title = 'Board',
    columns = []
  } = {}) {

    this.title = title;
    this.columns = columns;
    
  }
}

module.exports = Board;
