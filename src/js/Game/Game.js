const Game = ((url) => {
  
  let configMap = {
    apiUrl: url,
  };

  let stateMap = {

  }

  const privateInit = (gameToken) => {
    stateMap.currentGameToken = gameToken;

    Game.Board.init('board');
    Game.Model.getGameState('test');

    setInterval(() => _getCurrentGameState(), 2000);
  }

  const _getCurrentGameState = () => {
    Game.Model.getGameState(stateMap.currentGameToken);
  }

  return {
    init: privateInit
  }

})('/api/url');

