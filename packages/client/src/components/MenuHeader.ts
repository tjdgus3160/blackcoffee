import Component from '@core/Component';

export default class MenuHeader extends Component {
  template(): string {
    return `
        <h2 id="category-title" class="mt-1">☕ 에스프레소 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 0개</span>
        `;
  }
}
