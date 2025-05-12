# Exercise_1
my_fav_numbers = {2, 3, 5, 7 , 9}
my_fav_numbers.add(11)
my_fav_numbers.add(13)
my_fav_numbers.remove(13)
friend_fav_numbers = {6, 8, 10, 12}
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)
print(our_fav_numbers)

# Exercise_2
my_tuple = (2, 4, 6, 8, 9)
# my_tuple.add() --> Error

# Exercise_3
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")
print(basket.count("Apples"))
basket.clear()
print(basket)

# Exercise_4
my_list = []
num = 1.5
while num <= 5:
    my_list.append(num)
    num += 0.5
print(my_list)

# Exercise_5
    #part_1
for i in range(1, 21):
    print(i)
    #part_2
number = list(range(1, 21))
for i in range(0, len(number), 2):
    print(number[i])

# Exercise_6
active = True
while active:
    your_name = input("PLease,  write here my name (enter Roman): ")
    if your_name != "Roman":
        print("Try again")
    else:
        print(f"Goobye, {your_name}")
        active = False

# Exercise_7
favorite_list = []
fruit = input("Write your favorite fruits, you can write through space :").lower()
favorite_list = fruit.split()
name_fruit = input("Write name of the fruit: ").lower()
if name_fruit in favorite_list:
    print("You chose one of your favorite fruits! Enjoy!")


# Exercise_8
toppings_list = []
active = True
while active:
    toppings = input("Plese, write your topping for your pizza (enter 'quit' when you are finished): ").lower()
    if toppings == "quit":
        active = False
    else:
        toppings_list.append(toppings)
        print(f"Your {toppings} added to your pizza")
        print(f"Your toppings: {', '.join(toppings_list)}")
if len(toppings_list) == 0:
        print("You did not add toppings and your pizza cost 10$")
else:
    price = len(toppings_list) * 2.5 + 10
    print(f"Your pizza cost {price} $")

# Exercise_9
total_cost = 0
age_list = []
active = True
while active:
    your_age = input("How old are you? (enter 'buy' when you are finished) : ").lower()
    if your_age == "buy":
        active = False
    elif your_age.isdigit():
        age = int(your_age)
        if age <= 3:
            print("Ticket is free")
        elif age <= 12:
            total_cost += 10
            print("Ticket costs $10.")
        else:
            total_cost += 15
            print("Ticket costs $15.")
    else:
        print("Invalid input. Please enter a number or 'buy' to finish.")

print(f"Total ticket cost: ${total_cost}")
