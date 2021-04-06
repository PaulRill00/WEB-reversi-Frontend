const Game = (() => {
  
  let configMap = {
    boardId: 'board',
    chartId: 'chart',
    chartRefresh: 100,
  };

  let stateMap = {
  
  }

  const privateInit = (baseApiUrl, gameToken, playerToken) => {
    stateMap.currentGameToken = gameToken;
    stateMap.player = playerToken;

    Game.Data.init('production', baseApiUrl);
    Game.Board.init(configMap.boardId, gameToken);

    setTimeout(() => {
      Game.Model.getGameState(gameToken);
      Game.Stats.init(configMap.chartId)
    }, configMap.chartRefresh);
    
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

