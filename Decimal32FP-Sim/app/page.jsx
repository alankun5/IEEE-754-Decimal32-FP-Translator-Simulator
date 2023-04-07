"use client"
import { TextField, Box, Button, Typography, Switch, Container, Grid } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import AdbIcon from '@mui/icons-material/Adb';

export default function TestPage() {
    const [value, setValue] = useState("");
    const [point, togglePoint] = useState(Boolean);
    const [result, setResult] = useState("");

    // For binary input
    const [sign, setSign] = useState("");
    const [exponent, setExponent] = useState("");
    const [mantissa, setMantissa] = useState("");
  
    const handleInputChange = (e) => {
      if (e.target.validity.valid)
        setValue(e.target.value);
      else
        return false;
    };

    const handleTogglePoint = (prevPoint) => {
      togglePoint(prevPoint => !prevPoint);
    };

    const handleHexClick = () => {
      const convertedDec = convertHex(value); 
      console.log("Converted Dec: " + convertedDec.toString());
      setResult(convertedDec.toString());
    };

    const handleBinaryClick = () => {
      const convertedDec = convertBinary(value); 
      console.log("Converted Dec: " + convertedDec.toString());
      setResult(convertedDec.toString());
    };

    const handleCopyClick = () => {
      navigator.clipboard.writeText(result);
    };

    const handleSaveClick = () => {
      const blob = new Blob([result], {type: "text/plain;charset=utf-8"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dec32result.txt';
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 0);
    };
    
    const convertHex = (value) => {
        // Case: Input is HEX
        console.log("CASE HEX")
        console.log("Inputted value: " + value)
        // Check if valid input
        if (isValidHex(value))
          return convertHexToDecimal32(value)
        return "Invalid input."
    };

    const convertBinary = (value) => {
      // Case: Input is BINARY
      console.log("CASE BINARY")
      console.log("Inputted value: " + value)
      if(isValidBinary(value))
        return convertBinaryToDecimal32(value)  
      return "Invalid input."
    };

    return (
      <Box sx={{backgroundColor: 'white', color: 'black'}}>
        <Container>
          {/* <label htmlFor="text-input">Enter text:</label> */}
          {/* <input
            type="text"
            id="text-input"
            value={value}
            onChange={handleInputChange}
          /> */}
          <input type="range" min="0" max="1" step="1" onChange={handleTogglePoint} />
          <h5>{point ? 'Fixed Point' : 'Floating Point'}</h5>
          
          <br></br>

          <Grid container>
            <Grid item xs={12}>
              <Typography variant='h5'>Hex Input</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Hexadecimal' 
                id='hex-input'
                value={value}
                onChange={handleInputChange}
                inputProps= {{ pattern: "[0-9A-Fa-f]*", /*maxLength: 8*/ }}
                />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleHexClick} variant='contained'>Convert Hex to Dec32</Button>
            </Grid>
          </Grid>

          <br></br>

          <Grid container onSubmit={handleBinaryClick}>
            <Grid item xs={12}>
              <Typography variant='h5'>Binary Input</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField 
                label='Sign' 
                defaultValue={0}
                inputProps = {{ pattern: "[01]", maxLength: 1 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                label='Exponent' 
                defaultValue={'00000000'}
                inputProps = {{ pattern: "[01]*", maxLength: 8 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Mantissa' 
                defaultValue={'00000000000000000000000'}
                inputProps = {{ pattern: "[01]*", maxLength: 23 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' onClick={handleBinaryClick}>Convert Binary to Dec32</Button>
            </Grid>
          </Grid>

          <br></br>
          {/* 
          <button onClick={handleHexClick}>Convert Hex to Dec32</button>
          <button onClick={handleBinaryClick}>Convert Binary to Dec32</button> 
          */}
          {result && <h5>Dec 32 Equivalent: {result}</h5>}
          <br></br>
          <button onClick={handleCopyClick}>Copy Result to Clipboard</button>
          <button onClick={handleSaveClick}>Save Result as Text File</button>
        </Container>
      </Box>
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

// Param: (Number or String) max 4-bit binary
// Returns: (String) BCD digit
function convertBCDToDecimal(bcd) {
  bcd = (bcd.toString()).padStart(4, "0");
  bcd = bcd.split('').reverse().join('')
  var decimal = 0
  
  for(let i = 0; i < bcd.length; i++) {
    if(bcd[i] == 1) {
    	decimal = decimal + 2**i;
    }
  }
  
  return decimal;
}

function convertBinaryToDecimal(binary) {
  let decimal = 0;
  const binaryLength = binary.length;

  // Loop through each character in the binary string
  for (let i = 0; i < binaryLength; i++) {
    // Check if the character is '1', add the appropriate power of 2 to decimal
    if (binary[binaryLength - i - 1] === '1') {
      decimal += Math.pow(2, i);
    }
  }

  return decimal;
}

function convertBinaryToDecimal32(binary) { // returns final IEEE-754 Decimal-32 value
  // IEEE-754 Decimal-32 format requires 32 bits to be valid
  binary = binary.padStart(32, "0");

  // Splitting binary input
  const a = binary[0]; // Sign bit
  const b = binary.slice(1, 6); // exponent + MSD
  const c = binary.slice(6, 12); // Remaining exponent
  const d = binary.slice(12); // Remaning mantissa in BCD

  // Finding decimal exponent
  let decimalExponent;
  let firstDigit;
  if (b === "11111") {
    // Case 1: Special case - all bits of "b" are 1s
    return "NaN";
  } else if (b === "11110") {
    // Case 2: Special case - first 4 bits of "b" are 1s
    return "Infinity";
  } else if (b.startsWith("11")) {
    // Case 3: First 2 bits of "b" are 1s
    decimalExponent = b.slice(2, 4); // b's 3rd and 4th bit

    // Get the first digit of the decimal32
    firstDigit = (convertBCDToDecimal(b % 10) + 8).toString();
  } else {
    // Case 4: First 2 bits of "b" are not 1s
    decimalExponent = b.slice(0, 2); // b's 1st and 2nd bit

    // Get the first digit of the decimal32
    firstDigit = (convertBCDToDecimal((b.toString()).slice(b.length - 3, b.length))).toString();
  }

  // Combining bits for decimal exponent
  decimalExponent = (convertBinaryToDecimal(decimalExponent.concat(c)) - 101).toString();

  // Getting the remaining digits of mantissa
  var remainingDigits = "";
  var sliceRanges = [
    [0, 3],
    [3, 6],
    [6, 10],
    [10, 13],
    [13, 16],
    [16, 20]
  ];

  for (var i = 0; i < sliceRanges.length; i++) {
    var bcd = d.slice(sliceRanges[i][0], sliceRanges[i][1]);
    var tempDecimal = convertBCDToDecimal(bcd);
    remainingDigits = remainingDigits.concat(tempDecimal.toString());
  }

  // Combining digits for mantissa
  const mantissa = (firstDigit.concat(remainingDigits)).padStart(7, "0");

  // Combining the mantissa and decimal exponent, and making it negative depending on the sign bit
  const decimal = a === "1" ? -mantissa : mantissa;

  return [decimal, decimalExponent];
}
  