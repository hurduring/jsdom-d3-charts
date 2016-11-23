const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const d3 = require('d3');
const jsdom = require('jsdom');
const svg2png = require("svg2png");

const config = require('./config');
const colors = require('./constants');
const renderGraph = require('./construction');
const {processData} = require('../utils');

const defaultConfig = {
  filename: 'line-chart',
  directory: '../output/',
  width: config.width,
  margin: config.margin,
  colors
};

module.exports = function (data = [{}], config = defaultConfig) {
  let processedData = _.cloneDeep(data).map(processData);

  jsdom.env({
    html: "<div class='line-chart__chart'></div>",
    features: {
      QuerySelector: true
    },
    done: function (errors, window) {
      renderGraph(window, processedData, config);

      svg2png(d3.select(window.document).select('.line-chart__chart').html())
        .then(buffer => fs.writeFile(path.resolve(__dirname, `${config.directory}${config.filename}.png`), buffer))
        .catch(e => console.error(e));
    }
  });
};
