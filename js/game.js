const Game = ((url) => {
  
  let configMap = {
    apiUrl: url,
  };

  const privateInit = () => {
    console.log(configMap.apiUrl);
  }

  return {
    init: privateInit
  }

})('/api/url');

Game.Data = (() => {

  let configMap = {
  };

  const privateInit = () => {
    console.log(configMap.apiUrl);
  }

  return {
    init: privateInit
  }

})();

Game.Model = (() => {

  let configMap = {
  };

  const privateInit = () => {
    console.log(configMap.apiUrl);
  }

  return {
    init: privateInit
  }

})();