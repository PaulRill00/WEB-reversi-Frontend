Game.Data = (() => {

  let stateMap = {
    'environment': 'development'
  };

  let configMap = {
    mock: {
      'api/game/test': {
        "player1Token": "Paul",
        "player2Token": "Player2",
        "description":  "Test game",
        "token":        "test",
        "board":        "[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,2,0,0,0],[0,0,0,2,1,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]",
        "movingPlayer": "Paul",
        "moving":       1,
        "status":       "Running"}
    
    },
    apiKey: "3bedf08fa201acca2754e7fdbc6894f8",
  };

  const putMockData = (url, data) => {
    switch (url) {
      case 'api/game/test/move': {
        let game = configMap.mock['api/game/test'];
        let board = JSON.parse(game.board);

        if(board[data.row][data.col] === 0) {
          board[data.row][data.col] = data.player;
          
          game.board = JSON.stringify(board);
          configMap.mock['api/game/test'] = game;
          game.moving = game.moving === 1 ? 2 : 1;

          return new Promise((resolve, reject) => {
            resolve(game)
          });
        }

        else {
          return new Promise((resolve, reject) => {
            reject('Move not valid')
          });
        }

      }
    }
  }

  /**
   * Get mockdata
   */
  const getMockData = (url) => {
    const mockData = configMap.mock[url];

    return new Promise((resolve, reject) => {
      resolve(mockData)
    });
  }

  /**
   * Initialize the component
   * 
   * @param {string} env 
   */
  const privateInit = (env) => {
    stateMap.environment = env;
    if(stateMap.environment === undefined)
      throw new Error("No environment specified");
  }

  /**
   * Get data from a url
   * 
   * @param {string} url 
   */
  const get = (url) => {
    return (stateMap.environment === 'development') ? getMockData(url) : $.get(url);
  }

  /**
   * 
   */
  const put = (url, data) => {
    return (stateMap.environment === 'development') ? 
      putMockData(url, data) : 
      $.ajax({
        url: url,
        type: 'PUT',
        data: JSON.stringify(data),
      });
  }

  return {
    init: privateInit,
    get: get,
    put: put,
  }

})();

