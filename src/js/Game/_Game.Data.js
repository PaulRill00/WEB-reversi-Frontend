Game.Data = (() => {

  let stateMap = {
    'environment': 'development',
    'stateMap': undefined
  };

  let configMap = {
    mock: {
      'game/test': {
        "player1Token": "Paul",
        "player2Token": "Player2",
        "description":  "Test game",
        "token":        "test",
        "board":        "[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,2,0,0,0],[0,0,0,2,1,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]",
        "movingPlayer": "Paul",
        "moving":       1,
        "status":       "Running"}
    },
  };

  const putMockData = (url, data) => {
    switch (url) {
      case 'game/test/move': {
        let game = configMap.mock['game/test'];
        let board = JSON.parse(game.board);

        if(board[data.row][data.col] === 0) {
          board[data.row][data.col] = data.player;
          
          game.board = JSON.stringify(board);
          configMap.mock['game/test'] = game;
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
  const privateInit = (env, baseApiUrl) => {
    stateMap.environment = env;
    stateMap.baseApiUrl = baseApiUrl;
    if(stateMap.environment === undefined)
      throw new Error("No environment specified");
  }

  /**
   * Get data from a url
   * 
   * @param {string} url 
   */
  const get = (url) => {
    return (stateMap.environment === 'development') ? getMockData(url) : 
    $.ajax({
      type: 'GET',
      crossDomain: true,
      url: stateMap.baseApiUrl + url,
    });
  }

  /**
   * 
   */
  const put = (url, data) => {
    return (stateMap.environment === 'development') ? 
      putMockData(url, data) : 
      $.ajax({
        url: stateMap.baseApiUrl + url,
        type: 'PUT',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      });
  }

  return {
    init: privateInit,
    get: get,
    put: put,
  }

})();

