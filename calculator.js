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
    }
};

let numberHandler = (value) => {
    accumulator += value;
    if(inputDisplay.style.backgroundColor != 'white') {
        inputDisplay.style.backgroundColor = 'white';
    }
    updateInputDisplay();
};

let operatorsHandler = (value) => {
    accumulator += ' ';
    accumulator += value;
    accumulator += ' ';
    updateInputDisplay();
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
        break;
    }
};

let sanitizeAfterCalculation = () => {
    operations.count = 0;
    operations.operators = [];
    accumulator = "";
}

let calculate = () => {
    let answer;
    let temp = accumulator;
    temp = temp.split(" ");
    let operations2 = operations;

    // this while loop performs all the divisions operations for the temp array
    while(operations2.d > 0) {
        divIndex = temp.indexOf('/');
        let intermediateResult = Number.parseFloat(temp[divIndex - 1]) / Number.parseFloat(temp[divIndex +1]);
        temp.splice(divIndex - 1, 3, intermediateResult);

        operations2.d--;
    }

    // this while loop performs all the multiplications operations for the temp array
    while(operations2.c > 0) {
        multIndex = temp.indexOf('x');
        let intermediateResult = Number.parseFloat(temp[multIndex - 1]) * Number.parseFloat(temp[multIndex +1]);
        temp.splice(multIndex - 1, 3, intermediateResult);

        operations2.c--;
    }

    // this while loop performs all the additions operations for the temp array
    while(operations2.a > 0) {
        addIndex = temp.indexOf('+');
        let intermediateResult = Number.parseFloat(temp[addIndex - 1]) + Number.parseFloat(temp[addIndex +1]);
        temp.splice(addIndex - 1, 3, intermediateResult);

        operations2.a--;
    }

    // this while loop performs all the substractions operations for the temp array
    while(operations2.b > 0) {
        subIndex = temp.indexOf('-');
        let intermediateResult = Number.parseFloat(temp[subIndex - 1]) - Number.parseFloat(temp[subIndex +1]);
        temp.splice(subIndex - 1, 3, intermediateResult);

        operations2.b--;
    }
    if(temp.length == 0 || Number.isNaN(temp[0])) {
        answer = 0;
        inputDisplay.style.backgroundColor = '#FF7145';
    } else {
        answer = temp.join();
    }
    outputDisplay.textContent = answer;
    resultsObj.resultsArrayInc(answer);
    if(answer.length == 0) {
        outputDisplay.textContent = 0;
    }
    sanitizeAfterCalculation();
};

let unaryCalculator = (value) => {
    let answer = 0;
    let temp = accumulator;
    temp = temp.split(" ");
    switch(value) {
        case "e" :
            outputDisplay.textContent = Math.sin((temp * Math.PI) / 180).toFixed(4);
            inputDisplay.textContent = "SIN(" + accumulator + ")";
            break;
        case "f" :
            outputDisplay.textContent = Math.cos((temp * Math.PI) / 180).toFixed(4);
            inputDisplay.textContent = "COS(" + accumulator + ")";
            break;
        case "g" :
            outputDisplay.textContent = Math.tan((temp * Math.PI) / 180).toFixed(4);
            inputDisplay.textContent = "TAN(" + accumulator + ")";
            break;
        case "h" :
            outputDisplay.textContent = (temp * temp).toString();
            inputDisplay.textContent = accumulator + "^2";
            break;
        case "i" :
            outputDisplay.textContent = Math.sqrt(temp).toString();
            inputDisplay.textContent = "SQRT " + accumulator;
            break;
        case "j" :
            outputDisplay.textContent = Math.log(temp).toString();
            inputDisplay.textContent = "LOG(" + accumulator + ")" ;
            break;
        default :
            break;
    }
    sanitizeAfterCalculation();
}

let resultsObj = {
    results: [],
    indexIterator: 0,
    resetIterator: () => {
        resultsObj.indexIterator = resultsObj.results.length - 1;
    },
    resultsArrayInc: (value) => {
        resultsObj.results.push(value);
        resultsObj.resetIterator();
    },
    next: (value) => {
        if(!resultsObj.results.length > 0) {
            return;
        }

        switch(value) {
            case "forward" :
                if(resultsObj.indexIterator + 1 == resultsObj.results.length) {
                    return;
                }
                resultsObj.indexIterator++
                outputDisplay.textContent = resultsObj.results[resultsObj.indexIterator];
                break;
            case "back" :
                if(resultsObj.indexIterator  <= 0) {
                    return;
                }    
                resultsObj.indexIterator--;
                outputDisplay.textContent = resultsObj.results[resultsObj.indexIterator];
                break;
            default :
                break;
        }
    },

}

let clearAll = () => {
    inputDisplay.textContent = "";
    outputDisplay.textContent = 0;
    accumulator = "";
    operations.a = 0;
    operations.b = 0;
    operations.c = 0;
    operations.d = 0;
    operations.count = 0;
    inputDisplay.style.backgroundColor = 'white';
    resultsObj.resetIterator();

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
};

let clearLastItem = () => {
    removeLastAccumulatorItem();
};

