let inputDisplay = document.querySelector("#input");
let outputDisplay = document.querySelector("#output");
inputDisplay.textContent = '';
outputDisplay.textContent = '0';

let accumulator = '';
let operations = {
    /* In the spirit of BODMAS */
    a: 0,   // a = +
    b: 0,   // b = -  
    c: 0,   // c = x 
    d: 0,   // d = /
    count:0,

    operators: []
};

let updateInputDisplay = () => {
    let slicedAccumulator;
    if(accumulator.length <= 26) {
        inputDisplay.textContent = accumulator;
    } else {
        accumulator = accumulator.split("");
        slicedAccumulator = accumulator.slice(accumulator.length - 26, accumulator.length);
        accumulator = slicedAccumulator.join("");
        inputDisplay.textContent = accumulator;
        console.log(accumulator);
    }
};

let numberHandler = (value) => {
    accumulator += value;
    updateInputDisplay();
};

let operatorsHandler = (value) => {
    accumulator += ' ';
    accumulator += value;
    accumulator += ' ';
    switch(value) {
        case "+" :
            operations.a += 1;
            operations.count += 1;
            operations.operators.push("+");
            break;
        case "-" :
            operations.b += 1;
            operations.count += 1;
            operations.operators.push("-");
           break;
        case "x" :
            operations.c += 1;
            operations.count += 1;
            operations.operators.push("x");
            break;
        case "/" :
            operations.d += 1;
            operations.count += 1;
            operations.operators.push("/");
            break;
        default :
            console.log("no operator was pressed");

    }
    updateInputDisplay();
};

let sanitizeBeforCalculation = () => {
};

let calculate = () => {
    if(accumulator.length == 0) {
        return;
    }

    let answer;
    let temp = accumulator;
    temp = temp.split(" ");
    let operations2 = operations;
    console.log('operations2', operations2);

    // this while loop performs all the divisions operations for the temp array
    while(operations2.d > 0) {
        divIndex = temp.indexOf('/');
        let intermediateResult = Number.parseFloat(temp[divIndex - 1]) / Number.parseFloat(temp[divIndex +1]);
        console.log(temp);
        temp.splice(divIndex - 1, 3, intermediateResult);
        console.log(temp);
        console.log();

        operations2.d--;
    }

    // this while loop performs all the multiplications operations for the temp array
    while(operations2.c > 0) {
        multIndex = temp.indexOf('x');
        let intermediateResult = Number.parseFloat(temp[multIndex - 1]) * Number.parseFloat(temp[multIndex +1]);
        console.log(temp);
        temp.splice(multIndex - 1, 3, intermediateResult);
        console.log(temp);
        console.log();

        operations2.c--;
    }

    // this while loop performs all the additions operations for the temp array
    while(operations2.a > 0) {
        addIndex = temp.indexOf('+');
        let intermediateResult = Number.parseFloat(temp[addIndex - 1]) + Number.parseFloat(temp[addIndex +1]);
        console.log(temp);
        temp.splice(addIndex - 1, 3, intermediateResult);
        console.log(temp);
        console.log();

        operations2.a--;
    }

    // this while loop performs all the substractions operations for the temp array
    while(operations2.b > 0) {
        subIndex = temp.indexOf('-');
        let intermediateResult = Number.parseFloat(temp[subIndex - 1]) - Number.parseFloat(temp[subIndex +1]);
        console.log(temp);
        temp.splice(subIndex - 1, 3, intermediateResult);
        console.log(temp);
        console.log();

        operations2.b--;
    }
    answer = temp.join();
    outputDisplay.textContent = answer;
    operations.count = 0;
    operations.operators = [];
    accumulator = "";
};

let clearAll = () => {
    inputDisplay.textContent = "";
    outputDisplay.textContent = 0;
    accumulator = "";
    operations.a = 0;
    operations.b = 0;
    operations.c = 0;
    operations.d = 0;
    operations.count = 0;
};


let removeLastAccumulatorItem = () => {
    if(accumulator.length == 0) {
        return;
    }
    let accumulatorArray = accumulator;
    accumulatorArray = accumulatorArray.split("");
    let poppedItem = accumulatorArray.pop();

    if(poppedItem === " "){
        
        accumulatorArray.pop();
        accumulatorArray.pop();
        
        accumulator = accumulatorArray.join("");
        
        updateInputDisplay();
        removeLastOperatorItem();
        
    } else {
        accumulator = accumulatorArray.join("");
        updateInputDisplay();

    }
};

let removeLastOperatorItem = () => {
    let lastItem = operations.operators.pop();
    switch(lastItem) {
        case "+" :
            operations.a -= 1;
            break;
        case "-" :
            operations.b -= 1;
            break;
        case "x" :
            operations.c -= 1;
            break;
        case "/" :
            operations.d -= 1;
            break;
        default :
            break;
    }

    operations.count -= 1;
    console.log('operations.count', operations.count);
};

let clearLastItem = () => {
    removeLastAccumulatorItem();
};

