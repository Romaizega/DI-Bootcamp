import re, string

class Text:


    def __init__(self, text):
        self.text = text

    def word_frequency(self, word):
        self.word = word
        list_of_words = self.text.split()
        if self.word not in list_of_words:
            return None
        else: return list_of_words.count(self.word)

    def most_common_word(self):
        words_dict = {}
        list_of_words = self.text.split()
        for word in list_of_words:
            if word in words_dict:
                words_dict[word] += 1
            else:
                words_dict[word] = 1
        return max(words_dict)
            
    def unique_words(self):
        list_of_words = self.text.split()
        set_words = set(list_of_words)
        return list(set_words)
    
    @classmethod
    def from_file(cls, file_path):
        with open(file_path, "r", encoding="utf-8") as file:
            text = file.read()
        return cls(text)
    
    def remove_punctuation(self):
        new_list_of_word = "".join(ch for ch in self.text if ch not in string.punctuation)
        return new_list_of_word
    
    def remove_stop_words(self):
        stop_words = ["a", "the", "is", "in", "of", "to", "and", "it"]
        nlist_w_stword = " ".join(word for word in self.text.split() if word.lower() not in stop_words)
        return nlist_w_stword
    
    def remove_special_characters(self):
        return re.sub(r"[^a-zA-Z0-9\s]", "", self.text)
    