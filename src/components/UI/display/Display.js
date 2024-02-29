import React from "react";
import classes from './Display.module.css';

const Display = props => {

    let result = props.display.secondnum ? props.display.secondnum : props.display.num;

    return (
        <div>
            <input type="text" disabled value={result} className={classes.display}/>
        </div>
    );
};

export default Display;