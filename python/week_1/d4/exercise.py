import random

# Exercise_1
def display_message():
    print("I am learning about functions in Python.")
display_message()

# Exercise_2

def favorite_book(title):
    print(f"One of my favorite books is {title}")
favorite_book("Alice in Wonderland")

# Exercise_3
def describe_city(city, country = "Unknown"):
    print(f"{city} is in {country}")
describe_city("Reykjavik", "Iceland")
describe_city("Paris")

# Exercise_4
def random_namber(your_number):
    number = random.randint(1, 100)
    if your_number == number:
        print("Succes!")
    else:
        print(f"Fail! your number: {your_number}, but Random number: {number}")
random_namber(4)