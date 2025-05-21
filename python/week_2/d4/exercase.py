# Exercise 1

import os, random

def get_words_from_file(dir_path):
    with open(f"{dir_path}/word_list.txt", "r", encoding="utf-8") as file:
        output = file.read()
        return output.split()

dir_path = os.path.dirname(os.path.realpath(__file__))
get_words_from_file(dir_path)
# print(get_words_from_file(dir_path))

def get_random_sentence(lengt_sent):
    senten = get_words_from_file(dir_path)
    senten2 = ""
    for i in range(lengt_sent):
        senten2 += random.choice(senten) + " "
    return senten2.lower()

def main():
    print("This program generates a random sentence of a specified length from a word list")
    try:
        user_sente = int(input("Write length of your future sentence: "))
        if user_sente < 2 or user_sente > 20:
            print("Your choise must be between 2 and 20")
            exit()
    except:
        print("You must enter only integer")
        exit()

    sentence_user  = get_random_sentence(user_sente)
    print(f"Your sentece: {sentence_user}")

main()


# E