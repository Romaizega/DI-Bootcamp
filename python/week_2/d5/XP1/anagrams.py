from anagram_checker import AnagramChecker


word = AnagramChecker("sowpods.txt")
while True:
    start = input("Do you want to play? Enter 'yes' and we continue: ").lower()
    if start == "yes":
        break
    else:
        quit()

def user_input():
    while True:
        user_word = input("Write here any word: ").strip()
        if len(user_word.split()) != 1:
            print("You should wrute only one word")
        elif not user_word.isalpha():
            print ("Write only letters")
        else:
            return user_word

def get_anagram_word():
    word = AnagramChecker("sowpods.txt")
    user_word = user_input()
    if word.is_valid_word(user_word):
        anagrams = word.get_anagrams(user_word)
        print("YOUR WORD:", user_word.upper())
        print("This is a valid English word.")
        print("Anagrams for your word:", ", ".join(anagrams))
    else:
        print("The word is not a valid English word.")
     
get_anagram_word()
