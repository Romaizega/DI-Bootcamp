#Exercise_1

number_user = int(input("Write here a number: "))
length_user = int(input("Write here a length: "))
my_list = []
for num in range(1,  length_user + 1):
    total = number_user * num
    my_list.append(total)
print(my_list)

#Exercise_2

user_word = input("Write your word with duplicates letters: ")
new_word = []
prev_letter = ''
for letter in user_word:
    if letter != prev_letter:
        new_word.append(letter)
    prev_letter = letter
print(''.join(new_word))
