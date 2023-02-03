class Calculator {
    constructor(currentText, previousText){
        this.currentText = currentText;
        this.previousText = previousText;
        this.allClear();
    }

    allClear(){
        this.currentNumber = '';
        this.previousNumber = '';
        this.operation = undefined;
    }

    appendNumber(number){
        if(number === '.' && this.currentNumber.includes('.')){
            return
        }
        this.currentNumber = this.currentNumber + number.toString();
    }

    delete(){
        this.currentNumber = this.currentNumber.toString().slice(0, -1);
    }
    
    operationValue(operation){
        if (this.currentNumber === ''){
            this.operation = operation;
            return
        }

        if(this.previousNumber !== ''){
            this.compute();
        }

        this.operation = operation;
        this.previousNumber = this.currentNumber;
        this.currentNumber = '';
    }
    
    compute(){
        let result;
        const prev = parseFloat(this.previousNumber);
        const current = parseFloat(this.currentNumber);
        
        if (isNaN(prev) || isNaN(current)){
            return
        }

        switch (this.operation){
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            default:
                return
        }
        this.previousNumber = '';
        this.currentNumber = result;
        this.operation = undefined;
    }

    numberConvert(number){
        let stringPart = number.toString();
        let integerPart = parseInt(stringPart.split('.')[0]);
        let decimalPart = stringPart.split('.')[1];

        if (isNaN(integerPart)){
            integerPart = '';
        }
        else {
            integerPart = integerPart.toLocaleString('en');
        }

        if (decimalPart != null){
            decimalPart = decimalPart.slice(0,5);
            return `${integerPart}.${decimalPart}`;
        }

        return integerPart;
    }

    update(){
        this.currentText.innerText = this.numberConvert(this.currentNumber);

        if (this.operation != null && this.previousNumber !== ''){
            this.previousText.innerText = this.numberConvert(this.previousNumber) + ' ' + this.operation;
        } 
        
        else{
            this.previousText.innerText = this.numberConvert(this.previousNumber);
            // console.log(this.operation);
        }
    }
}

const currentDisplay = document.querySelector('[data-current]');
const previousDisplay = document.querySelector('[data-previous]');

const numbers = document.querySelectorAll('[data-btn-number]');
const operators = document.querySelectorAll('[data-btn-operator]');
const equal = document.querySelector('[data-btn-equal]');
const clear = document.querySelector('[data-btn-clear]');
const deleteButton = document.querySelector('[data-btn-delete]');

const calculator = new Calculator(currentDisplay, previousDisplay);


clear.addEventListener('click', ()=>{
    calculator.allClear();
    calculator.update();
});

deleteButton.addEventListener('click', ()=>{
    calculator.delete();
    calculator.update();
})

numbers.forEach(number => {
    number.addEventListener('click', ()=>{
        calculator.appendNumber(number.innerText);
        calculator.update();
    });    
})    

operators.forEach(operator => {
    operator.addEventListener('click', ()=>{
        calculator.operationValue(operator.innerText);
        calculator.update();
    })
})

equal.addEventListener('click', ()=>{
    calculator.compute();
    calculator.update();
})