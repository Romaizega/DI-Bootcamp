import random

class Game:
    def __init__(self):
        pass

    def get_user_item(self):
        print("You should choice rock, paper or scissors")
        while True:
            user_choise = input("Write here: ").lower()
            if user_choise == "rock" or user_choise == "paper" or user_choise == "scissors":
                print(f"Your choice is {user_choise}")
            else:
                print("You should choice rock, paper or scissors")
                continue
            return user_choise

    def get_computer_item(self):
        game_list = ["rock", "paper" ,"scissors"]
        computer_choice = random.choice(game_list)
        return computer_choice
    
    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "DRAW"
        elif user_item == "rock" and computer_item == "paper":
            return "LOSS"
        elif user_item == "rock" and computer_item == "scissors":
            return "WIN"
        elif user_item == "scissors" and computer_item == "rock":
            return "LOSS"
        elif user_item =="scissors" and computer_item == "paper":
            return "WIN"
        elif user_item == "paper" and computer_item == "rock":
            return "WIN"
        elif user_item == "paper" and computer_item == "scissors":
            return "LOSS"
        
    def play(self):
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)
        print(f"Computer chose: {computer_item}")
        print(f"Result: {result}")
        return result
