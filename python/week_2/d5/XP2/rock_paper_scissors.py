from game import Game
from tabulate import tabulate

def get_user_menu_choice():

    print("""Greeting my young freind! You have tree options:"
        1. Play a new game.
        2. Show scores.
        3. Quit.""")
    while True:
        try:
            user_input = int(input("Please enter you choice: "))
            if user_input not in range(1,4):
                print("Wrong number, your is 1, 2 or 3")
                continue
            else: return user_input
        except:
            print("You must enter only number")

def print_result(results):
    table = [
        ["Wins", results.get("win", 0)],
        ["Losses", results.get("loss", 0)],
        ["Draws", results.get("draw", 0)]
    ]
    print(tabulate(table, headers=["Result", "Count"], tablefmt="grid"))
    print("Thank you for playing!")

def main():
    result = {
        "win": 0,
        "loss": 0,
        "draw": 0
    }
    while True:
        user_choice = get_user_menu_choice()
        if user_choice == 1:
            play = Game()
            game = play.play()
            if game == "WIN":
                result["win"] += 1
            elif game == "LOSS":
                result["loss"] += 1
            else: result["draw"] += 1
            print_result(result)
        elif user_choice == 2:
            print_result(result)
        else: quit()

main()