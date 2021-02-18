Game.Board = (() => {

  let configMap = {
    boardSize: 8,
  };

  let stateMap = {
    moving: 1,
    board: []
  };

  /**
   * Render the board
   */
  const displayBoard = () => {
    $tempBoard = $(`<div class="board" style="
      grid-template-columns: repeat(${configMap.boardSize}, 4rem); 
      grid-template-rows:    repeat(${configMap.boardSize}, 4rem);
    "></div><h1 id="moving_player"></h1>`);

    for (let row = 0; row < configMap.boardSize; row++) {
      for (let col = 0; col < configMap.boardSize; col++) {
        $cell = $(`<div class="cell" data-row="${row}" data-col="${col}"><div class="chip" data-color=""></div>`);

        $cell.on('click', function () {
          _placeChip($(this).attr('data-row'), $(this).attr('data-col'));
        })

        $tempBoard.append($cell);
      }
    }

    stateMap.$board.append($tempBoard);
  }

  /**
   * Initialize the component
   */
  const _init = (boardParentId) => {
    stateMap.$board = $(`#${boardParentId}`);
    displayBoard();
  }

  /**
   * Place a chip, if this is possible
   * 
   * @param {int} row 
   * @param {int} col 
   */
  const _placeChip = async (row, col) => {
    let $field = _getField(row, col);

    // let hasMoved = true;
    // hasMoved = $field.find('.chip').attr('data-color') === '';

    let result = await Game.Data.put('api/game/test/move', {
      row: row,
      col: col,
      player: stateMap.moving,
    }).then(res => res).catch(e => false);

    if(result) {
      _update(result);
      _updateBoard();
    }
  }

  /**
   * Update the board from the stateMap.board
   */
  const _updateBoard = () => {
    for (let row = 0; row < configMap.boardSize; row++) {
      for (let col = 0; col < configMap.boardSize; col++) {
        let color = '';
        switch(stateMap.board[row][col]) {
          case 1: 
            color = 'white'
            break;
          case 2: 
            color = 'black'
            break;
        }

        if (color !== '') {
          _getField(row, col).find('.chip').attr('data-color', color);
        }
      }
    }

    stateMap.$board.find('#moving_player').text(stateMap.moving === 1 ? 'White' : 'Black')
  }

  const _update = (game) => {
    stateMap.board = JSON.parse(game.board);
    stateMap.moving = game.moving;
    _updateBoard();
  }

  /**
   * Get a field by it's row and col
   * 
   * @param {int} row 
   * @param {int} col 
   */
  const _getField = (row, col) => {
    if (row >= 0 && row < configMap.boardSize && 
        col >= 0 && col < configMap.boardSize) {
      
      return stateMap.$board.find(`[data-row=${row}][data-col=${col}]`);
    }
    return false;
  }

  return {
    init: _init,
    placeChip: _placeChip,
    update: _update,
  }
})();