import Component from '@core/Component';

export default class App extends Component {
  template(): string {
    return `
    <div id="app" class="px-4">
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
          <header class="my-4"></header>
          <main class="mt-10 d-flex justify-center"></main>
        </div>
      </div>
    </div>
        `;
  }
}
