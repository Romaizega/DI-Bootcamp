class Card:
    def create_deck(self):
        suit  =  ["Hearts", "Diamonds", "Clubs", "Spades"]
        value = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
        self.deck = [(sut, val) for sut in suit for val in value]

    def show_deck(self):
        print(self.deck)

card = Card()
card.create_deck()
card.show_deck()
