let d3 = require('d3');

function renderChart(window, data, config) {
  let d3Dom = d3.select(window.document);
  let chartData = [
    {label: 'hot', value: data.priority.hot},
    {label: 'warm', value: data.priority.warm},
    {label: 'cold', value: data.priority.cold}
  ];

  let pieChartContainerWidth = config.width;

  let width = pieChartContainerWidth / 2,
    height = pieChartContainerWidth / 2,
    radius = Math.min(width, height) / 2;

  const arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  const labelArc = d3.arc()
    .outerRadius(radius - 70)
    .innerRadius(radius - 70);

  const pie = d3.pie()
    .sort(null)
    .value(d => d.value);


  const svg = d3Dom.select('body')
    .append('div')
    .attr('class', 'container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  const g = svg.selectAll('.arc')
    .data(pie(chartData))
    .enter()
    .append('g')
    .attr('class', 'arc');

  g.append('path')
    .attr('d', arc)
    .style('fill', d => {
      if (d.data.label === 'cold') {
        return config.colors.cold;
      }
      if (d.data.label === 'warm') {
        return config.colors.warm;
      }
      if (d.data.label === 'hot') {
        return config.colors.hot;
      }
    });

  g.append('text')
    .attr('transform', d => `translate(${labelArc.centroid(d)})`)
    .text(d => d.data.value)
    .style('fill', d => 'white');

}


module.exports = renderChart;