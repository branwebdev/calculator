import React, {useState} from "react";
import Input from "./UI/button/Input";
import Display from "./UI/display/Display";
import classes from './Form.module.css';

const Form = props => {

    const firstRow = ["AC", "+/-", "%", "/"];                             
    const secondRow = ["7", "8", "9", "*"];
    const thirdRow = ["4", "5", "6", "-"];
    const fourthRow = ["1", "2", "3", "+"];
    const fifthRow = ["0", ".", "="];

    const [content, setContent] = useState({num: "", secondnum: "", op: ""});

    let isOperator = (potentialOperator) => {

        switch(potentialOperator)
        {
            case "AC":
                setContent(prev => (
                    {...prev, num: "", secondnum: "", op: ""}
                ));
                return false;
            case "+/-":
                setContent(prev => (
                    {...prev, num: content.num*-1}
                ));
                return false;
            case "%":
                setContent(prev => (
                    {...prev, num: content.num/100}
                ));
                return false;
            case ".":
                if(content.op && content.secondnum === "")
                {
                    setContent(prev => (
                        {...prev, secondnum: "0"+potentialOperator               
                    }));
                }
                else if(content.op && !content.secondnum.includes("."))
                {
                    setContent(prev => (
                        {...prev, secondnum: content.secondnum.concat(potentialOperator)                    
                    }));
                }
                else if(content.op && content.secondnum.includes(".")){} //prevent adding more than one decimal point in the second number
                else
                {
                    if(content.num === "")
                    {
                        setContent(prev => (
                            {...prev, num: "0"+potentialOperator               
                        }));
                    }
                    else if(!content.num.includes("."))
                    {
                        setContent(prev => (
                            {...prev, num: content.num.concat(potentialOperator)               
                        }));
                    }
                    else{} //prevent adding more than one decimal point in the second number                
                }
                return false;
            default: //operator
                return true;
        }
    };

    const onClickHandler = e => {
        e.preventDefault();

        let value = e.target.value;

        //if it is a number then add typed number
        if(!isNaN(value)){

            if(content.num.length !== 0 && content.op.length !== 0) //if first number and operator is placed but second number is missing then add second number
            {
                if(content.secondnum.length !== 0)
                {
                    value = content.secondnum.concat(value);
                }

                setContent(prev => (
                    {...prev, secondnum: value}
                ));
            }
            else
            {
                //if number is already typed then append existing number to new number.                
                if(content.num.length !== 0)
                {
                    value = content.num.concat(value);
                }

                setContent(prev => (
                    {...prev, num: value}
                ));
            }
        }
        else //if not a number then add typed operator
        {
            if(isOperator(value))
            {
                if(content.num.length !== 0 && content.secondnum.length !== 0 && content.op.length !== 0)//if state is full then do a calculation
                {
                    value = value !== "=" ? value : "";

                    switch(content.op) //
                    {
                        case "/":
                            setContent({num: parseFloat((parseFloat(content.num)/parseFloat(content.secondnum)).toFixed(2)), secondnum: "", op: value});
                            break;
                        case "*":
                            setContent({num: parseFloat((parseFloat(content.num)*parseFloat(content.secondnum)).toFixed(2)), secondnum: "", op: value});
                            break;
                        case "-":
                            setContent({num: parseFloat((parseFloat(content.num)-parseFloat(content.secondnum)).toFixed(2)), secondnum: "", op: value});
                            break;
                        case "+":
                            setContent({num: parseFloat((parseFloat(content.num)+parseFloat(content.secondnum)).toFixed(2)), secondnum: "", op: value});
                            break;
                        default:
                    }              
                }
                else
                {
                    if(content.op !== value){
                        setContent(prev => ({...prev, op: value}));
                    }
                }
            }
        }        
    };

    const buttonsFirstRow = firstRow.map(bc => <Input buttonContent={bc} key={bc} onClick={onClickHandler}/>);
    const buttonsSecondRow = secondRow.map(bc => <Input buttonContent={bc} key={bc} onClick={onClickHandler}/>);
    const buttonsThirdRow = thirdRow.map(bc => <Input buttonContent={bc} key={bc} onClick={onClickHandler}/>);
    const buttonsFourthRow = fourthRow.map(bc => <Input buttonContent={bc} key={bc} onClick={onClickHandler}/>);
    const buttonsFifthRow = fifthRow.map(bc => <Input buttonContent={bc} key={bc} onClick={onClickHandler}/>);

    return (
        <div className={classes.display}>
            <Display display = {content}/>
            <div className={classes.buttonrow}>
                {buttonsFirstRow}
            </div>
            <div className={classes.buttonrow}>
                {buttonsSecondRow}
            </div>
            <div className={classes.buttonrow}>
                {buttonsThirdRow}
            </div>
            <div className={classes.buttonrow}>
                {buttonsFourthRow}
            </div>
            <div className={classes.buttonrow}>
                {buttonsFifthRow}
            </div>
        </div>
    );

};

export default Form;