# Exercise_1
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

new_dic = {key: value for key, value in zip(keys, values)}
print(new_dic)

# Exercise_2
total_cost = 0
family = {"rick": 43,
          "beth": 13, 
          "morty": 5, 
          "summer": 8}

for name, age  in family.items():
    if age <=3:
        total_cost =+ 0
        print("Ticket costs is free")
    elif age >=12:
        total_cost += 15
        print(f"Ticket for {name.capitalize()} costs $15")
    else:
        total_cost += 10
        print(f"Ticket for {name.capitalize()} costs $10")
print(f"Total cost is ${total_cost}")