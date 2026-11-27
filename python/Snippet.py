# Lists to store tasks
todo_list = []
completed_list = []

def display_lists():
    """Display both to-do and completed task lists with counts"""
    print("\n--- TO-DO LIST ---")
    if not todo_list:
        print("No pending tasks.")
    else:
        for i, task in enumerate(todo_list, 1):
            print(f"{i}. {task}")
    print(f"Total pending: {len(todo_list)}")

    print("\n--- COMPLETED LIST ---")
    if not completed_list:
        print("No completed tasks.")
    else:
        for i, task in enumerate(completed_list, 1):
            print(f"{i}. {task}")
    print(f"Total completed: {len(completed_list)}")

def add_task():
    """Ask user for a new task and add it to the to-do list"""
    task = input("\nEnter a new task: ")
    if task.strip():
        todo_list.append(task)
        print(f"Added '{task}' to your to-do list!")

def complete_task():
    """Mark a task as complete and move it to the completed list"""
    display_lists()
    if todo_list:
        try:
            choice = int(input("\nEnter task number to mark complete: "))
            if 1 <= choice <= len(todo_list):
                task = todo_list.pop(choice - 1)
                completed_list.append(task)
                print(f"Completed '{task}'!")
            else:
                print("Invalid task number.")
        except ValueError:
            print("Please enter a valid number.")

# Main program loop
running = True
while running:
    print("\n=== MENU ===")
    print("1. View Tasks")
    print("2. Add Task")
    print("3. Complete Task")
    print("4. Exit")
    
    choice = input("Choose an option (1-4): ")
    
    if choice == "1":
        display_lists()
    elif choice == "2":
        add_task()
    elif choice == "3":
        complete_task()
    elif choice == "4":
        print("Goodbye!")
        running = False
    else:
        print("Invalid choice, please try again.")