import random

your_word = input("Write your string (only 10 chars): ")
if len(your_word) < 10:
    print("String not long enough.")
elif len(your_word) > 10:
    print("String too long.")
else:
    print("Perfect string")
    print(f"First character is {your_word[0]} | Last character is {your_word[-1]}")
    for character in range(1, len(your_word) + 1):
        print(your_word[:character])
    new_your_word = list(your_word)
    random.shuffle(new_your_word)
    print(f"Your new word is {''.join(new_your_word)}")
