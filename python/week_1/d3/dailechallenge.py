user_word = ''
while user_word != "quit":
    user_word = input("Write your word here (or type 'quit'): ")
    my_dict = {}
    for index, char in enumerate(user_word):
        if char in my_dict:
            my_dict[str(char)].append(int(index))
        else:
            my_dict[str(char)] = [int(index)]
    print(my_dict)

