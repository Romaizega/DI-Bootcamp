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

# Exercise_3

brand = {
    "name": "Zara",
    "creation_date" : 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes ": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color":{ 
        "France": "blue", 
        "Spain": "red", 
        "US": ["pink", "green"]
    }
}

brand["number_stores"] = 2
print(brand["type_of_clothes "])
brand["country_creation"] = "Spain"
brand["international_competitors"].append("Desigual")
del brand["creation_date"]
print(brand["international_competitors"][-1])
print(brand["major_color"]["US"])
print("keys:", brand.keys())

more_on_zara = {
    "creation_data": 1975,
    "number_store": 3
}
new_brand = brand | more_on_zara
print(new_brand)

# Exercise_4

users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]
users_dic = {name: key for key, name in enumerate(users)}
users_dic_2 = {key: name for key, name in enumerate(users)}
users_dic_3 = {name: key for key, name in enumerate(sorted(users))}
