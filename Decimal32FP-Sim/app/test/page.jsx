"use client"
import { TextField, Box, Button, Typography, Switch } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import AdbIcon from '@mui/icons-material/Adb';

export default function TestPage() {
    /* 
    This is generally how a React useState is used. It takes two parameters:
        value - the value of the state, in this case it is default to 0
        setValue - is a function. we use setValue to change the value.

    You can name this whatever you want, but it is generally good practice
    to call it "variable" and "setVariable"
    */
    const [value, setValue] = useState(0)

    /* 
    useEffect takes two parameters, the first is a function and the
    second is an array of values that it will watch for "changes".

    Basically what useEffect does is it detects "changes" in the application
    and it runs whatever is inside the function when it detects a change
    */
    useEffect(() => {
        console.log("Value has changed to: ", value);
    }, [value])

    const handleClick = () => {
        setValue(value + 1);
    }

    const handleChange = () => {
        console.log("Switch has been toggled");
    }

    /*
    Place things inside the return statement that we want to see rendered
    in the webpage.

    The green tags here are called components. 

    You can check out other Components you might take an interest in
    from the Material UI Docs: https://mui.com/material-ui/getting-started/overview/
    */
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
            <Button onClick={handleClick}>Click Me!</Button>
            <TextField label="I am MUI TextField" />
            <Switch onChange={handleChange} />
            <AdbIcon />
        </Box>
    )
}