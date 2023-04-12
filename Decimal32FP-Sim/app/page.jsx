"use client"
import { TextField, Box, Button, Typography, Switch, Container, Grid, Slider } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';

const specialCases = [
  "Infinity",
  "NaN",
  "-Infinity"
]

export default function TestPage() {
    const [point, togglePoint] = useState(false); // false: Floating Point, true: Fixed Point
    const [result, setResult] = useState(""); // Floating Point
    // experimental
    const [resultFixed, setResultFixed] = useState(""); // Fixed Point

    // For hex input
    const [value, setValue] = useState("");

    // For binary input
    const [sign, setSign] = useState("0");
    const [combination, setCombination] = useState("00000");
    const [exponent, setExponent] = useState("000000");
    const [coefficient, setCoefficient] = useState("00000000000000000000");

    // When Floating Point result is updated, update Fixed Point result as well.
    useEffect(() => {
      /* Perform necessary Calculations */
      // const convertedDec = convertHex(value);
      // if (!Number.isNaN(convertedDec) && !(convertedDec === "Invalid input.") && !(convertedDec === "Infinity") && !(convertedDec === "-Infinity") && !(convertedDec === "NaN")) 
      //   setResultFixed((Number(convertedDec[0]) * (Math.pow(10, Number(convertedDec[1])))).toString());
      // else if (convertedDec === "Invalid input." || convertedDec === "Infinity" || convertedDec === "-Infinity" || convertedDec === "NaN") 
      //   setResultFixed(convertedDec);
      // else
      //   setResultFixed("No output.")

      //console.log("debug_result: ", result[0]);
      if (!Number.isNaN(result) && !(specialCases.includes(result))) 
        setResultFixed((Number(result[0]) * (Math.pow(10, Number(result[1])))).toString());
      else if (specialCases.includes(result) || result === "Invalid input.") 
        setResultFixed(result);
      else
        setResultFixed("No output.");
    }, [result])
  
    const handleInputChange = (e) => {
      if (e.target.validity.valid)
        setValue(e.target.value);
      else
        return false;
    };

    const handleTogglePoint = (prevPoint) => {
      togglePoint(prevPoint => !prevPoint);
      // const convertedDec = convertHex(value); 

      // if (!point && !(convertedDec instanceof String))
      //   setResult((Number(convertedDec[0]) * (Math.pow(10, Number(convertedDec[1])))).toString());
      // else if (convertedDec === "Invalid input." || convertedDec === "Infinity" || convertedDec === "-Infinity" || convertedDec === "NaN")
      //   setResult(convertedDec);
      // else
      //   setResult(convertedDec[0] + " x 10^" + convertedDec[1]);
    };

    const handleHexClick = () => {
      const convertedDec = convertHex(value); 
      console.log("Converted Dec: " + convertedDec.toString());
      if (convertedDec.toString() === "Invalid input.")
        alert("Invalid input.");
      else if (convertedDec.toString() === "Infinity" || convertedDec.toString() === "-Infinity" || convertedDec.toString() === "NaN") {
        setResult(convertedDec.toString());
      }
      else
      {
        // if (point)
        //   setResult((Number(convertedDec[0]) * (Math.pow(10, Number(convertedDec[1])))).toString());
        // else
        //   setResult(convertedDec[0] + " x 10^" + convertedDec[1]);
        setResult(convertedDec[0] + " x 10^" + convertedDec[1]);
        setResultFixed((Number(convertedDec[0]) * (Math.pow(10, Number(convertedDec[1])))).toString());
      }
    };

    const handleBinaryClick = () => {
      let value = sign + combination + exponent + coefficient;
      console.log("handleBinaryClick: " + value)

      const convertedDec = convertBinary(value);

      console.log("convertedDecimal: " + convertedDec.toString());

      if (convertedDec.toString() === "Invalid input.") {
        alert("Invalid input.");
      }
      else if (specialCases.includes(convertedDec.toString())) {
        setResult(convertedDec.toString());
        setResultFixed(convertedDec.toString());
      }
      else
      {
        setResult(convertedDec[0] + " x 10^" + convertedDec[1]);
        setResultFixed((Number(convertedDec[0]) * (Math.pow(10, Number(convertedDec[1])))).toString());
      }
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
      //console.log("CASE BINARY")
      //console.log("Inputted value: " + value)
      if(isValidBinary(value))
        return convertBinaryToDecimal32(value)  
      return "Invalid input."
    };

    return (
      <Box sx={{backgroundColor: 'white', color: 'black'}}>
        <Container
          sx={{
            backgroundColor: 'lightblue',
          }}
        >
          {/* Container for inputs */}
          <div
            style={{
              backgroundColor: 'pink',
              width: 500,
            }}
          >
            <Grid container 
              sx={{
                bgcolor: 'pink',
              }}
            >
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

            <Grid container>
              <Grid item xs={12}>
                <Typography variant='h5'>
                  Binary Input
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label='Sign' 
                  defaultValue={'0'}
                  inputProps = {{ pattern: "[01]", maxLength: 1 }}
                  onChange={e => setSign(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label='Combination' 
                  defaultValue={'00000'}
                  inputProps = {{ pattern: "[01]*", maxLength: 5 }}
                  onChange={e => setCombination(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label='Exponent Continuation' 
                  defaultValue={'000000'}
                  inputProps = {{ pattern: "[01]*", maxLength: 6 }}
                  onChange={e => setExponent(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label='Coefficient Continuation' 
                  defaultValue={'00000000000000000000'}
                  inputProps = {{ pattern: "[01]*", maxLength: 20 }}
                  onChange={e => setCoefficient(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  type='submit' 
                  variant='contained' 
                  onClick={handleBinaryClick}
                >
                  Convert Binary to Dec32
                </Button>
              </Grid>
            </Grid>
          </div>

          {/* Result Toggle Filter */}
          {/* <input type="range" min="0" max="1" step="1" onChange={handleTogglePoint} /> */}
          <Switch 
            checked={point}
            onChange={handleTogglePoint}
          />
          <h5>{point ? 'Fixed Point' : 'Floating Point'}</h5>
          
          {/* Container for results */}
          <div
            style={{
              backgroundColor: 'orange',
              display: 'inline-block',
              width: 500,
              height: 250,
            }}
          >
            <Typography variant='h5'>Result</Typography>
            {/* {result && <h5>Dec 32 Equivalent: {result}</h5>} */}
            {
              (result && point) ? 
                <Typography>{resultFixed}</Typography>
              : (result && !point) ?
                <Typography>{result}</Typography>
              : <Typography>No output.</Typography>
            }
          </div>

          <br></br>
          
          <button onClick={handleHexClick}>Convert Hex to Dec32</button>
          <button onClick={handleBinaryClick}>Convert Binary to Dec32</button> 
        
          <br></br>

          <button onClick={handleCopyClick}>Copy Result to Clipboard</button>
          <button onClick={handleSaveClick}>Save Result as Text File</button>
        </Container>
      </Box>
    );
}

function isValidHex(input) {
  if (/^[0-9A-Fa-f]+$/.test(input.trim()) && input.length <= 8)
    return true;
  return false;
}

function isValidBinary(input) {
  if (/^[01]+$/.test(input.trim()))
    return true;
  return false;
}

function hexToDecimal(hex) {  
  // Pad 0's to make hex input 8 characters long
  hex = hex.padStart(8, "0");

  // Define a dictionary to map hexadecimal digits to their decimal values
  const hexDigits = "0123456789ABCDEF";
  const hexDict = {};
  for (let i = 0; i < hexDigits.length; i++) {
    hexDict[hexDigits[i]] = i;
  }

  // Convert the hexadecimal string to uppercase for consistency
  hex = hex.toUpperCase();
  console.log("Hex value: " + hex);

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
  const signBit = binary[0]; // Sign bit
  const combinationBits = binary.slice(1, 6); // exponent + MSD
  const exponentBits = binary.slice(6, 12); // Remaining exponent
  const coefficientBits = binary.slice(12); // Remaning mantissa in Packed BCD

  console.log('signBit: ' + signBit);
  console.log('combinationBits: ' + combinationBits);
  console.log('exponentBits: ' + exponentBits);
  console.log('coefficientBits: ' + coefficientBits);

  // Finding decimal exponent
  let decimalExponent;
  let firstDigit;
  if (combinationBits === "11111") {
    // Case 1: Special case - all bits of "b" are 1s
    return "NaN";
  } else if (combinationBits === "11110") {
    // Case 2: Special case - first 4 bits of "b" are 1s
    return signBit === "1" ? "-Infinity" : "Infinity";
  } else if (combinationBits.startsWith("11")) {
    // Case 3: First 2 bits of "b" are 1s
    decimalExponent = combinationBits.slice(2, 4); // b's 3rd and 4th bit

    // Get the first digit of the decimal32
    firstDigit = (convertBCDToDecimal(combinationBits % 10) + 8).toString();
  } else {
    // Case 4: First 2 bits of "b" are not 1s
    decimalExponent = combinationBits.slice(0, 2); // b's 1st and 2nd bit

    // Get the first digit of the decimal32
    firstDigit = (convertBCDToDecimal((combinationBits.toString()).slice(combinationBits.length - 3, combinationBits.length))).toString();
  }

  // Combining bits for decimal exponent
  decimalExponent = (convertBinaryToDecimal(decimalExponent.concat(exponentBits)) - 101).toString();

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
    var bcd = coefficientBits.slice(sliceRanges[i][0], sliceRanges[i][1]);
    var tempDecimal = convertBCDToDecimal(bcd);
    remainingDigits = remainingDigits.concat(tempDecimal.toString());
  }

  // Combining digits for mantissa
  var mantissa;
  if (firstDigit === "0") {
    mantissa = remainingDigits
  } else {
    mantissa = firstDigit.concat(remainingDigits);
  }

  console.log('mantissa: ' + mantissa);

  // Combining the mantissa and decimal exponent, and making it negative depending on the sign bit
  const decimal = signBit === "1" ? -mantissa : mantissa;

  console.log('decimal: ' + decimal);

  return [decimal.toString().padStart(7, '0'), decimalExponent];
}
  