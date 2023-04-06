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
        // TODO: Make check which case the input is in. HEX --> DEC OR BINARY --> DEC
        // One way to check is to append 0x if the hex box is the one passed and check for "0x"
        // Case: Input is HEX
        console.log("Inputted value:" + parseInt(value, 16))
        value = parseInt(value, 16)
        final = convertHexToDecimal32(value)
        return final

        // Case: Input is BINARY
        console.log("CASE BINARY")
        final = convertBinaryToDecimal32(value)

        return final;

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

function hexToDecimal(hex) {
  // Define a dictionary to map hexadecimal digits to their decimal values
  const hexDigits = "0123456789ABCDEF";
  const hexDict = {};
  for (let i = 0; i < hexDigits.length; i++) {
    hexDict[hexDigits[i]] = i;
  }

  // Convert the hexadecimal string to uppercase for consistency
  hex = hex.toUpperCase();

  // Initialize the decimal value to 0
  let decimal = 0;

  // Loop through each character in the hexadecimal string
  for (let i = 0; i < hex.length; i++) {
    const digit = hex[i];
    // Check if the character is a valid hexadecimal digit
    if (hexDict.hasOwnProperty(digit)) {
      // Convert the hexadecimal digit to its decimal value and add it to the decimal value
      decimal = decimal * 16 + hexDict[digit];
    } else {
      // If the character is not a valid hexadecimal digit, throw an error
      throw new Error("Invalid hexadecimal digit: " + digit);
    }
  }

  // Return the decimal value
  return decimal;
}

function decimalToBinary(decimal) {
  // Check if the input is a valid positive integer
  if (!Number.isInteger(decimal) || decimal < 0) {
    throw new Error("Input must be a positive integer");
  }

  // Edge case for 0
  if (decimal === 0) {
    return "0";
  }

  // Initialize an empty string to store the binary representation
  let binary = "";

  // Keep dividing the decimal number by 2 until it becomes 0
  while (decimal > 0) {
    // If the decimal number is odd, add "1" to the binary representation
    // and subtract 1 to make it even for the next iteration
    if (decimal % 2 === 1) {
      binary = "1" + binary;
      decimal -= 1;
    }
    // If the decimal number is even, add "0" to the binary representation
    else {
      binary = "0" + binary;
    }
    decimal /= 2;
  }

  // Return the binary representation
  return binary;
}

function convertHexToDecimal32(hex) { // returns final IEEE-754 Decimal-32 value
  // convert hex to binary by [hex --> decimal --> binary]
  // convert hex to decimal
  const decimal = hexToDecimal(hex);
  // convert decimal to binary
  const binary = decimalToBinary(decimal);

  // since it's binary now, just call convertBinaryToDecimal32(value)
  return convertBinaryToDecimal32(binary);
}

function convertBinaryToDecimal32(value) {
    // Convert the value to a 32-bit float
    // This is the function that will be used to convert the value
    // to a 32-bit float.
    // This function will be called when the user presses the "Convert" button
    // and the value in the text field is passed in as the parameter "value"
    
    console.log("Decimal32 value is: ", value);
}
