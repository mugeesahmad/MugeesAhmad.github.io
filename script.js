// Display Values

const cardName = document.querySelector('.cardName');
const cardNumber = document.querySelector('.cardNumber');
const month = document.querySelector('.month');
const year = document.querySelector('.year');
const cvc = document.querySelector('.cvcNumber');
const form = document.querySelector('.form');
const completed = document.querySelector('.completed');

// Errors

const errorName = document.querySelector('.errorName');
const errorNumber = document.querySelector('.errorNumber');
const errorMonth = document.querySelector('.errorMonth');
const errorYear = document.querySelector('.errorYear');
const errorCVC = document.querySelector('.errorCVC');

// Input Values
const inputName = document.querySelector('[data-name]');
const inputNumber = document.querySelector('[data-number]');
const inputYear = document.querySelector('[data-year]');
const inputMonth = document.querySelector('[data-month]');
const inputCVC = document.querySelector('[data-cvc]');

//  Buttons

const confirmButton = document.querySelector('.buttonForm');
const continueButton = document.querySelector('.buttonContinue');

// Colors

const lightGrey = 'var(--light-grey-violet)';
const darkGrey = 'var(--very-dark-grey-violet)';

// Funtions on click

confirmButton.addEventListener('click', 
() => {
        // console.clear();
        let counter = 0;
        let arrays = [inputName, inputNumber, inputMonth, inputYear , inputCVC];
        let errorList = [errorName, errorNumber, errorMonth, errorYear, errorCVC];
        let errorMSG = [`Name can't be blank`, `Card number can't be blank`, `Month can't be blank` , `Year can't be blank`, `CVC can't be blank`];
        let functions = [nameFunction, numberFunction, monthFunction, yearFunction, cvcFunction];
        while(counter < arrays.length) {
            if (arrays[counter].value == ''){
                arrays[counter].style.borderColor = lightGrey;
                errorList[counter].style.display = 'block';
                errorList[counter].innerText = errorMSG[counter];
                console.log(arrays[counter]);
                console.log(arrays[counter].value);
            }
            else if (!(functions[counter]())){
                functions[counter]();
            }
            else if(nameFunction() && numberFunction() && monthFunction() && yearFunction() && cvcFunction()) {
                form.style.display = 'none';
                completed.style.display = 'flex';        
            }
            counter += 1;
        }
    }
)

continueButton.addEventListener('click', 
    () => {
        let arrays = [inputName, inputNumber, inputMonth, inputYear , inputCVC];
        form.style.display = 'block';
        completed.style.display = 'none';
        cardName.innerText = 'Jane Appleseed';
        cardNumber.innerText = '0000 0000 0000 0000';
        month.innerText = '00';
        year.innerText = '00';
        cvc.innerText = '000';
        inputName.value = '';
        inputNumber.value = '';
        inputMonth.value = '';
        inputYear.value = '';
        inputCVC.value = '';
        arrays.forEach((input) =>{
            input.style.borderColor = lightGrey;
        })
    }
)

// Validity funtions

function nameFunction(){
    if(inputName.value == ''){
        inputName.style.borderColor = lightGrey;
        errorName.style.display = 'none';
        cardName.innerText = 'Jane Appleseed';
        return false;
    }

    else if (inputName.value.match(/\d/)){
        inputName.style.borderColor = 'red';
        errorName.style.display = 'block';
        errorName.innerText = 'Name can only consist of alphabetic data!';
        return false;
    }

    else if(inputName.value.length < 3){
        inputName.style.borderColor = 'red';
        errorName.style.display = 'block';
        errorName.innerText = 'Name must consist of more than two letters at least!';
        cardName.innerText = 'Jane Appleseed';
        return false;
    }
    else if(inputName.value.match(/^[a-zA-Z ]+$/g)){
        inputName.style.borderColor = darkGrey;
        errorName.style.display = 'none';
        cardName.innerText = inputName.value;
        return true;
    } 

}

function numberFunction(){
    if(inputNumber.value.match(/^\d{16}$/g)){
        inputNumber.style.borderColor = darkGrey;
        errorNumber.style.display = 'none';
        cardNumber.innerText = inputNumber.value.match(/.{4}/g).join(' ');
        return true;
    }

    else if(inputNumber.value == ''){
            inputNumber.style.borderColor = lightGrey;
            errorNumber.style.display = 'none';
            cardNumber.innerHTML = '0000 0000 0000 0000';
            return false;
    }

    else {
            inputNumber.style.borderColor = 'red';
            errorNumber.style.display = 'block';
            cardNumber.innerHTML = '0000 0000 0000 0000';
            if(inputNumber.value.match(/[A-Z]/i)){
              errorNumber.innerText = 'Card number can only consist of numeric data!';
            }
            else if(inputNumber.value.length < 16){
                errorNumber.innerText = `Card number can't be shorter than 16 numbers!`;
            } 
            else if(inputNumber.value.length > 16){
                errorNumber.innerText = `Card number can't be longer than 16 numbers!`;
            }
            return false;
    }
}

function monthFunction(){
    if (inputMonth.value == ''){
        inputMonth.style.borderColor = lightGrey;
        month.innerText = '00';
        errorMonth.style.display = 'none';
        return false;
    } else if (Number(inputMonth.value) > 0 && Number(inputMonth.value) <= 12){
        inputMonth.style.borderColor = 'var(--very-dark-grey-violet)';
        if(Number(inputMonth.value) < 10){
            month.innerText = '0'+ Number(inputMonth.value);
        }else{
            month.innerText = Number(inputMonth.value);
        }
        errorMonth.style.display = 'none';
        return true;
    } else {
        month.innerText = '00';
        errorMonth.style.display = 'block';
        inputMonth.style.borderColor = 'red';
        let err = 'an error occured';
        if (inputMonth.value.match(/[A-Z]/i)){
            err = `Month must not be filled with an alphanumeric value`;
        }
         else if(Number(inputMonth.value) > 12 || Number(inputMonth.value) < 1){
            err = 'Number must not be smaller than 1 or greater than 12';
         }
        errorMonth.innerText = err;
        return false;
    }
    
}

function yearFunction(){
    if (inputYear.value == ''){
        inputYear.style.borderColor = lightGrey;
        year.innerText = '00';
        errorYear.style.display = 'none';
        return false;
    } else if (Number(inputYear.value) <= 99){
        inputYear.style.borderColor = 'var(--very-dark-grey-violet)';
        if(Number(inputYear.value) < 10){
            year.innerText = '0'+ Number(inputYear.value);
        }else{
            year.innerText = Number(inputYear.value);
        }
        errorYear.style.display = 'none';
        return true;
    } else {
        year.innerText = '00';
        errorYear.style.display = 'block';
        inputYear.style.borderColor = 'red';
        let err = 'an error occured';
        if (inputYear.value.match(/[A-Z]/i)){
            err = `Year must not be filled with an alphanumeric value!`;
        }
         else if(Number(inputYear.value) > 99){
            err = 'Year must not be greater than 99'; 
         }
        errorYear.innerText = err;
        return false;
    }
    
}

function cvcFunction(){
    if (inputCVC.value == ''){
        inputCVC.style.borderColor = lightGrey;
        cvc.innerText = '000';
        errorCVC.style.display = 'none';
        return false;
    } else if (Number(inputCVC.value) <= 999){
        inputCVC.style.borderColor = 'var(--very-dark-grey-violet)';
        if (Number(inputCVC.value < 10)){
            cvc.innerText = '00' + Number(inputCVC.value);
        }
        else if(Number(inputCVC.value < 100)){
            cvc.innerText = '0' + parseInt(inputCVC.value);
            console.log(Number(inputCVC.value))
        }
        else{
            cvc.innerText = Number(inputCVC.value);
        }
        errorCVC.style.display = 'none';
        return true;
    } else {
        cvc.innerText = '000';
        errorCVC.style.display = 'block';
        inputCVC.style.borderColor = 'red';
        let err = 'an error occured';
        if (inputCVC.value.match(/[A-Z]/i)){
            err = `CVC must not be filled with an alphanumeric value!`;
        }
         else if(Number(inputCVC.value) > 999){
            err = 'CVC must not be greater than 999'; 
         }
        errorCVC.innerText = err;
        return false;
    }
}