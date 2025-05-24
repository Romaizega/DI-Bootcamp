from anagram_checker import AnagramChecker


word = AnagramChecker("sowpods.txt")
while True:
    start = input("Do you want to play? Enter 'yes' and we continue: ").lower()
    if start == "yes":
        break
    else:
        quit()

def user_input():
    """
    Prompt the user to enter a single word.
    The function validates that the input:
    - Contains only one word
    - Contains only alphabetic characters
    - Has no leading or trailing spaces
    Returns:
        str: A valid word entered by the user
    """
    while True:
        user_word = input("Write here any word: ").strip() # ввод слова и удаление stip() пробелы в начале и в конце
        if len(user_word.split()) != 1: # считаем кол-во слов в list, создаем list with .split()
            print("You should wrute only one word")
        elif not user_word.isalpha(): # проверяем чтобы в слове было только быквы
            print ("Write only letters")
        else:
            return user_word

def get_anagram_word():
    """
    Get a valid word from the user, check if it's in the dictionary,
    and if so, find and display all of its valid anagrams.
    """
    user_word = user_input()
    if word.is_valid_word(user_word): # проверяем True or False прошло ли слово валидацию в другой функции 
        anagrams = word.get_anagrams(user_word)
        print("YOUR WORD:", user_word.upper())
        print("This is a valid English word.")
        print("Anagrams for your word:", ", ".join(anagrams))
    else:
        print("The word is not a valid English word.")
     
get_anagram_word()
