# 1. Accept user input (and convert it from a string to a number)
celsius = float(input("Enter temperature in Celsius: "))

# 2. Convert Celsius to Fahrenheit using the formula: (C * 9/5) + 32
fahrenheit = (celsius * 9 / 5) + 32

# 3. Print the result
print(f"{celsius}°C is equal to {fahrenheit}°F")