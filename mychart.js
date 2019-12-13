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

namespace.drawer.addItem('饼图');
namespace.drawer.addItem('折线图');
namespace.drawer.addItem('甜甜圈');
namespace.drawer.addItem('hasaki');
namespace.drawer.addItem('kiseki');