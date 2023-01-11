import {find} from 'lodash-es';

import Component from '@core/Component';
import {MenuItem, MenuType} from '@types';

import MenuForm from './components/MenuForm';
import MenuHeader from './components/MenuHeader';
import MenuList from './components/MenuList';
import Navigator from './components/Navigator';
import MenuService from './services/MenuService';

export default class App extends Component {
  state!: {
    currentCategory: MenuType;
    menu: MenuItem[];
  };

  setup(): void {
    const init = async () => {
      const menu = await MenuService.getAllMenuByCategory('espresso');

      this.setState({
        currentCategory: 'espresso',
        menu,
      });
    };

    init();
  }

  template(): string {
    return `
    <div id="app" class="px-4">
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
          <header id="navigator" class="my-4"></header>
          <main class="mt-10 d-flex justify-center">
            <div # class="wrapper bg-white p-10">
              <div id="menu-header" class="heading d-flex justify-between"></div>
              <form id="menu-form"></form>
              <ul id="menu-list" class="mt-3 pl-0"></ul>
            </div>
          </main>
        </div>
      </div>
    </div>
        `;
  }

  mounted(): void {
    if (this.state === undefined) return;

    const {changeCategory, addMenu, updateMenu, deleteMenu, toggleSoldOutMenu} = this;
    const {currentCategory, menu} = this.state;

    const $navigator = this.$target.querySelector('#navigator') as HTMLElement;
    const $menuHeader = this.$target.querySelector('#menu-header') as HTMLElement;
    const $menuForm = this.$target.querySelector('#menu-form') as HTMLElement;
    const $menuList = this.$target.querySelector('#menu-list') as HTMLElement;

    new Navigator($navigator, {
      changeCategory: changeCategory.bind(this),
    });
    new MenuHeader($menuHeader, {
      currentCategory,
      menuCount: this.state.menu.length,
    });
    new MenuForm($menuForm, {
      addMenu: addMenu.bind(this),
    });
    new MenuList($menuList, {
      menu,
      updateMenu: updateMenu.bind(this),
      deleteMenu: deleteMenu.bind(this),
      toggleSoldOutMenu: toggleSoldOutMenu.bind(this),
    });
  }

  async changeCategory(e: Event) {
    if (e.target instanceof HTMLButtonElement) {
      const currentCategory = e.target.dataset.categoryName as MenuType;
      const menu = await MenuService.getAllMenuByCategory(currentCategory);

      this.setState({currentCategory, menu});
    }
  }

  async addMenu(name: string) {
    const newMenu = await MenuService.createMenu(this.state.currentCategory, name);

    if (!newMenu) {
      return;
    }

    if (find(this.state.menu, {name})) {
      alert('이미 등록된 메뉴입니. 다시 입력해주세요.');
    }

    this.setState({menu: [...this.state.menu, newMenu]});
  }

  async updateMenu(menuId: string, updatedMenuName: string) {
    await MenuService.updateMenu(this.state.currentCategory, menuId, updatedMenuName);

    const menu = await MenuService.getAllMenuByCategory(this.state.currentCategory);

    this.setState({menu});
  }

  async deleteMenu(menuId: string) {
    await MenuService.deleteMenu(this.state.currentCategory, menuId);

    const menu = await MenuService.getAllMenuByCategory(this.state.currentCategory);

    this.setState({menu});
  }

  async toggleSoldOutMenu(menuId: string) {
    await MenuService.toggleSoldOutMenu(this.state.currentCategory, menuId);

    const menu = await MenuService.getAllMenuByCategory(this.state.currentCategory);

    this.setState({menu});
  }
}
