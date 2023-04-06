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
  
    const handleHexClick = () => {
      const convertedDec = convertHex(value); 
      setResult(convertedDec.toString());
    };

    const handleBinaryClick = () => {
      const convertedDec = convertBinary(value); 
      setResult(convertedDec.toString());
    };
  
    const convertHex = (value) => {
        // Case: Input is HEX
        console.log("CASE HEX")
        console.log("Inputted value:" + value)
        // Check if valid input
        if (isValidHex(value))
          return convertHexToDecimal32(value)
        else return false
    };

    const convertBinary = (value) => {
      // Case: Input is BINARY
      console.log("CASE BINARY")
      console.log("Inputted value:" + value)
      if(isValidBinary(value))
        return convertBinaryToDecimal32(value)  
      else return false
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
        TODO: Have two useEffects, one for hex box input and one for binary box input
        <button onClick={handleClick}>Convert</button>
        {result && <h5>Dec 32 Equivalent: {result}</h5>}
      </div>
    );
}

function isValidHex(input) {
  if (/^[0-9A-Fa-f]+$/.test(input.trim()))
    return true;
  return false;
}

function isValidBinary(input) {
  if (/^[01]+$/.test(input.trim()))
    return true;
  return false;
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
    }
  }

  // Return the decimal value
  return decimal;
}

function convertDecimalToBinary(decimal) {
  // Edge case for 0
  if (decimal === 0) {
    return "0".padStart(32, "0");
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

  // Pad the binary representation with leading zeros to make it 32-bits
  binary = binary.padStart(32, "0");

  // Return the binary representation
  return binary;
}

function convertHexToDecimal32(hex) {
  // hex --> decimal
  const decimal = hexToDecimal(hex);
  // decimal --> binary
  const binary = convertDecimalToBinary(decimal);
  // binary --> decimal32
  return convertBinaryToDecimal32(binary);
}

function convertBinaryToDecimal32(binary) { // returns final IEEE-754 Decimal-32 value
  // IEEE-754 Decimal-32 format requires 32 bits to be valid
  binary = binary.padStart(32, "0");

  // Extract the sign, exponent, and mantissa bits from the binary string
  const signBit = binary[0] === '1' ? -1 : 1;
  const exponentBits = binary.slice(1, 9);
  const mantissaBits = binary.slice(9);

  // Convert the exponent bits from binary to decimal
  const exponent = parseInt(exponentBits, 2) - 127; // TODO: DO THIS MANUALLY

  // Handle special cases based on the exponent bits
  if (exponent === -127) {
    // Denormalized number (exponent = -127)
    const mantissa = parseInt(mantissaBits, 2) / Math.pow(2, 23); // TODO: Do this manually
    return signBit * mantissa * Math.pow(2, -126);
  } else if (exponent === 128) {
    // Infinity or NaN (exponent = 128)
    if (mantissaBits === '00000000000000000000000') {
      return signBit === 1 ? Infinity : -Infinity;
    } else {
      return NaN;
    }
  } else {
    // Normalized number
    const mantissa = 1 + parseInt(mantissaBits, 2) / Math.pow(2, 23); // TODO: Do this manually
    return signBit * mantissa * Math.pow(2, exponent);
  }
}
  
