$(document).ready(function(){
    var equation = "";
    var display = "";
    console.log("connected");

    $("button").click(function(){
        console.log($(this).val());
        if(equation.length < 14 || $(this).val() === "ac"){
            switch ($(this).val()){
                case "ac": equation = ""; display = "";
                break;
                case "*": equation += '~&times~'; display += '&times';
                break;
                case "/": equation += '~&divide~'; display += '&divide';
                break;
                case "+": equation += '~+~'; display += '+';
                break;
                case "-": equation += '~-~'; display += '-';
                break;
                case ".": equation += '.'; display += '.';
                break;
                case "=": calculate();
                break;
                default: equation += $(this).val(); display += $(this).val();
            }
            $("#screen").html(display);
        }        
    });

    function calculate(){

        var elements = equation.split("~");
        
        function orderOperations(op1, op2){
            var i = 0;
            while(elements.includes(op1) || elements.includes(op2)){                
                if(elements[i] === op1 && op1 === "&times" || elements[i] === op2 && op2 === "&divide"){
                    switch (elements[i]){
                        case op1: elements[i] = elements[i-1] * elements[i+1];
                        elements.splice(i-1, 1);
                        elements.splice(i, 1);
                        console.log(elements);
                        i=0;
                        break;
                        case op2: elements[i]= elements[i-1] / elements[i+1];
                        elements.splice(i-1, 1);
                        elements.splice(i, 1);
                        console.log(elements);
                        i=0;                      
                        break;
                    }
                }else if(elements[i] === op1 && op1 === "+" || elements[i] === op2 && op2 === "-"){
                    switch (elements[i]){
                        //This is a comment
                        //This is another comment
                        case op1: elements[i] = parseInt(elements[i-1]) + parseInt(elements[i+1]);
                        elements.splice(i-1, 1);
                        elements.splice(i, 1);
                        console.log(elements);
                        i=0;
                        break;
                        case op2: elements[i]= parseInt(elements[i-1]) - parseInt(elements[i+1]);
                        elements.splice(i-1, 1);
                        elements.splice(i, 1);
                        console.log(elements);
                        i=0                     
                        break;
                    }
                }
                i++;
                if(i>elements.length){
                    i=0;
                }
            }
        }
        orderOperations("&times", "&divide");
        orderOperations("+", "-");
        //debugger;
        if(elements[0].toString().length > 14){
            display = parseFloat(elements[0].toString().slice(0, 14));
            equation = display;
        }else{
            display = elements[0];        
            equation = elements[0];
        }
        $(this).css("border-bottom", "5px solid");
    }
});
