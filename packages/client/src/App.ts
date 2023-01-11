import Component from '@core/Component';

import Navigator from './components/Navigator';

export default class App extends Component {
  template(): string {
    return `
    <div id="app" class="px-4">
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
          <header class="my-4" data-component="navigator"></header>
          <main class="mt-10 d-flex justify-center"></main>
        </div>
      </div>
    </div>
        `;
  }

  mounted(): void {
    const $navigator = this.$target.querySelector('[data-component="navigator"]') as HTMLElement;

    new Navigator($navigator);
  }
}
