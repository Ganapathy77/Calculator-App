const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.content .input');
const display_output = document.querySelector('.content .output');

let input = "";

for (let key of keys) {

    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if (value == 'clear') {
            input = "";
            display_input.innerHTML = input;
            display_output.innerHTML = input;
        }
        else if (value == '=') {
            let result = eval(prepareInput(input))
            display_output.innerHTML = cleanOutput(result)
        }
        else if (value == 'backSpace') {
            input = input.slice(0, -1);
                display_input.innerHTML = cleanInput(input)
        }
        else if (value == 'brackets') {
            if (input.indexOf('(') == -1 || input.indexOf('(') != -1 && input.indexOf(')') != -1 && input.lastIndexOf('(') < input.lastIndexOf(')') && (input.slice(-1)[0] != '(' && input.slice(-1)[0] != ')')) {
                input += '(';
                display_input.innerHTML = input
            } else if (input.indexOf('(') != -1 && input.indexOf(')') == -1 && (input.slice(-1)[0] != '(' && input.slice(-1)[0] != ')') || input.indexOf(')') != -1 && input.lastIndexOf('(') > input.lastIndexOf(')')) {
                input += ')'
                display_input.innerHTML = cleanInput(input);
            }
        }
        else {
            if (validate(value)) {
                input += value;
                display_input.innerHTML = cleanInput(input);
            }
        }
    })
}

function cleanInput(input) {
    let input_arr = input.split("")

    for (let i = 0; i < input_arr.length; i++) {
        if (input_arr[i] == '*') {
            input_arr[i] = ` <span class="operator">x</span> `
        }
        else if (input_arr[i] == '÷') {
            input_arr[i] = ` <span class="operator">÷</span> `
        }
        else if (input_arr[i] == '+') {
            input_arr[i] = ` <span class="operator">+</span> `
        }
        else if (input_arr[i] == '-') {
            input_arr[i] = ` <span class="operator">_</span> `
        }
        else if (input_arr[i] == '(') {
            input_arr[i] = `<span class="brackets">(</span>`
        }
        else if (input_arr[i] == ')') {
            input_arr[i] = `<span class="brackets">)</span>`
        }
        else if (input_arr[i] == '%') {
            input_arr[i] = `<span class="brackets">%</span>`
        }
    }
    return input_arr.join("")
}

function cleanOutput(output) {
    let output_str = output.toString();
    let decimal = output_str.split(".")[1];
    output_str = output_str.split(".")[0];

    let output_arr = output_str.split("");
    if (output_arr.length > 3) {
        for (let i = output_arr.length - 3; i > 0; i -= 3) {
            output_arr.splice(i, 0, ',');
        }
    }

    if (decimal) {
        output_arr.push('.');
        output_arr.push(decimal);
    }

    return output_arr.join("");
}

function validate(value){
    let last_value = input.slice(-1);

    let operators = ['+', '-', '*', '/'];
    if(value == '.' && last_value == '.'){
        return false
    }
    if(operators.includes(value)){
        if(operators.includes(last_value)){
            return false
        }
        else{
            return true
        }
    }
    if(value =='%' && last_value=='%'){return false}
    return true
}

function prepareInput(input) {
    let input_array = input.split("");

    for (let i = 0; i < input_array.length; i++) {
        if (input_array[i] == "%") {
            input_array[i] = "/100";
        }
    }

    return input_array.join("");
}