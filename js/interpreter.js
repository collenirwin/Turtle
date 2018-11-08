class Interpreter {

    constructor(turtle) {
        this.turtle = turtle;
    }

    derecurse(code) {
        // convert the repeat statement into its body repeated the specified number of times
        const repeatedInnerCode = code.replace(/\b(rpt|repeat)\s+(\d+)\s*\[([^\]\[]+)\]/g,
            (_, _1, repetitions, innerCode) => (innerCode + " ").repeat(repetitions));
        
        // we found a repeat, but it didn't match the above regex: bad syntax
        if (/\b(rpt|repeat)\s+/g.test(code) && repeatedInnerCode === code) {
            throw "Invalid repeat command";
        }

        // if we found a loop, recurse, otherwise we're done
        return repeatedInnerCode === code
            ? code
            : this.derecurse(repeatedInnerCode);
    }

    parse(code) {
        // take care of any repeat statements
        code = this.derecurse(code);

        // split the code into tokens (which can be separated by any amount of space/newlines)
        const tokens = code.split(/\s+/g);
        let index = 0;

        // iterate over each token
        while (index < tokens.length) {
            const token = tokens[index];
            
            if (["forward", "fd"].includes(token)) {
                this.singleNumberCommand("forward", tokens[++index]);
            }
            else if (["back", "bk"].includes(token)) {
                this.singleNumberCommand("back", tokens[++index]);
            }
            else if (["left", "lt"].includes(token)) {
                this.singleNumberCommand("left", tokens[++index]);
            }
            else if (["right", "rt"].includes(token)) {
                this.singleNumberCommand("right", tokens[++index]);
            }
            else if (["penwidth", "pw"].includes(token)) {
                this.singleNumberCommand("penWidth", tokens[++index]);
            }
            else if (["pendown", "pd"].includes(token)) {
                this.turtle.penDown = true;
            }
            else if (["penup", "pu"].includes(token)) {
                this.turtle.penDown = false;
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
            // if this command is a method, call it with the number as its param
            if (this.turtle[command] instanceof Function) {
                this.turtle[command](parseFloat(number));
            }
            // otherwise, set it to the number
            else {
                this.turtle[command] = parseFloat(number);
            }
        }
        else {
            throw `Expected number after ${command} command, instead got: '${number}'`;
        }
    }
}
