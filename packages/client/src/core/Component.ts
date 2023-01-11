/* eslint-disable @typescript-eslint/no-empty-function */
export default class Component {
  $target: HTMLElement;
  $props?: any;
  $state?: any;
  constructor($target: HTMLElement, $props?: any) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }
  setup(): void {}
  mounted(): void {}
  template(): string {
    return '';
  }
  render(): void {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  setEvent(): void {}
  setState(newState: any): void {
    this.$state = {...this.$state, ...newState};
    this.render();
  }
  addEvent(eventType: string, selector: string, callback: (event: Event) => void) {
    const children = Array.from(this.$target.querySelectorAll(selector));
    const isTarget = (target: HTMLElement) => children.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, (event: Event) => {
      if (!isTarget(event.target as HTMLElement)) {
        return false;
      }

      callback(event);
    });
  }
}
