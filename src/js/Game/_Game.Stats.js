Game.Stats = (() => {

  let configMap = {
    chart: {
      type: 'bar',
      data: {
          labels: ['Empty', 'White', 'Black',],
          datasets: [{
              label: '# of Fiches',
              data: [60,2,2],
              backgroundColor: [
                  'rgba(43, 196, 156,0.1)',
                  'rgba(255,255,255,0.5)',
                  'rgba(0,0,0,0.8)',
              ],
              borderColor: [
                  'rgba(43, 196, 156, 1)',
                  'rgba(255,255,255, 1)',
                  'rgba(0,0,0, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
      }
    }
  };

  let stateMap = {
    chart: undefined,
  };

  const _updateChart = (total, white, black) => {

    if (stateMap.chart === undefined)
      return;

    let none = total - (white + black);
    stateMap.chart.data.datasets[0].data = [none, white, black];
    stateMap.chart.update();
  }  

  const _init = (chartId) => {
    let ctx = document.getElementById(chartId).getContext('2d');
    stateMap.chart = new Chart(ctx, configMap.chart);
  };

  const _update = (board) => {
    let total = 0;
    let white = 0;
    let black = 0;

    board.forEach(row => {
      row.forEach(col => {
        total++;
        switch(col) {
          case 1: white++; break;
          case 2: black++; break;
        }
      })
    }); 

    setInterval(_updateChart(total, white, black), 50);
  }

  return {
    init: _init,
    update: _update,

  }

})();