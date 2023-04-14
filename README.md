# IEEE-754-Decimal32-FP-Translator-Simulator
This Program converts hexadecimal or binary inputs into an IEEE-754 32-bit Decimal. 

The program will detect any wrong inputs and will display an appropriate message accordingly.

The results of the conversion can be shown either in a Floating Point or a Fixed Point format. Use the circular switch shown below to toggle between floating point or fixed point representation.

![image](https://user-images.githubusercontent.com/104754302/231960331-a71b5a57-da76-42b4-8d15-205271d2f90b.png)

You also have the option to copy the result onto your clipboard or export it as a standard text file. 

Input fields are strict with the amount of digits they can and will accept. See more details below for the accepted types of input.

## Hexadecimal to Decimal32 Convertion
Hexadecimal inputs only accept 8 characters. (You may not represent 0x0000000A  nor 0xA0000000 as A. You will need to append additional zeroes yourself in the dialogue). The hex input field will automatically stop you from entering any more characters greater than 8 and does not allow you from entering any values beyond [0-9,A-F].

![image](https://user-images.githubusercontent.com/104754302/231958928-e323da27-0051-4cc4-8d43-fd32471152bd.png)


## Binary to Decimal32 Conversion
Binary inputs are divided into four (4) different inputs: Sign bit, Combination bits, Exponent continuation bits, and Coefficient continuation bits. All input boxes should be filled up to the appropriate number of binary digits. The input fields will also automatically stop you from entering any digits beyond the accepted threshold. For reference:

- Sign: 1 bit
- Combination: 5 bits
- Exponent continuation: 6 bits
- Coefficient continuation: 23 bits

![image](https://user-images.githubusercontent.com/104754302/231959252-86600630-bf89-4ecb-a37f-aa710773d500.png)

## Program Samples
Hexadecimal to Decimal32
![image](https://user-images.githubusercontent.com/104754302/231959569-64dec940-c1c7-48d2-ad2b-ce8d51350e9f.png)

Binary to Decimal32
![image](https://user-images.githubusercontent.com/104754302/231960163-f5c52d43-57b2-472a-b9d2-b9a028e351bf.png)

---
## Dev Notes

**Running the Project**

*note: clone this project first on your machine before doing the following steps*
1. On your terminal, do > `cd Decimal32FP-Sim`
2. also do > `npm install`
3. then to run app on dev server > `npm run dev`  
4. You should see app running on localhost:3000
