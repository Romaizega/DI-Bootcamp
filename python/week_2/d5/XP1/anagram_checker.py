class AnagramChecker:
    """
    A class used to check if a word is valid and find its anagrams
    using a predefined dictionary of words from a text file.

    Attributes:
    word_list (list): List of valid lowercase English words.
    """
    def __init__(self, file_path):
        """
        Initialize the AnagramChecker with a file containing valid English words.
        Converts all words to lowercase for consistent comparison.

        Args:
        file_path (str): Path to the file containing the word list.
        """
        with open(file_path, "r", encoding="utf-8") as file:
            self.word_list = [word.lower() for word in file.read().splitlines()]
            
    def is_valid_word(self, word):
        """
        Check whether a word is valid (i.e., exists in the word list).
        Args:
        word (str): The word to validate.
        Returns:
        bool: True if the word is valid, False otherwise.
        """
        word = word.lower()
        if word in self.word_list:
            return True
        else:
            return False

    def get_anagrams(self, word):
        """
        Get all valid anagrams of a given word, excluding the word itself.
        Args:
            word (str): The word to find anagrams for.
        Returns:
            list: A list of valid anagram strings
        """
        word = word.lower()
        my_list_word = []
        for words in self.word_list:
           if words != word and sorted(words) == sorted(word):
               my_list_word.append(words)
        return my_list_word
