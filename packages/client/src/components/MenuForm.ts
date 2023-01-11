import Component from '@core/Component';

export default class MenuForm extends Component {
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
}
