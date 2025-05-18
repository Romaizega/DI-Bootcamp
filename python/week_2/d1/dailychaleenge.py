class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.list_animals = []
        self.animals = {}
        print(f"{self.name +"'s"} farm")
        print()

    def add_animal(self, animal_type, count = 1):
        if animal_type in self.animals:
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count

    def get_info(self):
        for key, values in self.animals.items():
            print(f"{key}: {values}")
        print("E-I-E-I-0!")

macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 12)
macdonald.get_info()