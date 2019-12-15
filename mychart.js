const Tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const branch = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const colorPool = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(136, 159, 64, 0.6)',
  'rgba(255, 159, 64, 0.6)'
]

const getRandomInteger = (max, abs) => {
  let value = Math.floor(Math.random() * max);
  return typeof abs === "undefined" && abs === false 
    ? Math.random() > 0.5
      ? -value
      :  value
    : value
};
const getRandomFloat = max => parseFloat((Math.random() * max).toFixed(3));
const getRandomColor = () => colorPool[getRandomInteger(colorPool.length, false)];
const getRandomLabel = (labelpool) => labelpool[getRandomInteger(labelpool.length, false)];

function randomize(rawChart, max, dataType) {
  let chart = rawChart.data;
  chart.datasets.forEach( dataset => {
    for (let i = 0; i < dataset.data.length; i++) {
      dataset.data[i] = dataType === 'integer'
        ? getRandomInteger(max)
        : getRandomFloat(max)
    }
  });
  rawChart.update();
}

/**
 * @description 添加随机数据
 * @author mkll
 * @date 2019-12-15
 * @param rawChart 原视图表
 * @param max 最大值
 * @param dataType 数据类型 整形 浮点型
 * @param abs 是否生成正数
 * @param color 是否添加颜色
 */
function addRandomData (rawChart, max, dataType, abs, color) {
  let chart = rawChart.data;
  chart.labels.push(getRandomLabel(branch));
  chart.datasets.forEach(function(dataset) {
    let data = dataType === 'integer'
      ? getRandomInteger(max, abs)
      : getRandomFloat(max);
    dataset.data.push(data);
    if (typeof color === "undefined" || color === 'true') dataset.backgroundColor.push(getRandomColor());
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


/**
 * @description 添加数据集
 * @author mkll
 * @date 2019-12-15
 * @param rawChart 原视图表
 * @param max 生的的数据的最大值
 * @param dataType 数据类型 integer float
 * @param options 附加选项
 * @param single 是否单色
 */
function addDataset(rawChart, max, dataType, options, single) {
  let chart = rawChart.data;
  let dataLength = chart.datasets[0].data.length;
  let newDataset = {};
  newDataset.data = [];
  newDataset.backgroundColor = [];
  newDataset.label = getRandomLabel(Tiangan);
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
  if (typeof single !== "undefined") {
    newDataset.backgroundColor = getRandomColor();
  }
  chart.datasets.push(newDataset);
  rawChart.update();
}

/**
 * @description 移除数据集
 * @author mkll
 * @date 2019-12-15
 * @param rawChart 原视图表
 * @param index 貌似没有用到
 * @returns
 */
function removeDataset(rawChart, index) {
  let chart = rawChart.data;
  if (rawChart.data.datasets.length === 1) {
    alert("别删了，再删就出异常了");
    return;
  }
  if (typeof index === "undefined") {
    chart.datasets.pop();
  } else {
    chart.datasets.splice(index, 1);
  }
  rawChart.update();
}
let btnAnimationPool = ['bounce', 'rubberBand', 'shake', 'tada', 'hearBeat', 'swing'];
let containerAnimationPool = ["zoomIn", "slideInUp", "slideInDown", "rotateIn", "flip", "flipInY", "flipInX", "fadeIn"]

function animateCSS(element, animationName, callback) {
  element.classList.add('animated', animationName);

  function handleAnimationEnd() {
      element.classList.remove('animated', animationName);
      element.removeEventListener('animationend', handleAnimationEnd);

      if (typeof callback === 'function') callback();
  }

  element.addEventListener('animationend', handleAnimationEnd);
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
namespace.chartContainer = {};
namespace.chartContainer.line = document.querySelector('.chart.line');
namespace.chartContainer.bar = document.querySelector('.chart.bar');
namespace.chartContainer.pie = document.querySelector('.chart.pie');
namespace.chartContainer.radar = document.querySelector('.chart.radar');
namespace.chartContainer.scatter = document.querySelector('.chart.scatter');
namespace.chartContainer.polar = document.querySelector('.chart.polar');
namespace.chartContainer.mixed = document.querySelector('.chart.mixed');
namespace.intro = document.querySelector('.intro');
function display(element) {
  namespace.intro.style.display = 'none';
  namespace.chartContainer.line.style.display = 'none';
  namespace.chartContainer.bar.style.display = 'none';
  namespace.chartContainer.pie.style.display = 'none';
  namespace.chartContainer.radar.style.display = 'none';
  namespace.chartContainer.scatter.style.display = 'none';
  namespace.chartContainer.polar.style.display = 'none';
  namespace.chartContainer.mixed.style.display = 'none';
  namespace.chartContainer[element].style.display = 'block'
  animateCSS(namespace.chartContainer[element], 
    containerAnimationPool[getRandomInteger(containerAnimationPool.length, true)]);
}

namespace.drawer.addItem('折线图', () => display('line'));
namespace.drawer.addItem('柱状图', () => display('bar'));
namespace.drawer.addItem('饼图', () => display('pie'));
namespace.drawer.addItem('极区图', () => display('polar'));
namespace.drawer.addItem('散点图', () => display('scatter'));
namespace.drawer.addItem('雷达图', () => display('radar'));
namespace.drawer.addItem('混合', () => display('mixed'));


let button = document.querySelectorAll('.buttons .button');
button.forEach(btn => btn.addEventListener('click', e => 
  animateCSS(btn, btnAnimationPool[getRandomInteger(btnAnimationPool.length, true)])));

let chart = {
  line: [],
  bar: [],
  radar: [],
  doughnutPie: [],
  polarArea: [],
  bubble: [],
  scatter: [],
  mixed: [],
};
// 趋势图 使用闭包避免全局变量太多
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
        label: '八宫',
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

  addDataBtn.addEventListener('click', e => addRandomData(display, 100, 'integer', false, true));
  removeDataBtn.addEventListener('click',e => removeData(display));
  addDatasetBtn.addEventListener('click', e => addDataset(display, 100, 'integer', {}, true));
  removeDatasetBtn.addEventListener('click', e => removeDataset(display));
  randomBtn.addEventListener('click', e => randomize(display, 100, 'integer'));

  let displayConfig = document.querySelector(".line .action");
  let lineTension = document.createElement('div');
  lineTension.classList = "controller-label";
  lineTension.textContent = "张力"
  displayConfig.appendChild(lineTension);
  
  let tensionController = new Slider({
    Duration: 1,
    hasBall: false,
    alwayShowBall: false,
    hasIndicator: false,
  });
  displayConfig.appendChild(tensionController.getSlider().get(0));
  tensionController.setCurrent(0.4);
  tensionController.valueChanging = value => {
    if (Math.random() > 0.6 && Math.random() < 0.7) 
      modifyConfig(display, {lineTension: value});
  }
  tensionController.valueChanged = value => 
    modifyConfig(display, {lineTension: value});
    
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

})();

// 条形图
(function(){
  let basicCtx = document.querySelector('.bar .basic');
  let basic = new Chart(basicCtx, {
    type: 'bar',
    data: {
      labels: ['周一', '周二', '周三', '周四', '周五', '周六','周日'],
      datasets: [{
        label: '手机',
        data: [3, 2.25, 2, 1.31, 2.46, 2, 4.4],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }, {
        label: '电脑',
        data: [8, 7, 5, 8, 10, 6, 9],
        backgroundColor: [
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
  });
  chart.bar.push(basic);

  let horizonCtx = document.querySelector('.bar .horizon');
  let horizon = new Chart(horizonCtx, {
    type: 'horizontalBar',
    data:{
      labels: ['巧克力', '薯片', '甜甜圈', '奶油蛋糕', '冰淇淋', '布丁', '酸奶', '果冻'],
      datasets: [{
        label: '热量',
        data: [557, 388, 387, 344, 212, 126, 62, 45],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(136, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(136, 159, 64, 0.2)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
  });
  chart.bar.push(horizon);

  let biDirCtx = document.querySelector('.bar .bi-directional');
  let biDir = new Chart(biDirCtx, {
    type: 'horizontalBar',
    data:{
      labels: ['七月', '八月', '九月', '十月', '十一月', '十二月'],
      datasets: [{
        label: '开支',
        data: [-234, -188, -387, -304, -812, -926, -62, -45],
        backgroundColor: [
          'rgba(153, 102, 255, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      }, {
        label: '收入',
        data: [957, 388, 387, 344, 212, 126, 62, 45],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(54, 162, 235, 0.8)',
        ],
      }]
    },
    options: {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  });
  chart.bar.push(biDir);

  let stackedCtx = document.querySelector('.bar .stacked');
  let stacked = new Chart(stackedCtx, {
    type: 'bar',
    data:{
      labels: ['七月', '八月', '九月', '十月', '十一月', '十二月'],
      datasets: [{
        label: '小明-炒股',
        data: [-234, 246, -387, -304, -812, -926, -62, -45],
        backgroundColor: [
          'rgba(153, 102, 255, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        stack: 'jia'
      }, {
        label: '小明-投资',
        data: [957, 388, 387, 344, -640, 126, 62, 45],
        backgroundColor: [
          'rgba(14, 32, 235, 0.8)',
          'rgba(14, 32, 235, 0.8)',
          'rgba(14, 32, 235, 0.8)',
          'rgba(14, 32, 235, 0.8)',
          'rgba(14, 32, 235, 0.8)',
          'rgba(14, 32, 235, 0.8)',
        ],
        stack: 'jia'
      }, {
        label: '小红-炒股',
        data: [
          getRandomInteger(1000), getRandomInteger(1000), 
          getRandomInteger(1000), getRandomInteger(1000),
          getRandomInteger(1000), getRandomInteger(1000)
        ],
        backgroundColor: [
          'rgba(74, 162, 237, 0.8)',
          'rgba(74, 162, 237, 0.8)',
          'rgba(74, 162, 237, 0.8)',
          'rgba(74, 162, 237, 0.8)',
          'rgba(74, 162, 237, 0.8)',
          'rgba(74, 162, 237, 0.8)',
        ],
        stack: 'yi'
      }, {
        label: '小红-投资',
        data: [
          -getRandomInteger(1000), getRandomInteger(1000), 
          -getRandomInteger(1000), -getRandomInteger(1000),
          getRandomInteger(1000), getRandomInteger(1000)
        ],
        backgroundColor: [
          'rgba(238, 72, 153, 0.8)',
          'rgba(238, 72, 153, 0.8)',
          'rgba(238, 72, 153, 0.8)',
          'rgba(238, 72, 153, 0.8)',
          'rgba(238, 72, 153, 0.8)',
          'rgba(238, 72, 153, 0.8)',
        ],
        stack: 'yi'
      }, {
        label: '小黑-炒股',
        data: [
          -getRandomInteger(1000), getRandomInteger(1000), 
          -getRandomInteger(1000), -getRandomInteger(1000),
          getRandomInteger(1000), getRandomInteger(1000)
        ],
        backgroundColor: [
          'rgba(134, 72, 53, 0.8)',
          'rgba(134, 72, 53, 0.8)',
          'rgba(134, 72, 53, 0.8)',
          'rgba(134, 72, 53, 0.8)',
          'rgba(134, 72, 53, 0.8)',
          'rgba(134, 72, 53, 0.8)',
        ],
        stack: 'bing'
      }, {
        label: '小黑-投资',
        data: [
          getRandomInteger(1000), -getRandomInteger(1000), 
          -getRandomInteger(1000), getRandomInteger(1000),
          -getRandomInteger(1000), getRandomInteger(1000)
        ],
        backgroundColor: [
          'rgba(54, 182, 73, 0.8)',
          'rgba(54, 182, 73, 0.8)',
          'rgba(54, 182, 73, 0.8)',
          'rgba(54, 182, 73, 0.8)',
          'rgba(54, 182, 73, 0.8)',
          'rgba(54, 182, 73, 0.8)',
        ],
        stack: 'bing'
      }]
    },
    options: {
      scales: {
        xAxes: [{
            stacked: true
        }],
        yAxes: [{
            stacked: true
        }]
      }
    }
  });
  chart.bar.push(stacked);

  let displayCtx = document.querySelector('.bar .display');
  let display = new Chart(displayCtx, {
    type: 'bar',
    data: {
      labels: ['午', '未', '申', '酉', '戌', '亥'],
      datasets: [{
        label: getRandomLabel(Tiangan),
        data: [
          getRandomInteger(10), getRandomInteger(10), 
          getRandomInteger(10), getRandomInteger(10),
          getRandomInteger(10), getRandomInteger(10)
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }, 
    options : {

    }
  });
  chart.bar.push(display);

  let addDataBtn = document.querySelector('.bar .buttons .button.add.single');
  let addDatasetBtn = document.querySelector('.bar .buttons .button.add.set');
  let removeDataBtn = document.querySelector('.bar .buttons .button.remove.single');
  let removeDatasetBtn = document.querySelector('.bar .buttons .button.remove.set');
  let randomBtn = document.querySelector('.bar .buttons .button.random');

  addDataBtn.addEventListener('click', e => addRandomData(display, 10, 'integer'));
  removeDataBtn.addEventListener('click',e => removeData(display));
  addDatasetBtn.addEventListener('click', e => addDataset(display, 10, 'integer'));
  removeDatasetBtn.addEventListener('click', e => removeDataset(display));
  randomBtn.addEventListener('click', e => randomize(display, 10, 'integer'));
})();

//饼和甜甜圈

(function() {
  
  let basicCtx = document.querySelector('.pie .basic');
  let basic = new Chart(basicCtx, {
    type: 'pie',
    data: {
      labels: ['Google', 'Github', 'Google 翻译', 'Startpage', 'MDN'],
      datasets: [{
        label: 'PV',
        data: [1387, 1163, 1040, 867, 669],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      }]
    },
    options: {
      cutoutPercentage: 0
    }
  });
  chart.doughnutPie.push(basic);

  let doughnutCtx = document.querySelector('.pie .doughnut');
  let doughnut = new Chart(doughnutCtx, {
    type: 'doughnut',
    data: {
      labels: ['淀粉', '碳水化合物', '蛋白质', '脂肪', '能量'],
      datasets: [{
        label: 'PV',
        data: [4, 2.8, 1.3, 1.2, 0.7],
        backgroundColor: function(ctx) {
          var value = ctx.dataset.data[ctx.dataIndex];
          var alpha = (value + 3) / 10;
          return Color('blue').alpha(alpha).rgbString();
        }
      }]
    },
    options: {
    }
  });
  chart.doughnutPie.push(doughnut);
  
  let displayCtx = document.querySelector('.pie .display');
  let display = new Chart(displayCtx, {
    type: 'pie',
    data: {
      labels: [
        getRandomLabel(Tiangan),
        getRandomLabel(Tiangan),
        getRandomLabel(Tiangan),
        getRandomLabel(Tiangan),
        getRandomLabel(Tiangan)
      ],
      datasets: [{
        label: 'PV',
        data: [4, 3, 2, 1, 8],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      }]
    },
    options: {
      cutoutPercentage: 80
    }
  });
  chart.doughnutPie.push(display);

  let cut = new Slider({
    Duration: 100,
    hasBall: false,
    alwayShowBall: false,
    hasIndicator: false
  });
  
  let action = document.querySelector('.pie .action');
  action.appendChild(cut.getSlider().get(0));
  cut.setCurrent(0.8);
  cut.valueChanging = value => {
    if (Math.random() > 0.6 && Math.random() < 0.7) {
      display.options.cutoutPercentage = value * 100;
      display.update();
    }
  }
  cut.valueChanged = value => {
    display.options.cutoutPercentage = value * 100;
    display.update();
  }
  let addDataBtn = document.querySelector('.pie .buttons .button.add.single');
  let addDatasetBtn = document.querySelector('.pie .buttons .button.add.set');
  let removeDataBtn = document.querySelector('.pie .buttons .button.remove.single');
  let removeDatasetBtn = document.querySelector('.pie .buttons .button.remove.set');
  let randomBtn = document.querySelector('.pie .buttons .button.random');

  addDataBtn.addEventListener('click', e => addRandomData(display, 10, 'integer', false));
  removeDataBtn.addEventListener('click',e => removeData(display));
  addDatasetBtn.addEventListener('click', e => addDataset(display, 10, 'integer'));
  removeDatasetBtn.addEventListener('click', e => removeDataset(display));
  randomBtn.addEventListener('click', e => randomize(display, 10, 'integer'));
})();

// 极区

(function(){
  let displayCtx = document.querySelector('.polar .display');
  let display = new Chart(displayCtx, {
    type: 'polarArea',
    data: {
      labels: [
        getRandomLabel(Tiangan), getRandomLabel(Tiangan), 
        getRandomLabel(Tiangan), getRandomLabel(Tiangan), getRandomLabel(Tiangan)
      ],
      datasets: [{
        label: getRandomLabel(branch),
        data: [
          getRandomFloat(10, true), getRandomFloat(10, true), 
          getRandomFloat(10, true), getRandomFloat(10, true),getRandomFloat(10, true)
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      }]
    },
    options: {

    }
  })
  chart.doughnutPie.push(display);
  let addDataBtn = document.querySelector('.polar .buttons .button.add.single');
  let addDatasetBtn = document.querySelector('.polar .buttons .button.add.set');
  let removeDataBtn = document.querySelector('.polar .buttons .button.remove.single');
  let removeDatasetBtn = document.querySelector('.polar .buttons .button.remove.set');
  let randomBtn = document.querySelector('.polar .buttons .button.random');

  addDataBtn.addEventListener('click', e => addRandomData(display, 10, 'float', false));
  removeDataBtn.addEventListener('click',e => removeData(display));
  addDatasetBtn.addEventListener('click', e => addDataset(display, 10, 'float'));
  removeDatasetBtn.addEventListener('click', e => removeDataset(display));
  randomBtn.addEventListener('click', e => randomize(display, 10, 'float'));
})();
//散点图
(function() {

  let basicCtx = document.querySelector('.scatter .basic');
  let dataArray = [{x:178.0,y:89.6},{x:180.3,y:82.8},{x:180.3,y:76.4},{x:164.5,y:63.2},{x:173.0,y:60.9},{x:183.5,y:74.8},{x:175.5,y:70.0},{x:188.0,y:72.4},{x:189.2,y:84.1},{x:172.8,y:69.1},{x:170.0,y:59.5},{x:182.0,y:67.2},{x:170.0,y:61.3},{x:177.8,y:68.6},{x:184.2,y:80.1},{x:186.7,y:87.8},{x:171.4,y:84.7},{x:172.7,y:73.4},{x:175.3,y:72.1},{x:180.3,y:82.6},{x:182.9,y:88.7},{x:188.0,y:84.1},{x:177.2,y:94.1},{x:172.1,y:74.9},{x:167.0,y:59.1},{x:169.5,y:75.6},{x:174.0,y:86.2},{x:172.7,y:75.3},{x:182.2,y:87.1},{x:164.1,y:55.2},{x:163.0,y:57.0},{x:171.5,y:61.4},{x:184.2,y:76.8},{x:174.0,y:86.8},{x:174.0,y:72.2},{x:177.0,y:71.6},{x:186.0,y:84.8},{x:167.0,y:68.2},{x:171.8,y:66.1},{x:182.0,y:72.0},{x:167.0,y:64.6},{x:177.8,y:74.8},{x:164.5,y:70.0},{x:192.0,y:101.3},{x:175.5,y:63.2},{x:171.2,y:79.1},{x:181.6,y:78.9},{x:167.4,y:67.7},{x:181.1,y:66.0},{x:177.0,y:68.2},{x:174.5,y:63.9},{x:177.5,y:72.0},{x:170.5,y:56.8},{x:182.4,y:74.5},{x:197.1,y:90.9},{x:180.1,y:93.0},{x:175.5,y:80.9},{x:180.6,y:72.7},{x:184.4,y:68.0},{x:175.5,y:70.9},{x:180.6,y:72.5},{x:177.0,y:72.5},{x:177.1,y:83.4},{x:181.6,y:75.5},{x:176.5,y:73.0},{x:175.0,y:70.2},{x:174.0,y:73.4},{x:165.1,y:70.5},{x:177.0,y:68.9},{x:192.0,y:102.3},{x:176.5,y:68.4},{x:169.4,y:65.9},{x:182.1,y:75.7},{x:179.8,y:84.5},{x:175.3,y:87.7},{x:184.9,y:86.4},{x:177.3,y:73.2},{x:167.4,y:53.9},{x:178.1,y:72.0},{x:168.9,y:55.5},{x:157.2,y:58.4},{x:180.3,y:83.2},{x:170.2,y:72.7},{x:177.8,y:64.1},{x:172.7,y:72.3},{x:165.1,y:65.0},{x:186.7,y:86.4},{x:165.1,y:65.0},{x:174.0,y:88.6},{x:175.3,y:84.1},{x:185.4,y:66.8},{x:177.8,y:75.5},{x:180.3,y:93.2},{x:180.3,y:82.7},{x:177.8,y:58.0},{x:177.8,y:79.5},{x:177.8,y:78.6},{x:177.8,y:71.8},{x:177.8,y:116.8},{x:163.8,y:72.2},{x:188.0,y:83.6},{x:198.1,y:85.5},{x:175.3,y:90.9},{x:166.4,y:85.9},{x:190.5,y:89.1},{x:166.4,y:75.0},{x:177.8,y:77.7},{x:179.7,y:86.4},{x:172.7,y:90.9},{x:190.5,y:73.6},{x:185.4,y:76.4},{x:168.9,y:69.1},{x:167.6,y:84.5},{x:175.3,y:64.5},{x:170.2,y:69.1},{x:190.5,y:108.5},{x:177.8,y:86.4},{x:190.5,y:80.9},{x:177.8,y:87.7},{x:184.2,y:94.5},{x:176.5,y:80.2},{x:177.8,y:72.0},{x:180.3,y:71.4},{x:171.4,y:72.7},{x:172.7,y:84.1},{x:172.7,y:76.8},{x:177.8,y:63.6},{x:177.8,y:80.9},{x:182.9,y:80.9},{x:170.2,y:85.5},{x:167.6,y:68.6},{x:175.3,y:67.7},{x:165.1,y:66.4},{x:185.4,y:102.9},{x:181.6,y:70.5},{x:172.7,y:95.9},{x:190.5,y:84.1},{x:179.1,y:87.3},{x:175.3,y:71.8},{x:170.2,y:65.9},{x:193.0,y:95.9},{x:171.4,y:91.4},{x:177.8,y:81.8},{x:177.8,y:96.8},{x:167.6,y:69.1},{x:167.6,y:82.7},{x:180.3,y:75.5},{x:182.9,y:79.5},{x:176.5,y:73.6},{x:186.7,y:91.8},{x:188.0,y:84.1},{x:188.0,y:85.9},{x:177.8,y:81.8},{x:174.0,y:82.5},{x:177.8,y:80.5},{x:171.4,y:70.0},{x:185.4,y:81.8},{x:185.4,y:84.1},{x:188.0,y:90.5},{x:188.0,y:91.4},{x:182.9,y:89.1},{x:176.5,y:85.0},{x:175.3,y:69.1},{x:175.3,y:73.6},{x:188.0,y:80.5},{x:188.0,y:82.7},{x:175.3,y:86.4},{x:170.5,y:67.7},{x:179.1,y:92.7},{x:177.8,y:93.6},{x:175.3,y:70.9},{x:182.9,y:75.0},{x:170.8,y:93.2},{x:188.0,y:93.2},{x:180.3,y:77.7},{x:177.8,y:61.4},{x:185.4,y:94.1},{x:168.9,y:75.0},{x:185.4,y:83.6},{x:180.3,y:85.5},{x:174.0,y:73.9},{x:167.6,y:66.8},{x:182.9,y:87.3},{x:160.0,y:72.3},{x:180.3,y:88.6},{x:167.6,y:75.5},{x:186.7,y:101.8},{x:175.3,y:91.1},{x:175.3,y:67.3},{x:175.9,y:77.7},{x:175.3,y:81.8},{x:179.1,y:75.5},{x:181.6,y:84.5},{x:177.8,y:76.6},{x:182.9,y:85.0},{x:177.8,y:102.7},{x:184.2,y:77.3},{x:179.1,y:71.8},{x:176.5,y:87.9},{x:188.0,y:94.3},{x:174.0,y:70.9},{x:167.6,y:64.5},{x:170.2,y:77.3},{x:167.6,y:72.3},{x:188.0,y:87.3},{x:174.0,y:80.0},{x:176.5,y:82.3},{x:180.3,y:73.6},{x:167.6,y:74.1},{x:188.0,y:85.9},{x:180.3,y:73.2},{x:167.6,y:76.3},{x:183.0,y:65.9},{x:183.0,y:90.9},{x:179.1,y:89.1},{x:170.2,y:62.3},{x:177.8,y:82.7},{x:179.1,y:79.1},{x:190.5,y:98.2},{x:177.8,y:84.1},{x:180.3,y:83.2},{x:180.3,y:83.2}];
  let basic = new Chart(basicCtx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: '身高体重',
        data: dataArray,
        backgroundColor: getRandomColor(),
        pointRadius: 6,
        pointHoverRadius: 10
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom'
        }]
      }
    }
  });
  chart.scatter.push(basic);

  let bubbleCtx = document.querySelector('.scatter .bubble');
  let bubbleData = {data:[], color:[]};
  let max = 100;
  let radius = 25;
  for (let i = 0; i < 50; i++) {
    bubbleData.data.push({
      x: Math.random() > 0.5 ? -getRandomFloat(100) : getRandomFloat(100),
      y: Math.random() > 0.5 ? -getRandomFloat(100) : getRandomFloat(100),
      r: getRandomFloat(radius),
    })
    bubbleData.color.push(getRandomColor());
  }
  let bubble = new Chart(bubbleCtx, {
    type: 'bubble',
    data: {
      datasets: [{
        data: bubbleData.data,
        backgroundColor: bubbleData.color,
        label: getRandomLabel(branch)
      }],
    },
  });
  chart.scatter.push(bubble);

  let displayCtx = document.querySelector('.scatter .display');
  let display = new Chart(displayCtx, {
    type: 'bubble',
    data: {
      datasets: [{
        data: bubbleData.data,
        backgroundColor: bubbleData.color,
        label: getRandomLabel(branch)
      }],
    },
  });



  const randomize = () => {
    let chart = display.data;
    chart.datasets.forEach( dataset => {
      for (let i = 0; i < dataset.data.length; i++) {
        dataset.data[i] = {
          x: Math.random() > 0.5 ? -getRandomFloat(100) : getRandomFloat(100),
          y: Math.random() > 0.5 ? -getRandomFloat(100) : getRandomFloat(100),
          r: getRandomFloat(radius),
        }
      }
    });
    display.update();
  }

  const addRandomData = () => {
    let chart = display.data;
    chart.labels.push(getRandomLabel(branch));
    chart.datasets.forEach(function(dataset) {
      dataset.data.push({
        x: Math.random() > 0.5 ? -getRandomFloat(max) : getRandomFloat(max),
        y: Math.random() > 0.5 ? -getRandomFloat(max) : getRandomFloat(max),
        r: getRandomFloat(radius),
      });
      dataset.backgroundColor.push(getRandomColor());
    });
    display.update();
  }

  const addDataset = () => {
    let chart = display.data;
    let dataLength = chart.datasets[0].data.length;
    let newDataset = {};
    newDataset.data = [];
    newDataset.backgroundColor = [];
    newDataset.label = getRandomLabel(Tiangan);
    newDataset.borderColor = getRandomColor();

    for (let i = 0; i < dataLength; i++) {
      newDataset.data.push({
          x: Math.random() > 0.5 ? -getRandomFloat(max) : getRandomFloat(max),
          y: Math.random() > 0.5 ? -getRandomFloat(max) : getRandomFloat(max),
          r: getRandomFloat(radius),
      });
      newDataset.backgroundColor.push(getRandomColor());
    }
    chart.datasets.push(newDataset);
    display.update();
  }
  let addDataBtn = document.querySelector('.scatter .buttons .button.add.single');
  let addDatasetBtn = document.querySelector('.scatter .buttons .button.add.set');
  let removeDataBtn = document.querySelector('.scatter .buttons .button.remove.single');
  let removeDatasetBtn = document.querySelector('.scatter .buttons .button.remove.set');
  let randomBtn = document.querySelector('.scatter .buttons .button.random');

  addDataBtn.addEventListener('click', e => addRandomData());
  removeDataBtn.addEventListener('click',e => removeData(display));
  addDatasetBtn.addEventListener('click', e => addDataset());
  removeDatasetBtn.addEventListener('click', e => removeDataset(display));
  randomBtn.addEventListener('click', e => randomize());
})();

// 雷达图
(function(){
  let basicCtx = document.querySelector('.radar .basic');
  let basic = new Chart(basicCtx, {
    type: 'radar',
    data: {
      labels: ['品牌', '功能', '体积', '可用性', '内容'],
      datasets: [{
        label: '某即时通讯应用',
        data: [
          getRandomFloat(5), getRandomFloat(5), 
          getRandomFloat(5),getRandomFloat(5), getRandomFloat(5)
        ],
        backgroundColor: getRandomColor()
      }]
    },
  });

  chart.radar.push(basic);

  let compareCtx = document.querySelector('.radar .compare');
  let compare = new Chart(compareCtx, {
    type: 'radar',
    data: {
      labels :['外观', '屏幕', '性能', '价格', '拍照'],
      datasets: [{
        label: '某水果手机', 
        data: [
          getRandomFloat(5), getRandomFloat(5), 
          getRandomFloat(5),getRandomFloat(5), getRandomFloat(5)
        ],
        borderColor: colorPool[0]
      }, {
        label: '某主食手机', 
        data: [
          getRandomFloat(5), getRandomFloat(5), 
          getRandomFloat(5),getRandomFloat(5), getRandomFloat(5)
        ],
        borderColor: colorPool[1]
      }],
    },
  });
  chart.radar.push(compare);

  let displayCtx = document.querySelector('.radar .display');
  let display = new Chart(displayCtx, {
    type: 'radar',
    data: {
      labels: [
        getRandomLabel(Tiangan),getRandomLabel(Tiangan),
        getRandomLabel(Tiangan),getRandomLabel(Tiangan),
        getRandomLabel(Tiangan),
      ],
      datasets: [{
        label: getRandomLabel(branch),
        data: [
          getRandomFloat(5), getRandomFloat(5),
          getRandomFloat(5), getRandomFloat(5),
          getRandomFloat(5)
        ],
        borderColor: getRandomColor(),
        backgroundColor: getRandomColor()
      }]
    }
  });
  chart.radar.push(display);
  // 注入灵魂
  let addDataBtn = document.querySelector('.radar .buttons .button.add.single');
  let addDatasetBtn = document.querySelector('.radar .buttons .button.add.set');
  let removeDataBtn = document.querySelector('.radar .buttons .button.remove.single');
  let removeDatasetBtn = document.querySelector('.radar .buttons .button.remove.set');
  let randomBtn = document.querySelector('.radar .buttons .button.random');

  addDataBtn.addEventListener('click', e => addRandomData(display, 5, 'float', true, true));
  removeDataBtn.addEventListener('click',e => removeData(display));
  addDatasetBtn.addEventListener('click', e => addDataset(display, 5, 'float', {}, true));
  removeDatasetBtn.addEventListener('click', e => removeDataset(display));
  randomBtn.addEventListener('click', e => randomize(display, 5, 'float'));

  let displayConfig = document.querySelector(".radar .action");
  let displayAction = new Tile();
  displayConfig.appendChild(displayAction.self);
  displayAction.addItem('直线', {
    on: () => modifyConfig(display, {lineTension: 0}),
    off: () => modifyConfig(display, {lineTension: 0.4})
  }, true);
  displayAction.addItem('虚线', {
    on: () => modifyConfig(display, {borderDash: [5, 15]}),
    off: () => modifyConfig(display, {borderDash: []})
  }, false);
  displayAction.addItem('填充', {
    on: () => modifyConfig(display, {fill: true}),
    off: () => modifyConfig(display, {fill: false})
  }, true);
})();

//混合类型 
(function() {
  let chartCtx_1 = document.querySelector('.mixed .chart-1');
  let chart1 = new Chart(chartCtx_1, {
    type: 'bar',
    data: {
      labels: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      datasets: [{
        label: '项目捐赠',
        data: [497, 340, 519, 132, 505, 406, 201, 385, 370, 633, 47, 480],
        backgroundColor: [
          colorPool[3], colorPool[3], colorPool[3], colorPool[3],
          colorPool[3], colorPool[3], colorPool[3], colorPool[3],
          colorPool[3], colorPool[3], colorPool[3], colorPool[3], 
        ],
        order: 2,
      }, {
        label: '讲座',
        data: [2497, 3340, 2519, 1132, 505, 1406, 4201, 2385, 1370, 3633, 547, 4480],
        backgroundColor: [
          colorPool[5], colorPool[5], colorPool[5], colorPool[5],
          colorPool[5], colorPool[5], colorPool[5], colorPool[5],
          colorPool[5], colorPool[5], colorPool[5], colorPool[5], 
        ],
        order: 4,
      }, {
        label: '奖金',
        data: [1497, 2340, 6519, 3132, 705, 3406, 201, 2385, 370, 633, 547, 1480],
        backgroundColor: [
          colorPool[0], colorPool[0], colorPool[0], colorPool[0],
          colorPool[0], colorPool[0], colorPool[0], colorPool[0],
          colorPool[0], colorPool[0], colorPool[0], colorPool[0], 
        ],
        order: 2,
      }, {
        label: '开销',
        data: [-5497, -8340, -8519, -4132, -805, -36, -9101, -1385, -870, -1233, -7347, -4480],
        backgroundColor: [
          "#FF1493", "#FF1493", "#FF1493", "#FF1493",
          "#FF1493", "#FF1493", "#FF1493", "#FF1493",
          "#FF1493", "#FF1493", "#FF1493", "#FF1493", 
        ],
        order: 3,
      }, {
        label: '可用部分',
        data: [-1006, -2320, 1038, 264, 910, 5182, -4498, 3770, 1240, 3666, -6206, 1960],
        type: 'line',
        backgroundColor: "#00FF7F",
        borderColor: "#00FF7F",
        lineTension: 0,
        order: 1,
        fill: false
      }, {
        label: '平均开销',
        data: [-4312.08, -4312.08, -4312.08, -4312.08, -4312.08, -4312.08, -4312.08, -4312.08, -4312.08, -4312.08, -4312.08, -4312.08],
        type: 'line',
        backgroundColor: "#DC143C",
        borderColor: "#DC143C",
        lineTension: 0,
        order: 1,
        fill: false,
        borderDash: [5, 15]
      }, {
        label: '平均收入',
        data: [4645.42, 4645.42, 4645.42, 4645.42, 4645.42, 4645.42, 4645.42, 4645.42, 4645.42, 4645.42, 4645.42, 4645.42],
        type: 'line',
        backgroundColor: "#4169E1",
        borderColor: "#4169E1",
        lineTension: 0,
        order: 1,
        fill: false,
        borderDash: [5, 15]
      }]
    },
    options: {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: false
        }]
      }
    }
  });
  let fill = new Tile();
  fill.addItem('填充', {
    on: () => modifyConfig(chart1, {fill: true}),
    off: () => modifyConfig(chart1, {fill: false}),
  });
  let chart1Config = document.querySelector('.mixed .action-1');
  chart1Config.appendChild(fill.self);
  chart.mixed.push(chart1);
  let dataArray2 = [{x: 165.1, y:66.725}, {x:170.2, y:70.11}, {x:175, y:75.48}, {x:180, y:80.61}, {x:185, y:84.24}];
  let chart2Ctx = document.querySelector('.mixed .chart-2');
  let dataArray = [{x:178.0,y:89.6},{x:180.3,y:82.8},{x:180.3,y:76.4},{x:164.5,y:63.2},{x:173.0,y:60.9},{x:183.5,y:74.8},{x:175.5,y:70.0},{x:188.0,y:72.4},{x:189.2,y:84.1},{x:172.8,y:69.1},{x:170.0,y:59.5},{x:182.0,y:67.2},{x:170.0,y:61.3},{x:177.8,y:68.6},{x:184.2,y:80.1},{x:186.7,y:87.8},{x:171.4,y:84.7},{x:172.7,y:73.4},{x:175.3,y:72.1},{x:180.3,y:82.6},{x:182.9,y:88.7},{x:188.0,y:84.1},{x:177.2,y:94.1},{x:172.1,y:74.9},{x:167.0,y:59.1},{x:169.5,y:75.6},{x:174.0,y:86.2},{x:172.7,y:75.3},{x:182.2,y:87.1},{x:164.1,y:55.2},{x:163.0,y:57.0},{x:171.5,y:61.4},{x:184.2,y:76.8},{x:174.0,y:86.8},{x:174.0,y:72.2},{x:177.0,y:71.6},{x:186.0,y:84.8},{x:167.0,y:68.2},{x:171.8,y:66.1},{x:182.0,y:72.0},{x:167.0,y:64.6},{x:177.8,y:74.8},{x:164.5,y:70.0},{x:192.0,y:101.3},{x:175.5,y:63.2},{x:171.2,y:79.1},{x:181.6,y:78.9},{x:167.4,y:67.7},{x:181.1,y:66.0},{x:177.0,y:68.2},{x:174.5,y:63.9},{x:177.5,y:72.0},{x:170.5,y:56.8},{x:182.4,y:74.5},{x:197.1,y:90.9},{x:180.1,y:93.0},{x:175.5,y:80.9},{x:180.6,y:72.7},{x:184.4,y:68.0},{x:175.5,y:70.9},{x:180.6,y:72.5},{x:177.0,y:72.5},{x:177.1,y:83.4},{x:181.6,y:75.5},{x:176.5,y:73.0},{x:175.0,y:70.2},{x:174.0,y:73.4},{x:165.1,y:70.5},{x:177.0,y:68.9},{x:192.0,y:102.3},{x:176.5,y:68.4},{x:169.4,y:65.9},{x:182.1,y:75.7},{x:179.8,y:84.5},{x:175.3,y:87.7},{x:184.9,y:86.4},{x:177.3,y:73.2},{x:167.4,y:53.9},{x:178.1,y:72.0},{x:168.9,y:55.5},{x:157.2,y:58.4},{x:180.3,y:83.2},{x:170.2,y:72.7},{x:177.8,y:64.1},{x:172.7,y:72.3},{x:165.1,y:65.0},{x:186.7,y:86.4},{x:165.1,y:65.0},{x:174.0,y:88.6},{x:175.3,y:84.1},{x:185.4,y:66.8},{x:177.8,y:75.5},{x:180.3,y:93.2},{x:180.3,y:82.7},{x:177.8,y:58.0},{x:177.8,y:79.5},{x:177.8,y:78.6},{x:177.8,y:71.8},{x:177.8,y:116.8},{x:163.8,y:72.2},{x:188.0,y:83.6},{x:198.1,y:85.5},{x:175.3,y:90.9},{x:166.4,y:85.9},{x:190.5,y:89.1},{x:166.4,y:75.0},{x:177.8,y:77.7},{x:179.7,y:86.4},{x:172.7,y:90.9},{x:190.5,y:73.6},{x:185.4,y:76.4},{x:168.9,y:69.1},{x:167.6,y:84.5},{x:175.3,y:64.5},{x:170.2,y:69.1},{x:190.5,y:108.5},{x:177.8,y:86.4},{x:190.5,y:80.9},{x:177.8,y:87.7},{x:184.2,y:94.5},{x:176.5,y:80.2},{x:177.8,y:72.0},{x:180.3,y:71.4},{x:171.4,y:72.7},{x:172.7,y:84.1},{x:172.7,y:76.8},{x:177.8,y:63.6},{x:177.8,y:80.9},{x:182.9,y:80.9},{x:170.2,y:85.5},{x:167.6,y:68.6},{x:175.3,y:67.7},{x:165.1,y:66.4},{x:185.4,y:102.9},{x:181.6,y:70.5},{x:172.7,y:95.9},{x:190.5,y:84.1},{x:179.1,y:87.3},{x:175.3,y:71.8},{x:170.2,y:65.9},{x:193.0,y:95.9},{x:171.4,y:91.4},{x:177.8,y:81.8},{x:177.8,y:96.8},{x:167.6,y:69.1},{x:167.6,y:82.7},{x:180.3,y:75.5},{x:182.9,y:79.5},{x:176.5,y:73.6},{x:186.7,y:91.8},{x:188.0,y:84.1},{x:188.0,y:85.9},{x:177.8,y:81.8},{x:174.0,y:82.5},{x:177.8,y:80.5},{x:171.4,y:70.0},{x:185.4,y:81.8},{x:185.4,y:84.1},{x:188.0,y:90.5},{x:188.0,y:91.4},{x:182.9,y:89.1},{x:176.5,y:85.0},{x:175.3,y:69.1},{x:175.3,y:73.6},{x:188.0,y:80.5},{x:188.0,y:82.7},{x:175.3,y:86.4},{x:170.5,y:67.7},{x:179.1,y:92.7},{x:177.8,y:93.6},{x:175.3,y:70.9},{x:182.9,y:75.0},{x:170.8,y:93.2},{x:188.0,y:93.2},{x:180.3,y:77.7},{x:177.8,y:61.4},{x:185.4,y:94.1},{x:168.9,y:75.0},{x:185.4,y:83.6},{x:180.3,y:85.5},{x:174.0,y:73.9},{x:167.6,y:66.8},{x:182.9,y:87.3},{x:160.0,y:72.3},{x:180.3,y:88.6},{x:167.6,y:75.5},{x:186.7,y:101.8},{x:175.3,y:91.1},{x:175.3,y:67.3},{x:175.9,y:77.7},{x:175.3,y:81.8},{x:179.1,y:75.5},{x:181.6,y:84.5},{x:177.8,y:76.6},{x:182.9,y:85.0},{x:177.8,y:102.7},{x:184.2,y:77.3},{x:179.1,y:71.8},{x:176.5,y:87.9},{x:188.0,y:94.3},{x:174.0,y:70.9},{x:167.6,y:64.5},{x:170.2,y:77.3},{x:167.6,y:72.3},{x:188.0,y:87.3},{x:174.0,y:80.0},{x:176.5,y:82.3},{x:180.3,y:73.6},{x:167.6,y:74.1},{x:188.0,y:85.9},{x:180.3,y:73.2},{x:167.6,y:76.3},{x:183.0,y:65.9},{x:183.0,y:90.9},{x:179.1,y:89.1},{x:170.2,y:62.3},{x:177.8,y:82.7},{x:179.1,y:79.1},{x:190.5,y:98.2},{x:177.8,y:84.1},{x:180.3,y:83.2},{x:180.3,y:83.2}];
  let chart2 = new Chart(chart2Ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: '身高体重',
        data: dataArray,
        backgroundColor: getRandomColor(),
        pointRadius: 6,
        pointHoverRadius: 10,
        order: 2,
      }, {
        label: '',
        showLabel: false,
        data: dataArray2,
        type: 'line',
        order: 1,
        fill: false,
        backgroundColor: "#4169E1",
        borderColor: "#4169E1",
        lineTension: 0
      }]
    }, 
    options: {

    }
  })
})()