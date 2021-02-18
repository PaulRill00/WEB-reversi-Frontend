Game.Model = (() => {

  /**
   * Get the gamestatus for a game
   * 
   * @param {string} gameToken 
   */
  const _getGameState = (gameToken) => {
    Game.Data.get('api/game/' + gameToken).then(res => {
      Game.Board.update(res)
    });
  }  

  return {
    getGameState: _getGameState,
  }

})();