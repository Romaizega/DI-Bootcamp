from faker import Faker
import random, string
from datetime import datetime

from tabulate import tabulate


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


# Exercise # 4

def current_date():
    time_now = datetime.now()
    my_time = time_now.strftime("%d.%m.%Y, %H:%M")
    print(f"It's time: {my_time}")
current_date()

# Exercise 5

def expect_date():
    exp_date = datetime(2026, 1, 1)
    time_now = datetime.now()
    diff_time = exp_date - time_now
    print(diff_time)
expect_date()


# Exercise 6

def how_many_time(birthday):
    time_now = datetime.now()
    whole_date = time_now - birthday
    whole_minute = whole_date.total_seconds() // 60
    print(whole_date)
    print(whole_minute)
how_many_time(birthday = datetime(1989, 3, 23))

# Exercise 7

fake = Faker()
data = []
def create_faker_users():
    for _ in range(5):
        name = fake.name()
        adress = fake.address()
        language_code = fake.language_code()
        data.append([name, adress, language_code])
    print(data)
    headers = ["Name", "Address", "Language"]
    data_dict = [dict(zip(headers, i)) for i in data]
    print(data_dict)
create_faker_users()
