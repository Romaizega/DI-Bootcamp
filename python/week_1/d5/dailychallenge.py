# Exercise_1
user_words = input("Write your words: ").split(",")
user_words.sort()
print(",".join(user_words))

# Exercise_2
def longest_word(sentence):
    new_sentence = sentence.split()
    long_word = ""
    for words in new_sentence:
            if len(words) > len(long_word):
                  long_word = words
    print(f" the longest word is {long_word}")
longest_word("Forgetfulness is by all means powerless!")
