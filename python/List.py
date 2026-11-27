fruits = ["apple", "banana", "orange"]
fruits.append("grape")
fruits.insert(1, "mango")
fruits.remove("apple")
print(fruits) #['mango', 'banana', 'orange', 'grape']
print(fruits[0]) #mango
print(fruits[-1]) #grape

numbers = [3, 1, 4, 1, 5, 9, 2]
numbers.sort()
print(numbers) #[1, 1, 2, 3, 4, 5, 9]
numbers.reverse()
print(numbers.count(1)) #2
print(numbers.index(1)) #5

todos = []
todos.append("Buy groceries")
todos.append("Clean the house")
todos.append("Pay bills")
print("To-Do List:")
for index, task in enumerate(todos, 1):
    print(f"{index}. {task}")