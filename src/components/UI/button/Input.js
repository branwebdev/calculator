import React from "react";
import classes from './Input.module.css';

const Input = props => {

    let callabel = props.buttonContent === "AC" || props.buttonContent === "+/-" ? classes.buttonlabelAC +" " +classes.buttonlabel : classes.buttonlabel;    
    callabel = props.buttonContent === "0" ? callabel + " " +classes.zerobuttonlabel : callabel;
    let calbutton = props.buttonContent === "0" ? classes.calbutton + " " + classes.zerobutton : classes.calbutton;

    return (
        <>
            <label htmlFor={props.buttonContent} className={callabel}>{props.buttonContent}</label>
            <input type="button" value={props.buttonContent} onClick={props.onClick} className={calbutton} id={props.buttonContent}/>      
        </>  
    );
};

export default Input;