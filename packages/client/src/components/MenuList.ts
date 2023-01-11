import {map} from 'lodash-es';

import Component from '@core/Component';
import {MenuItem} from '@types';

export default class MenuList extends Component {
  props!: {
    menu: MenuItem[];
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
}
