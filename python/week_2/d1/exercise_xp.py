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