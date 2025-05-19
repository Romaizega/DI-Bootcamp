class Pets():
    def __init__(self, animals):
        self.animals = animals
    
    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f"{self.name} is just walking around"
    
class Bengal(Cat):
    
    def sing(self, sounds):
        return f"{sounds}"
    
class Charteux(Cat):

    def sing(self, sounds):
        return f"{sounds}"
    
class Siamese(Cat):

    def __init__(self, name, age, color, nick_name):
        super().__init__(name, age)
        self.color = color
        self.nick = nick_name
    
    def unique_breed(self, height):
        self.height = height
        print(f"Cat: {self.name} could jump {self.height} cm")

all_cats = [Bengal("Boss", 3), Charteux("Baby", 1), Siamese("Twince", 4, "black", "small")]
sara_pets = Pets(all_cats)
sara_pets.walk()

roman_pets = Cat("many", 4)
roman_pets.walk()
roman_pets = Siamese("Twince", 4, "black", "small")
roman_pets.unique_breed(60)
