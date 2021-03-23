const Game = (() => {
  
  let configMap = {
  };

  let stateMap = {
  
  }

  const privateInit = (baseApiUrl, gameToken, playerToken) => {
    stateMap.currentGameToken = gameToken;
    stateMap.player = playerToken;

    Game.Data.init('production', baseApiUrl);
    Game.Board.init('board', gameToken);
    Game.Model.getGameState(gameToken);
  }

  const _getCurrentGameState = () => {
    Game.Model.getGameState(stateMap.currentGameToken);
  }

  const _getPlayer = () => {
    return stateMap.player;
  }

  return {
    init: privateInit,
    update: _getCurrentGameState,
    player: _getPlayer,
  }

})();

