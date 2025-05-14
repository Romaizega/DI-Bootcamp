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

# Exercise_7

def get_random_temp():
    temep = (round(random.uniform(-10, 40), 1))
    return temep
def main():
    temper = get_random_temp()
    print(f"The temperature right now is {temper} degrees Celsius")
    if temper <= 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 < temper <= 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 16 < temper <= 23:
        print("Nice weather.")
    elif 24 <= temper <= 32:
        print("A bit warm, stay hydrated.")
    else:
        print("It’s really hot! Stay cool.")
    get_random_temp
main()


def get_random_temp(season):
    if season == "winter":
        return round(random.uniform(-10, 10), 1)
    elif season == "spring":
        return round(random.uniform(10, 20), 1)
    elif season == "summer":
        return round(random.uniform(20, 35), 1)
    elif season == "autumn":
        return round(random.uniform(10, 20), 1)

def main():
    month_num = int(input("Write number of month: "))
    if month_num in [12, 1, 2]:
        season = "winter"
    elif month_num in [3, 4, 5]:
        season = "spring"
    elif month_num in [6, 7, 8]:
        season = "summer"
    else:
        season = "autumn"

    temp = get_random_temp(season)
    print(f"The temperature right now is {temp} degrees Celsius.")

    if temp <= 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 < temp <= 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 16 < temp <= 23:
        print("Nice weather.")
    elif 24 <= temp <= 32:
        print("A bit warm, stay hydrated.")
    else:
        print("It’s really hot! Stay cool.")
    get_random_temp(season)
main()
    