import {isEmpty} from 'lodash-es';

import Component from '@core/Component';

export default class MenuForm extends Component {
  props!: {
    addMenu: (name: string) => Promise<void>;
  };

  template(): string {
    return `
        <div class="d-flex w-100">
            <label for="menu-name" class="input-label" hidden> 에스프레소 메뉴 이름 </label>
            <input
            type="text"
            id="menu-name"
            name="espressoMenuName"
            class="input-field"
            placeholder="메뉴 이름"
            autocomplete="off"
            />
            <button type="button" name="submit" id="menu-submit-button" class="input-submit bg-green-600 ml-2">
            확인
            </button>
            <input type="hidden" />
        </div>`;
  }
  setEvent(): void {
    const addMenu = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== 'Enter') {
        return;
      }
      e.preventDefault();

      const menuInput$ = document.querySelector('#menu-name') as HTMLInputElement;

      if (isEmpty(menuInput$.value)) {
        return;
      }

      this.props.addMenu(menuInput$.value);

      menuInput$.value = '';
    };

    this.addEvent('keypress', '#menu-name', addMenu);
    this.addEvent('click', '#menu-submit-button', addMenu);
  }
}
