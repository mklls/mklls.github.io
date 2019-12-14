const labelPool = ['情商', '智商', '旺相休囚死', '体', '用', '呼吸', '步数', '脉搏', '木头', '石头', '青蛙'];

const getRandomInteger = max => Math.floor(Math.random() * max);
const getRandomFloat = max => Math.random() * max;
const getRandomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);
const getRandomLabel = () => labelPool[getRandomInteger(labelPool.length)];

function randomize(rawChart, max, dataType) {
  addDataset(rawChart, max, dataType, {fill:false});
  removeDataset(rawChart, 0);
}

function addRandomData (rawChart, max, dataType) {
  let chart = rawChart.data;
  chart.labels.push("random");
  chart.datasets.forEach(function(dataset) {
    let data = dataType === 'integer'
      ? getRandomInteger(max)
      : getRandomFloat(max);
      dataset.data.push(data);
  });
  rawChart.update();
}

function removeData(rawChart) {
  let chart = rawChart.data;
  chart.labels.pop();
  chart.datasets.forEach(dataset => dataset.data.pop());
  rawChart.update();
}

function modifyConfig(rawChart, options) {
  let chart = rawChart.data;
  
  chart.datasets.forEach(dataset => {
    for (op in options) {
      dataset[op] = options[op];
    }
  });
  rawChart.update();
}


function addDataset(rawChart, max, dataType, options) {
  let chart = rawChart.data;
  let dataLength = chart.datasets[0].data.length;
  let newDataset = {};
  newDataset.data = [];
  newDataset.backgroundColor = [];
  newDataset.label = getRandomLabel();
  newDataset.borderColor = getRandomColor();
  for (prop in options) {
    newDataset[prop] = options[prop];
  }
  for (let i = 0; i < dataLength; i++) {
    newDataset.data.push(
      dataType === 'integer'
        ? getRandomInteger(max)
        : getRandomFloat(max)
    );
    newDataset.backgroundColor.push(getRandomColor());
  }
  chart.datasets.push(newDataset);
  rawChart.update();
}

function removeDataset(rawChart, index) {
  let chart = rawChart.data;
  if (typeof index === "undefined") {
    chart.datasets.pop();
  } else {
    chart.datasets.splice(index, 1);
  }
  rawChart.update();
}

let namespace = {};
namespace.drawerHandler = document.querySelector('.drawer-handler');
namespace.container = document.querySelector('.container');
namespace.drawer = new Drawer(namespace.container, 
  "./assets/icon/banner.svg", "https://chartjs.org");


namespace.drawerHandler.addEventListener('click', function(e) {
  e.stopPropagation();
  namespace.drawer.show();
});

namespace.container.addEventListener('click', function(e) {
  e.stopPropagation();
  namespace.drawer.hide();
});

namespace.drawer.addItem('趋势图');
namespace.drawer.addItem('条形图');
namespace.drawer.addItem('圆饼图');
namespace.drawer.addItem('极区图');
namespace.drawer.addItem('泡泡图');
namespace.drawer.addItem('散点图');
namespace.drawer.addItem('雷达图');
namespace.drawer.addItem('混合区域');

let chart = {
  line: [],
  bar: [],
  radar: [],
  doughnutPie: [],
  polarArea: [],
  bubble: [],
  scatter: [],
  area: [],
  mixed: [],
};

(function() {
  let basicCtx = document.querySelector('.line .basic');
  let basic = new Chart(basicCtx, {
    type: 'line',
    data: {
      labels: ['周一', '周二', '周三', '周四', '周五', '周六','周日'],
      datasets: [{
        label: 'SAN 值',
        data: [12, 20, 70, -60, -30, 15, 8],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        lineTension: 0.5,
      }]
    }, 
    options: {
      spanGaps: true,
    }
  });
  chart.line.push(basic);

  let multiCtx = document.querySelector('.line .multi');
  let multi = new Chart(multiCtx, {
    type: 'line',
    data: {
      labels: ['初见', '寒暄', '聊天', '互动', '编不下去了'],
      datasets: [{
        label: '了解程度',
        data: [100, 50, 80, 40, 20, 0],
        fill: false,
        borderColor: '#673ab7',
      },{
        label: '编不下去了',
        data: [0, 60, 50, 30, 60, 80],
        fill: false,
        borderColor: '#2196f3',
      }]
    }
  });
  chart.line.push(multi);

  let stepCtx = document.querySelector('.line .step');
  let step = new Chart(stepCtx, {
    type: 'line',
    data: {
      labels: ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤'],
      datasets: [{
        label: '旺相休囚死',
        data: [-12, 8, 16, 0, 24, 36,-24, 14],
        steppedLine: 'middle',
        borderColor: getRandomColor(),
        fill: false
      }]
    }
  });
  chart.line.push(step);

  let displayCtx = document.querySelector('.line .display');
  let display = new Chart(displayCtx, {
    type: 'line',
    data: {
      labels: ['金', '水', '木', '火', '土'],
      datasets: [{
        label: '我是图例',
        fill: false,
        data: [1, 40, 20, 70, 90],
        borderColor: '#673ab7',
      }]
    }
  });
  chart.line.push(display);
  // 注入灵魂
  let addDataBtn = document.querySelector('.line .buttons .button.add.single');
  let addDatasetBtn = document.querySelector('.line .buttons .button.add.set');
  let removeDataBtn = document.querySelector('.line .buttons .button.remove.single');
  let removeDatasetBtn = document.querySelector('.line .buttons .button.remove.set');
  let randomBtn = document.querySelector('.line .buttons .button.random');

  addDataBtn.addEventListener('click', e => addRandomData(display, 100, 'integer'));
  removeDataBtn.addEventListener('click',e => removeData(display));
  addDatasetBtn.addEventListener('click', e => addDataset(display, 100, 'integer'));
  removeDatasetBtn.addEventListener('click', e => removeDataset(display));
  randomBtn.addEventListener('click', e => randomize(display, 100, 'integer'));


  let displayConfig = document.querySelector(".line .action");
  let displayAction = new Tile();
  displayConfig.appendChild(displayAction.self);
  displayAction.addItem('直线', {
    on: () => modifyConfig(display, {lineTension: 0}),
    off: () => modifyConfig(display, {lineTension: 0.4})
  });
  displayAction.addItem('虚线', {
    on: () => modifyConfig(display, {borderDash: [5, 15]}),
    off: () => modifyConfig(display, {borderDash: []})
  });
  displayAction.addItem('填充', {
    on: () => modifyConfig(display, {fill: true}),
    off: () => modifyConfig(display, {fill: false})
  });

})()