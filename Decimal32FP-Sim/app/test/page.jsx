"use client"
import { TextField, Box, Button, Typography, Switch } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import AdbIcon from '@mui/icons-material/Adb';

export default function TestPage() {
    /*
    /* 
    This is generally how a React useState is used. It takes two parameters:
        value - the value of the state, in this case it is default to 0
        setValue - is a function. we use setValue to change the value.

    You can name this whatever you want, but it is generally good practice
    to call it "variable" and "setVariable"
    
    const [value, setValue] = useState(0)

    /* 
    useEffect takes two parameters, the first is a function and the
    second is an array of values that it will watch for "changes".

    Basically what useEffect does is it detects "changes" in the application
    and it runs whatever is inside the function when it detects a change.
    
    useEffect(() => {
        console.log("Value has changed to: ", value);
    }, [value])

    const handleClick = () => {
        setValue(value + 1);
    }

    const handleChange = () => {
        console.log("Switch has been toggled");
    }

    const convertToDecimal32 = () => {
        console.log("tite");

    }

    /*
    Place things inside the return statement that we want to see rendered
    in the webpage.

    The green tags here are called components. 

    You can check out other Components you might take an interest in
    from the Material UI Docs: https://mui.com/material-ui/getting-started/overview/
    
    return(
        <Box
            sx={{
                display: "flex-box",
                backgroundColor: "white",
                color: "black",
            }}
        >
            <Typography variant='h5'>This is a Test Page</Typography>
            <h5>normal H5</h5>
            <p>Value: {value}</p>
            <Button onClick={ handleClick }>Convert</Button>
            <TextField id="input" label="I am MUI TextField" placeholder='Type value here...' />
            {result && <h5>Capitalised text: {result}</h5>}

            <Switch onChange={handleChange} />
            <AdbIcon />
        </Box>
    )
    */
    const [value, setValue] = useState("");
    const [result, setResult] = useState("");
  
    const handleInputChange = (e) => {
      setValue(e.target.value);
    };
  
    const handleClick = () => {
      const convertedDec = convert(value);
      setResult(convertedDec.toString());
    };
  
    const convert = (value) => {

        // Convert the value to a 32-bit float
        // This is the function that will be used to convert the value
        // to a 32-bit float.
        // This function will be called when the user presses the "Convert" button
        // and the value in the text field is passed in as the parameter "value"
          // Convert hex string to a 32-bit signed integer using Int32Array
        const int = new Int32Array([parseInt(value, 16)])[0];

        // Convert the 32-bit signed integer to a 32-bit floating point decimal using Float32Array
        const float = new Float32Array([int])[0];

        return float;

    };
  
    return (
      <div>
        <label htmlFor="text-input">Enter text:</label>
        <input
          type="text"
          id="text-input"
          value={value}
          onChange={handleInputChange}
        />
        <button onClick={handleClick}>Convert</button>
        {result && <h5>Dec 32 Equivalent: {result}</h5>}
      </div>
    );
}

function convertToDecimal32(value) {
    // Convert the value to a 32-bit float
    // This is the function that will be used to convert the value
    // to a 32-bit float.
    // This function will be called when the user presses the "Convert" button
    // and the value in the text field is passed in as the parameter "value"
    
    console.log("Value: ", value);
}