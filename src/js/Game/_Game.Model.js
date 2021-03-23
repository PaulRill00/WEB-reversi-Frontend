Game.Model = (() => {

  /**
   * Get the gamestatus for a game
   * 
   * @param {string} gameToken 
   */
  const _getGameState = (gameToken, retryLimit = 2, retryCount = 0) => {
    if (retryCount < retryLimit) {

      Game.Data.get('game/' + gameToken).then(res => {
        Game.Board.update(res)
      })
      .catch(_ => {
        _getGameState(gameToken, retryLimit, ++retryCount);
      });
    }
  }  

  return {
    getGameState: _getGameState,
  }

})();