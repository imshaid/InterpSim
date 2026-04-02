def difference_table(y):
    n = len(y)
    table = [y.copy()]

    for i in range(1, n):
        col = [
            table[i - 1][j + 1] - table[i - 1][j]
            for j in range(n - i)
        ]
        table.append(col)

    return table


def get_forward_diagonal(table):
    return [table[i][0] for i in range(len(table))]


def get_backward_diagonal(table):
    return [table[i][-1] for i in range(len(table))]