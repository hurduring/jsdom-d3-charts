var D3Funnel = require('d3-funnel');

function renderChart(window, data, config) {
  document = window.document;

  const containerWidth = config.width;
  const minHeight = config.minHeight;

  const chartData = [
    ['Nurture', data.status['nurture'], config.colors.nurture],
    ['Contact Made', data.status['contact-made'], config.colors.contactMade],
    ['Lead', data.status['lead'], config.colors.lead],
    ['Tour', data.status['post-tour'] + data.status['pre-tour'], config.colors.tour],
    ['Deposit', data.status['deposit-made'], config.colors.depositMade],
    ['Moved In', data.status['moved-in'], config.colors.movedIn]
  ];

  const options = {
    block: {
      dynamicHeight: true,
      minHeight: minHeight
    },
    chart: {
      curve: {
        enabled: true
      },
      height: containerWidth / 2,
      width: containerWidth / 2
    }
  };

  new D3Funnel('.funnel-chart__chart').draw(chartData, options);
}


module.exports = renderChart;