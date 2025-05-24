import random

class Card:
    def create_deck(self):
        suit  =  ["Hearts", "Diamonds", "Clubs", "Spades"]
        value = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
        self.deck = [f"{sut} of {val}" for sut in suit for val in value]
        return self.deck

    def __str__(self):
        return self.deck

class Deck:
    def shuffle (self):
        card = Card()
        self.deck = card.create_deck()
        if len(self.deck) == 52:
            self.new_deck = random.shuffle(self.deck)
            return self.deck

    def deal(self):
        if not self.deck:
            print("The deck is empty")
            exit()
        choice_card = random.choice(self.deck)
        self.deck.remove(choice_card)
        print(choice_card)
        print(f"Cards left {len(self.deck)}")

decker = Deck()
decker.shuffle()
while True:
    input("Press Enter to deal a card...")
    decker.deal()
