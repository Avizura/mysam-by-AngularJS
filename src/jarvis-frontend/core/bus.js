export default class Bus {

		static publish(event) {
			console.log(event);
			if (Bus.subscriptions[event.name]) {
				console.log(`${Bus.subscriptions[event.name].length} subscription(s)`);
				Bus.subscriptions[event.name].forEach(on => on(event));
			}
		}

    static when(eventName) {
			return {
				then: on => this.subscribe(eventName, on)
			};
		}

		static subscribe(name, on) {
			if (!Bus.subscriptions[name])
				Bus.subscriptions[name] = [];
			const newCount = Bus.subscriptions[name].push(on);
			const subscriptionIndex = newCount - 1;
			console.log(`Subscription made for ${name}`);
			return {
				unsubscribe: () => Bus.subscriptions[name][subscriptionIndex] = undefined
			};
		}
}

Bus.subscriptions = {};
