let _ = require('lodash');
let d3 = require('d3');

function createLine(svg, lineValues, data, color) {
  svg.append("path")
    .data([data])
    .attr("style", `stroke: ${color}; stroke-width: 3px; fill: none;`)
    .attr("d", lineValues);
}

function addFirstWeek(data) {
  let firstWeekDate = new Date().setTime(new Date(data[data.length - 1].date).getTime() - (7 * 24 * 3600000));

  data.push({
    date: firstWeekDate,
    status: {
      'dq-location': 0,
      'dq-not-interested': 0,
      'dq-financial': 0,
      'contact-made': 0,
      'lead': 0,
      'pre-tour': 0,
      'post-tour': 0,
      'deposit-made': 0,
      'moved-in': 0
    }
  });
}

function processData(data) {
  let clonedChartData = _.cloneDeep(data);
  let processedData = {};

  addFirstWeek(clonedChartData);

  processedData.closedData = clonedChartData.map(item => ({
    date: new Date(item.date),
    value: item.status['dq-location'] + item.status['dq-financial'] + item.status['dq-not-interested']
  }));

  processedData.contactMadeData = clonedChartData.map(item => ({
    date: new Date(item.date),
    value: item.status['contact-made']
  }));

  processedData.lead = clonedChartData.map(item => ({
    date: new Date(item.date),
    value: item.status['lead']
  }));

  processedData.tourData = clonedChartData.map((item) => ({
    date: new Date(item.date),
    value: item.status['post-tour'] + item.status['pre-tour']
  }));

  processedData.depositData = clonedChartData.map((item) => ({
    date: new Date(item.date),
    value: item.status['deposit-made']
  }));

  processedData.movedInData = clonedChartData.map((item) => ({
    date: new Date(item.date),
    value: item.status['moved-in']
  }));

  return processedData;
}

function renderChart(window, data, config) {
  let d3Dom = d3.select(window.document);
  let containerWidth = config.width;
  let margin = config.margin;

  let width = containerWidth - margin.left - margin.right;
  let height = containerWidth / 2 - margin.top - margin.bottom;

  let processedData = processData(data);

  let x = d3.scaleTime().range([0, width]);
  let y = d3.scaleLinear().range([height, 0]);

  let lineValues = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

  let svg = d3Dom.select(".line-chart__chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let axisData = [
    ...processedData.movedInData,
    ...processedData.closedData,
    ...processedData.contactMadeData,
    ...processedData.lead,
    ...processedData.tourData,
    ...processedData.depositData
  ];

  x.domain(d3.extent(axisData, d => d.date));
  y.domain([0, d3.max(axisData, d => d.value)]);

  createLine(svg, lineValues, processedData.closedData, config.colors.closed);
  createLine(svg, lineValues, processedData.contactMadeData, config.colors.contactMade);
  createLine(svg, lineValues, processedData.lead, config.colors.lead);
  createLine(svg, lineValues, processedData.tourData, config.colors.tours);
  createLine(svg, lineValues, processedData.depositData, config.colors.deposits);
  createLine(svg, lineValues, processedData.movedInData, config.colors.movedIn);

  const xAxisLabelFormat = e => new Date(e).getMonth() + 1 + '.' + new Date(e).getDate();
  const yAxisLabelFormat = e => {
    if (e === 0) return;
    return e;
  };

  let xAxis = d3.axisBottom(x)
    .ticks(d3.timeFriday.every(1))
    .tickFormat(xAxisLabelFormat);

  let yAxis = d3.axisLeft(y)
    .ticks(d3.max(axisData, d => d.value))
    .tickFormat(yAxisLabelFormat);

  svg.append("g").attr("transform", "translate(0," + height + ")").call(xAxis);
  svg.append("g").call(yAxis);

  d3Dom.selectAll(".tick > text").style("font-size", 14);
}

module.exports = renderChart;