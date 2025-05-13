# Exercise_1
user_word = ''
while user_word != "quit":
    user_word = input("Write your word here (or type 'quit'): ")
    my_dict = {}
    for index, char in enumerate(user_word):
        if char in my_dict:
            my_dict[str(char)].append(int(index))
        else:
            my_dict[str(char)] = [int(index)]
    print(my_dict)

# Exercise_2

items_purchase = {
    "Water": "$1",
    "Bread": "$3",
    "TV": "$1,000",
    "Fertilizer": "$20",
}
my_list = []
wallet = "$300"
wallet = wallet.replace("$", "").replace(",", "")
wallet = float(wallet)
for name, price in items_purchase.items():
    price = price.replace("$", "").replace(",", "")
    price = float(price)
    if price < wallet:
        my_list.append(name)
if not my_list:
    print("Nothing")
else:
    print(f"You can buy {sorted(my_list)}")

