class Drawer {
  constructor(container, banner, link) {
    if (typeof container === 'undefined') {
      throw new Error('expected a parent container');
    }
    this.container = container;
    this.self = document.createElement('div');
    this.link = document.createElement('a');
    this.banner = document.createElement('div');
    this.bannerIcon = document.createElement('img');
    this.tab = document.createElement('div');
    this.active = document.createElement('div');
    this.data = [];

    this.self.className = "drawer";
    this.bannerIcon.className = "icon";
    this.bannerIcon.src = banner;
    this.banner.className = "banner";
    this.link.href = link;
    
    this.tab.className = "tab";
    this.active.className = "active";

    this.banner.append(this.bannerIcon);
    this.link.append(this.banner);
    this.tab.appendChild(this.active);
    this.self.append(this.link, this.tab);
    this.container.append(this.self);

    this.self.addEventListener('click', function(e) {
      e.stopPropagation();
    })
  }

  addItem(label, callback) {
    let item = document.createElement('div');
    item.className = "item";
    let index = this.data.length;
    item.addEventListener('click', function(e) {
      for (let i = 1; i < this.tab.childElementCount; i++) {
        this.tab.children[i].classList.remove('item-active');
      }
      item.classList.add('item-active');
      this.active.style.display = "block";
      this.active.style.top = index*3 + 'em';
    }.bind(this));

    if (typeof callbak !== 'undefined') {
      item.addEventListener('click', callback);
    }
    
    item.textContent = label;
    this.tab.appendChild(item);
    this.data.push(label);
  }

  show() {
    this.self.classList.add('pull');
  }

  hide() {
    this.self.classList.remove('pull');
  }


}