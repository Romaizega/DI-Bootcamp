MATRTIX_STR = '''
7ii
Tsx
h%?
i #
sM 
$a 
#t%'''
my_matrix = []
chars = list(MATRTIX_STR)
matrix = [char for char in chars if char != '\n']
matrix_2 = [matrix[i:i+3] for i in range(0, len(matrix), 3)]
for j in range(len(matrix_2[0])):
    for i in range(len(matrix_2)):
        my_matrix.append(matrix_2[i][j])
letter_in_my_matrix = [lett for lett in my_matrix if lett.isalpha()]
print("".join(letter_in_my_matrix))
