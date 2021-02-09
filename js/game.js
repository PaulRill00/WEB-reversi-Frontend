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

Game.Data = (() => {

  let stateMap = {
    'environment': 'development'
  };

  let configMap = {
    mock: [
      { 
        url: 'api/Spel/Beurt',
        data: 0
      }
    ],
    apiKey: "3bedf08fa201acca2754e7fdbc6894f8",
  };

  const getMockData = () => {
    const mockData = configMap.mock;

    return new Promise((resolve, reject) => {
      resolve(mockData)
    });
  }

  const privateInit = (env) => {
    stateMap.environment = env;
    if(stateMap.environment === undefined)
      throw new Error("No environment specified");
  }

  const get = (url) => {
    return (stateMap.environment === 'development') ? getMockData() : $.get(url);
  }

  return {
    init: privateInit,
    get: get,
  }

})();

Game.Model = (() => {

  const _getGameState = (gameToken) => {
    Game.Data.get('/api/Spel/Beurt/' + gameToken).then(res => {
      switch(res[0].data) {
        case 0:
          console.log('Geen specefieke waarde');
          break;
        case 1:
          console.log('Wit aan zet');
          break;
        case 2:
          console.log('Zwart aan zet');
          break;
        default:
          throw new Error('Unexpected game state');
      }
    });
  }  

  return {
    getGameState: _getGameState,
  }

})();