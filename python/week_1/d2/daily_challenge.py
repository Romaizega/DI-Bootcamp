number_user = int(input("Write here a number: "))
length_user = int(input("Write here a length: "))
my_list = []
for num in range(1,  length_user + 1):
    total = number_user * num
    my_list.append(total)
print(my_list)
