const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const d3 = require('d3');
const jsdom = require('jsdom');
const svg2png = require('svg2png');

const config = require('./config');
const colors = require('./constants');
const renderChart = require('./construction');
const {processData} = require('../utils');

const defaultConfig = {
  filename: 'pie-chart',
  directory: '../output/',
  width: config.width,
  colors
};

module.exports = function (data, config = defaultConfig) {
  const processedData = processData(_.cloneDeep(data));

  jsdom.env({
    html: '',
    features: {QuerySelector: true},
    done: function (errors, window) {
      renderChart(window, processedData, config);

      svg2png(d3.select(window.document).select('.container').html())
        .then(buffer => fs.writeFile(path.resolve(__dirname, `${config.directory}${config.filename}.png`), buffer))
        .catch(e => console.error(e));
    }
  });
};
