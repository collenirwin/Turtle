class Interpreter {

    constructor(turtle) {
        this.turtle = turtle;
    }

    parse(code) {
        // split the code into tokens (which can be separated by any amount of space/newlines)
        const tokens = code.split(/\s+/g);
        let index = 0;

        // iterate over each token
        while (index < tokens.length) {
            const token = tokens[index];

            if (["forward", "fd"].includes(token)) {
                this.singleNumberCommand("forward", tokens[index + 1]);
                index++;
            }
            else if (["back", "bk"].includes(token)) {
                this.singleNumberCommand("back", tokens[index + 1]);
                index++;
            }
            else if (["left", "lt"].includes(token)) {
                this.singleNumberCommand("left", tokens[index + 1]);
                index++;
            }
            else if (["right", "rt"].includes(token)) {
                this.singleNumberCommand("right", tokens[index + 1]);
                index++;
            }
            else if (token !== "") {
                throw `Unexpected token: ${token}`;
            }

            index++;
        }
    }

    // call a turtle command that has a single number parameter
    // throws an exeption if not given a number
    singleNumberCommand(command, number) {
        if (isNumber(number)) {
            this.turtle[command](parseFloat(number));
        }
        else {
            throw `Expected integer after <b>${command}</b> command`;
        }
    }
}
