import Component from '@core/Component';
import {MenuType} from '@types';

import MenuForm from './components/MenuForm';
import MenuHeader from './components/MenuHeader';
import MenuList from './components/MenuList';
import Navigator from './components/Navigator';

export default class App extends Component {
  state!: {
    currentCategory: MenuType;
  };

  setup(): void {
    this.state = {
      currentCategory: 'espresso',
    };
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
    const {changeCategory} = this;
    const {currentCategory} = this.state;

    const $navigator = this.$target.querySelector('#navigator') as HTMLElement;
    const $menuHeader = this.$target.querySelector('#menu-header') as HTMLElement;
    const $menuForm = this.$target.querySelector('#menu-form') as HTMLElement;
    const $menuList = this.$target.querySelector('#menu-list') as HTMLElement;

    new Navigator($navigator, {
      changeCategory: changeCategory.bind(this),
    });
    new MenuHeader($menuHeader, {
      currentCategory,
    });
    new MenuForm($menuForm);
    new MenuList($menuList);
  }

  changeCategory(e: Event) {
    if (e.target instanceof HTMLButtonElement) {
      this.setState({currentCategory: e.target.dataset.categoryName as MenuType});
    }
  }
}
