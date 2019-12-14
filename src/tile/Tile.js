class Tile {
  constructor() {
    this.self = document.createElement('div');
    this.self.className = "tile";
  }

  addItem(text, handler) {
    let item = document.createElement('div');
    let label = document.createElement('div');
    let right = document.createElement('div');
    let btn = document.createElement("div");
    let bar = document.createElement('div');
    let ball = document.createElement('div');

    item.className = 't-item';
    label.className = "t-label";
    right.className = "btn";
    btn.className = 'switch';
    bar.className = 'bar';
    ball.className = 'ball';

    label.textContent = text;
    btn.append(bar, ball);
    right.appendChild(btn);
    item.append(label, right);
    
    if(typeof handler !== 'undefined') {
      item.addEventListener('click', e=>{
        item.classList.toggle('on')
          ? handler.on()
          : handler.off();
      });
    }
    this.self.appendChild(item);
  }
}