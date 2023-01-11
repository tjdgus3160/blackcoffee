import Component from '@core/Component';
import {MenuType} from '@types';

export default class MenuHeader extends Component {
  props!: {
    currentCategory: MenuType;
    menuCount: number;
  };

  template(): string {
    const {currentCategory} = this.props;
    const CATEGORY_TITLE = {
      espresso: '☕ 에스프레소',
      frappuccino: '🥤 프라푸치노',
      blended: '🍹 블렌디드',
      teavana: '🫖 티바나',
      desert: '🍰 디저트',
    };

    return `
        <h2 id="category-title" class="mt-1">${CATEGORY_TITLE[currentCategory]} 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${this.props.menuCount}개</span>
        `;
  }
}
