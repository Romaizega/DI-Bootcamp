class AnagramChecker:
    def __init__(self, file_path):
       
        with open(file_path, "r", encoding="utf-8") as file:
            self.word_list = [word.lower() for word in file.read().splitlines()]
            
    def is_valid_word(self, word):
        word = word.lower()
        if word in self.word_list:
            return True
        else:
            return False

    def get_anagrams(self, word):
        word = word.lower()
        my_list_word = []
        for words in self.word_list:
           if words != word and sorted(words) == sorted(word):
               my_list_word.append(words)
        return my_list_word
