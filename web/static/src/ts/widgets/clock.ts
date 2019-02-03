import { Widget } from "../core/widget";
import { Env } from "../env";

export class Clock extends Widget<Env, {}> {
  template = "clock";
  timeout: any | undefined;

  state = {
    currentTime: ""
  };

  mounted() {
    this.updateTime();
    this.startClock();
  }

  willUnmount() {
    clearTimeout(this.timeout);
  }

  updateTime() {
    this.updateState({ currentTime: new Date().toLocaleTimeString() });
  }

  startClock() {
    const now = Date.now();
    const offset = 1000 - (now % 1000);
    this.timeout = setTimeout(() => {
      this.updateTime();
      this.startClock();
    }, offset);
  }
}