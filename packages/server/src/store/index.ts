import {findIndex} from 'lodash';

import {Menu, MenuItem, MenuType} from '@types';

class Store {
  menuBoard: Menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  getMenuListByCategory(category: MenuType) {
    return this.menuBoard[category];
  }
  getByMenuId(category: MenuType, menuId: string) {
    return this.menuBoard[category].find(item => item.id === menuId);
  }
  updateMenuItem(category: MenuType, menuId: string, name: string) {
    (this.menuBoard[category].find(item => item.id === menuId) as MenuItem).name = name;
  }
  createMenuItem(category: MenuType, menuItem: MenuItem) {
    this.menuBoard[category].push(menuItem);
  }
  deleteMenuItem(category: MenuType, menuId: string) {
    const index = this.menuBoard[category].findIndex(menu => menu.id === menuId);

    this.menuBoard[category].splice(index, 1);
  }
  toggleSoldOutMenuItem(category: MenuType, menuId: string) {
    const index = this.menuBoard[category].findIndex(item => item.id === menuId);

    this.menuBoard[category][index].isSoldOut = !this.menuBoard[category][index].isSoldOut;
  }

  isValid({res, category, menuId = '', name = ''}) {
    if (category && !Object.prototype.hasOwnProperty.call(this.menuBoard, category)) {
      res.status(404).json({message: '존재하지 않는 카테고리 입니다.'});

      return;
    }
    if (menuId && findIndex(this.menuBoard[category as MenuType], {id: menuId}) === -1) {
      res.status(404).json({message: '존재하지 않는 메뉴 입니다.'});

      return;
    }
    if (name && (name as string).length < 2) {
      res.status(400).json({message: '메뉴 이름은 최소 2글자 이상이어야 합니다.'});

      return;
    }

    if (name && findIndex(this.menuBoard[category as MenuType], {name}) !== -1) {
      res.status(400).json({message: '이미 등록되어 있는 메뉴입니다.'});

      return;
    }

    return true;
  }
}

export default new Store();
