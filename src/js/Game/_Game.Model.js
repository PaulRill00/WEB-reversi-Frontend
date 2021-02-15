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