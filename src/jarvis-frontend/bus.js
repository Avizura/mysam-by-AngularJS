export default class Bus {

    constructor() {
      this.subscriptions = {};
    }

		static publish(event) {
			console.log(event);
			if (this.subscriptions[event.name]) {
				console.log(`${this.subscriptions[event.name].length} subscription(s)`);
				this.subscriptions[eventName].forEach(on => on(event));
			}
		}

    static when(eventName) {
			return {
				then: on => this.subscribe(eventName, on)
			};
		}

		static subscribe(name, on) {
			if (!this.subscriptions[name])
				this.subscriptions[name] = [];
			const newCount = this.subscriptions[name].push(on);
			const subscriptionIndex = newCount - 1;
			console.log(`Subscription made for ${name}`);
			return {
				unsubscribe: () => this.subscriptions[name][subscriptionIndex] = undefined
			};
		}
}
