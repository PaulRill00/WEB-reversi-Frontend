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
    apiKey: "3bedf08fa201acca2754e7fdbc6894f8",
  };

  const privateInit = () => {
    console.log(configMap.apiUrl);
  }

  const get = (url) => {
    url = url.replace('<apikey>', configMap.apiKey);
    return $.get(url)
      .then(r => r)
      .catch(e => console.log(e));
  };

  return {
    init: privateInit,
    get: get,
  }

})();

Game.Model = (() => {

  let configMap = {
  };

  const privateInit = () => {
    console.log(configMap.apiUrl);
  }

  const getWeather = () => 
    Game.Data.get('http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=<apikey>')
  

  return {
    init: privateInit,
    getWeather: getWeather,
  }

})();