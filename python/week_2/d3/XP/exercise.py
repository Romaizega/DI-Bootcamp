import random, string

# Exercise 1
class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount
        
    def __str__(self):
        return f'{self.amount} {self.currency}'
    
    def __repr__(self):
        return self.__str__()

    def __int__(self):
        return self.amount

    def __add__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError("Cannot add different currencies")
            return self.amount + other.amount
        elif isinstance(other, int):
            return self.amount + other

    def __iadd__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError("Cannot add different currencies")
            self.amount += other.amount
        elif isinstance(other, int):
            self.amount += other
        return self
    

c1 = Currency('dollar', 5)
c2 = Currency('dollar', 10)
c3 = Currency('shekel', 1)
c4 = Currency('shekel', 10)


# Exercise 3

def random_string():
    my_letters = string.ascii_letters
    my_string = ""
    for i in range(5):
        my_string += random.choice(my_letters)
    print(my_string)
random_string()
