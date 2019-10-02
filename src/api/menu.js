const Menu = [
  { header: 'Xin chào' },
  {
    title: 'Bản đồ',
    group: 'apps',
    icon: 'map',
    name: 'Home',
    url: '/home'    
  },
  {
    title: 'Người dùng',
    group: 'apps',
    icon: 'person',
    name: 'User',
    url: '/user',
    roles: ['GetAccount']
  },
];

// reorder menu
Menu.forEach(item => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }
});

export default Menu;
