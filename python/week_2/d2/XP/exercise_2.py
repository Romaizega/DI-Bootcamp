class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"
    
    def run_speed(self):
        return self.weight / self.age * 10
    
    def fight(self, other_dog):
        self.other_dog = other_dog
        power_dog = self.run_speed() * self.weight
        power_other_dog = other_dog.run_speed() * other_dog.weight
        if power_dog > power_other_dog:
            return f"{self.name} won!"
        else: return f"{other_dog.name} won!"

    
# dog1 = Dog("Rex", 4, 54)
# dog2 = Dog("Pex", 3, 65)
# dog3 = Dog("Pig", 7, 32)

# print(dog1.bark())
# print(dog2.run_speed())
# print(dog1.fight(dog2))