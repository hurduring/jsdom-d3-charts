let {weeklyData, currentSnapshot} = require('./data');

let buildLineChart = require('./line-chart');
let buildPieChart = require('./pie-chart');
let buildPipeChart = require('./pipe-chart');


buildLineChart(weeklyData);
buildPieChart(currentSnapshot);
buildPipeChart(currentSnapshot);