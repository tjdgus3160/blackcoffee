import {map} from 'lodash-es';

import Component from '@core/Component';
import {MenuType} from '@types';

export default class Navigator extends Component {
  state!: Record<MenuType, string>;
  props!: {
    changeCategory: (e: Event) => void;
  };

  setup(): void {
    this.state = {
      espresso: '☕ 에스프레소',
      frappuccino: '🥤 프라푸치노',
      blended: '🍹 블렌디드',
      teavana: '🫖 티바나',
      desert: '🍰 디저트',
    };
  }

  template(): string {
    return `
        <a href="/" class="text-black">
            <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
        </a>
        <nav class="d-flex justify-center flex-wrap">
            ${map(
              this.state,
              (value, key) =>
                `<button data-category-name="${key}" class="cafe-category-name btn bg-white shadow mx-1">
                    ${value}
                  </button>`,
            ).join('')}
        </nav>
        `;
  }

  setEvent(): void {
    const {changeCategory} = this.props;

    this.addEvent('click', 'button', changeCategory);
  }
}
