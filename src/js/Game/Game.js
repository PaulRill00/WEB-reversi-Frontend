const Game = ((url) => {
  
  let configMap = {
    apiUrl: url,
  };

  const privateInit = () => {
    
    setInterval(() => {
      _getCurrentGameState()
    }, 2000);
  }

  const _getCurrentGameState = () => {
    Game.Model.getGameState();
  }

  return {
    init: privateInit
  }

})('/api/url');

