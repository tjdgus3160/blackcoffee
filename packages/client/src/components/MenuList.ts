/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {map} from 'lodash-es';

import Component from '@core/Component';
import {MenuItem} from '@types';

export default class MenuList extends Component {
  props!: {
    menu: MenuItem[];
    updateMenu: (menuId: string, updatedMenuName: string) => Promise<void>;
    deleteMenu: (menuId: string) => Promise<void>;
    toggleSoldOutMenu: (menuId: string) => Promise<void>;
  };

  template(): string {
    return map(
      this.props.menu,
      ({id, name, isSoldOut}) =>
        `<li data-menu-id="${id}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name ${isSoldOut ? 'sold-out' : ''}">${name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
            품절
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>`,
    ).join('');
  }

  setEvent(): void {
    this.addEvent('click', 'li', (e: Event) => {
      if (!(e.target instanceof HTMLButtonElement)) {
        return;
      }

      const isEditButton = e.target.classList.contains('menu-edit-button');
      const isRemoveButton = e.target.classList.contains('menu-remove-button');
      const isSoldOutButton = e.target.classList.contains('menu-sold-out-button');

      const menuListItem$ = e.target.closest('li') as HTMLLIElement;
      const menuId = menuListItem$.dataset.menuId as string;

      if (isEditButton) {
        const menuName$ = menuListItem$.querySelector('.menu-name') as HTMLSpanElement;
        const updatedMenuName = prompt('메뉴명을 수정하세요', menuName$.innerText) || menuName$.innerText;

        this.props.updateMenu(menuId, updatedMenuName);
      }
      if (isRemoveButton && confirm('정말 삭제하시겠습니까?')) {
        this.props.deleteMenu(menuId);
      }
      if (isSoldOutButton) {
        this.props.toggleSoldOutMenu(menuId);
      }
    });
  }
}
