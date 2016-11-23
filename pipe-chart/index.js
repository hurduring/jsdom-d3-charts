const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const d3 = require('d3');
const jsdom = require('jsdom');
const svg2png = require("svg2png");

const config = require('./config');
const {colors} = require('./constants');
const {processData} = require('../utils');
const renderChart = require('./construction');

const defaultConfig = {
  filename: 'pipe-chart',
  directory: '../output/',
  width: config.width,
  minHeight: config.minHeight,
  colors
};

module.exports = function (data, config = defaultConfig) {
  const processedData = processData(_.cloneDeep(data));

  jsdom.env({
    html: "<div class='funnel-chart__chart'></div>",
    features: {QuerySelector: true},
    done: function (errors, window) {
      renderChart(window, processedData, config);

      svg2png(d3.select(window.document).select('.funnel-chart__chart').html())
        .then(buffer => fs.writeFile(path.resolve(__dirname, `${config.directory}${config.filename}.png`), buffer))
        .catch(e => console.error(e));
    }
  });
};
