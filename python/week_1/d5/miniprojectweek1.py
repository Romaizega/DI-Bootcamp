while True:
    start = input("Do you want to play with me? Eneter 'yes' and we continue: ").lower()
    if start == "yes":
        break
    else:
        quit()

list_of_game = [
    ["","", ""],
    ["","", ""],
    ["","", ""]
]

def greeting():
    player_1 = input("Hi, player N1 what's your name?: ")
    print(f"Hi {player_1} yours - X")
    player_2 = input("Hi, player N2 what's your name?: ")
    print(f"Hi {player_2} yours O")
    return player_1, player_2
name1, name2 = greeting()


def display_board():
    for j in range(len(list_of_game[0])):
        for i in range(len(list_of_game)):
            if list_of_game[i][j] == "":
                list_of_game[i][j] = "-"
display_board()

def check_win():
    for row in list_of_game:
        if row.count("o") == 3:
            return name2
        elif row.count("x") == 3:
            return name1

    for column_ind in range(3):
        column = [list_of_game[row][column_ind] for row in range(3)]
        if column.count("o") == 3:
            return name2
        elif column.count("x") == 3:
            return name1
    main_diag = [list_of_game[i][i] for i in range(3)]
    anti_diag = [list_of_game[i][2 - i] for i in range(3)]
    if main_diag.count("o") == 3 or anti_diag.count("o") == 3:
        return name2
    elif main_diag.count("x") ==3 or anti_diag.count("x") == 3:
            return name1
    return None

busy_cell_1 = []
busy_cell_2 = []
def player_input():
    attempt = 0
    winner_found = False
    while attempt < 9 and not winner_found:
        if attempt % 2 == 0:
            try:
                player_1_row = int(input(f"{name1} - write position for step row: "))
                player_1_col = int(input(f"{name1} - Write position for step column: "))
                if player_1_row not in range(3) or player_1_col not in range(3):
                    print("Your input is out of range. Try 0, 1 or 2")
                    continue
            except:
                print("You must enter only integer")
                continue
            if list_of_game[player_1_row][player_1_col] not in ["", "-"]:
                print("The cell is taken, plese eneter again")
                continue
            list_of_game[player_1_row][player_1_col] = "x"
            busy_cell_1.append((player_1_col, player_1_row))
            print(f"Taken cells {name1}: {busy_cell_1}")
            attempt += 1
            winner = check_win()
            if winner:
                print(f"{winner} won!")
                winner_found = True
        else:
            if attempt % 2 != 0:
                try:
                    player_2_row = int(input(f"{name2} - write position for step row: "))
                    player_2_col = int(input(f"{name2} - write position for step column: "))
                    if player_2_row not in range(3) or player_2_col not in range(3):
                        print("Your input is out of range. Try 0, 1 or 2")
                        continue
                except:
                    print("You must enter only integer")
                    continue
                if list_of_game[player_2_row][player_2_col] not in ["", "-"]:
                    print("The cell is taken, please enter again")
                    continue
                list_of_game[player_2_row][player_2_col] = "o"
                busy_cell_2.append((player_2_col, player_2_row))
                print(f"Taken cells {name2}: {busy_cell_2}")
                attempt += 1
                winner = check_win()
                if winner:
                    print(f"{winner} won!")
                    winner_found = True
        print('\n'.join('\t'.join('{:3}'.format(item) for item in row) for row in list_of_game))
    if attempt == 9 and not winner_found:
        print("It's a tie!")
display_board()
player_input()
