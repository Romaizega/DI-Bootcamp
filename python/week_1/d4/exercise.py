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

# Exercise_5
def make_shirt(size = "large", text= "I love Python"):
    print(f"The size of the shirt is {size} and the text is {text}")
make_shirt()
make_shirt("medium")
make_shirt("small", "Someone's text")
make_shirt(size="small", text="Hello!")

# Exercise_6

magician_names = ["Harry Houdini", "David Blaine", "Criss Angel"]
def show_magicians(magician_names):
    for names in magician_names:
        print(names)
def make_great(magician_names):
    for i, name in enumerate(magician_names):
        magician_names[i] = "the Great " + name
        print(magician_names[i])
show_magicians(magician_names)
make_great(magician_names)