# Exercise_1
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age
    
    
cat_name1 = input("Write name of the first cat: ")
age1 = int(input("Write age of the first cat: "))

cat_name2 = input("Write name of the second cat: ")
age2 = int(input("Write age of the second cat: "))

cat_name3 = input("Write name of the third cat: ")
age3 = int(input("Write age of the third cat: "))

cat1 = Cat(cat_name1, age1)
cat2 = Cat(cat_name2, age2)
cat3 = Cat(cat_name3, age3)
def find_the_oldest(cat1, cat2, cat3):
    if cat1.age > cat2.age and cat1.age > cat3.age:
        return cat1
    elif cat2.age > cat1.age and cat2.age > cat3.age:
        return cat2
    else:
        return cat3
oldest = find_the_oldest(cat1, cat2, cat3)
print(f"The oldest is cat is {oldest.name}, and is {oldest.age} years old")


# Exercise_2

class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height

    def bark(self):
        print(f"{self.name} goes woof")
    
    def jump(self):
        print(f"{self.name} jumps {self.height*2} cm high")

davids_dog = Dog("Boss", 153)
print(davids_dog.name, davids_dog.height)
sarahs_dog = Dog("Noboss", 56)
print(sarahs_dog.name, sarahs_dog.height)
davids_dog.bark()
sarahs_dog.bark()
davids_dog.jump()
sarahs_dog.jump()

dog1 = davids_dog
dog2 = sarahs_dog

def compare_size(dog1, dog2):
    if dog1.height > dog2.height:
        return dog1
    else:
        return dog2
highest = compare_size(dog1, dog2)
print(f"The cooler dog is {highest.name} and it's jump is {highest.height*2}")

# Exercise_3

class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics
    def sing_me_song(self):
        for words in self.lyrics:
            print(words)

stairway = Song(["There’s a lady who's sure", "all that glitters is gold", "and she’s buying a stairway to heaven"])
stairway.sing_me_song() 

# Exercise_4

class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []
        self.my_animal = {}

    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)

    def get_animals(self):
        print(self.animals)

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)

    def sort_animals(self):
        self.animals.sort()
        for animal in self.animals:
            letter = animal[0].upper()
            if letter not in self.my_animal:
                self.my_animal[letter] = []
            self.my_animal[letter].append(animal)

    def get_groups(self):
        for key, values in self.my_animal.items():
            print(f"{key}: {values}")

ramat_gan_safari = Zoo("Ramat Gan Safari")

ramat_gan_safari.add_animal("Giraffe")
ramat_gan_safari.add_animal("Bear")
ramat_gan_safari.add_animal("Baboon")
ramat_gan_safari.add_animal("Babn")
ramat_gan_safari.add_animal("Coat")
ramat_gan_safari.add_animal("Cat")
ramat_gan_safari.add_animal("Zebra")
ramat_gan_safari.add_animal("Lion")

ramat_gan_safari.get_animals()
ramat_gan_safari.sell_animal("Bear")
ramat_gan_safari.get_animals()
ramat_gan_safari.sort_animals()
ramat_gan_safari.get_groups()