class Brain {
    constructor() {
        this.brain = new brain.NeuralNetwork(options);
        this.data = [];
    }

    addExample(features, label) {
        let output = {};
        output[label] = 1;

        this.data.push({
            input: features,
            output: output
        });
    }

    train() {
        return this.brain.train(this.data);
    }

    getClassifications(features) {
        let result = [];
        let data = this.brain.run(features);

        Object.keys(data).forEach(function(label) {
            result.push({
                label: label,
                value: data[label]
            });
        });

        return result;
    }

    classify(features) {
        let classifications = this.getClassifications(features);
        let max = 0;
        let result = null;

        classifications.forEach(function(current) {
            if (current.value > max) {
                result = current.label;
                max = current.value;
            }
        });

        return result;
    }
}
