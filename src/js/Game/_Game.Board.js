Game.Board = (() => {

  let configMap = {
    boardSize: 8,
  };

  let stateMap = {
    gameToken: undefined,
    game: {
      board: [],
      actions: [],
      moving: 1,
    }
  };

  /**
   * Render the board
   */
  const displayBoard = () => {
    _updateBoard();    
  }

  /**
   * Initialize the component
   */
  const _init = (boardParentId, gameToken) => {
    stateMap.$board = $(`#${boardParentId}`);
    stateMap.gameToken = gameToken;
    displayBoard();
  }

  /**
   * Place a chip, if this is possible
   * 
   * @param {int} row 
   * @param {int} col 
   */
  const _placeChip = async (row, col) => {
    let result = await Game.Data.put(`game/${stateMap.gameToken}/move`, {
      rowmove: parseInt(row),
      colmove: parseInt(col),
      player: Game.player(),
    }).then(res => res).catch(e => false).catch(err => {
      console.log(err);
      return false;
    });

    if(result) {
      _update(result);
      _updateBoard();

      // Trigger event when move is succesfull
      stateMap.$board.trigger('boardUpdate');
    }
  }

  /**
   * Update the board from the stateMap.board
   */
  const _updateBoard = () => {
    stateMap.$board.html(Game.Template.parseTemplate('game.game', {
      'game': stateMap.game,
      'size': configMap.boardSize,
      'isMoving': Game.player() === stateMap.game.movingPlayer,
      'isRunning': stateMap.game.status === 'Running',
      'isWinner': stateMap.game.winner == Game.player(),
    }));

    stateMap.$board.find('.cell').on('click', function() {

      // Only trigger if game is running
      if(stateMap.game.status === 'Running') {
        _placeChip($(this).attr('data-row'), $(this).attr('data-col'));
      }
    });
  }

  const _performAction = (action) => {
    Game.Data.put(`game/${stateMap.gameToken}/${action}`, {
      player: Game.player(),
    }).then(res => {
      _update(res);
      stateMap.$board.trigger('boardUpdate');
    }).catch((err) => { 
      console.log(error);
      return false
    });
  }

  const _update = (game) => {
    stateMap.game = game;
    stateMap.game.board = JSON.parse(game.board);
    stateMap.game.actions = JSON.parse(game.actions);
    _updateBoard();
  }

  return {  
    init: _init,
    update: _update,
    performAction: _performAction
  }
})();