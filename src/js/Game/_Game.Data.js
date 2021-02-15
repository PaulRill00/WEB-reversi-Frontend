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

