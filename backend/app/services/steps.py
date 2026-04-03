import math

# FORMATTERS
def fmt2(val):
    return f"{val:.2f}"

def fmt4(val):
    return f"{val:.4f}"

def fmt6(val):
    return f"{val:.6f}"

def format_num(val):
    val = float(f"{val:.6f}")
    return f"({val})" if val < 0 else f"{val}"


def generate_forward_steps(x, y, table, target):
    steps = []

    h = x[1] - x[0]
    x0 = x[0]
    y0 = y[0]

    # 🔹 GIVEN (2 decimal clean)
    steps.append(
        rf"x = {fmt2(target)},\ x_0 = {fmt2(x0)},\ y_0 = {fmt2(y0)},\ h = {fmt4(h)}"
    )

    # 🔹 Δ values
    delta_parts = []
    for i in range(1, len(table)):
        val = format_num(table[i][0])

        if i == 1:
            delta_parts.append(rf"\Delta y_0 = {val}")
        else:
            delta_parts.append(rf"\Delta^{i} y_0 = {val}")

    steps.append(",\ ".join(delta_parts))

    # 🔹 u
    u = (target - x0) / h
    steps.append(
        rf"u = \frac{{{fmt2(target)} - {fmt2(x0)}}}{{{fmt4(h)}}} = {fmt6(u)}"
    )

    expr_symbolic = rf"y = {fmt2(y0)}"
    expr_numeric = rf"y = {fmt2(y0)}"
    expr_evaluated = rf"y = {fmt2(y0)}"

    total = y0

    for i in range(1, len(table)):
        delta = table[i][0]

        u_expr = f"{fmt4(u)}"
        u_val = 1

        for j in range(1, i):
            u_expr += f"({fmt4(u-j)})"

        for j in range(i):
            u_val *= (u - j)

        numerator = u_val * delta
        factorial = math.factorial(i)
        term = numerator / factorial
        total += term

        expr_symbolic += rf"\, + \, \frac{{{u_expr}}}{{{i}!}}{format_num(delta)}"
        expr_numeric += rf"\, + \, \frac{{{format_num(numerator)}}}{{{factorial}}}"
        expr_evaluated += rf"\, + \, {format_num(term)}"

    steps.append(expr_symbolic)
    steps.append(rf"\text{{Or, }} {expr_numeric}")
    steps.append(rf"\text{{Or, }} {expr_evaluated}")
    steps.append(rf"\text{{Or, }} y = {fmt6(total)}")

    return steps


def generate_backward_steps(x, y, table, target):
    steps = []

    h = x[1] - x[0]
    xn = x[-1]
    yn = y[-1]

    # 🔹 GIVEN
    steps.append(
        rf"x = {fmt2(target)},\ x_n = {fmt2(xn)},\ y_n = {fmt2(yn)},\ h = {fmt4(h)}"
    )

    delta_parts = []
    for i in range(1, len(table)):
        val = format_num(table[i][-1])

        if i == 1:
            delta_parts.append(rf"\nabla y_n = {val}")
        else:
            delta_parts.append(rf"\nabla^{i} y_n = {val}")

    steps.append(",\ ".join(delta_parts))

    u = (target - xn) / h
    steps.append(
        rf"u = \frac{{{fmt2(target)} - {fmt2(xn)}}}{{{fmt4(h)}}} = {fmt6(u)}"
    )

    expr_symbolic = rf"y = {fmt2(yn)}"
    expr_numeric = rf"y = {fmt2(yn)}"
    expr_evaluated = rf"y = {fmt2(yn)}"

    total = yn

    for i in range(1, len(table)):
        delta = table[i][-1]

        u_expr = f"{fmt4(u)}"
        u_val = 1

        for j in range(1, i):
            u_expr += f"({fmt4(u+j)})"

        for j in range(i):
            u_val *= (u + j)

        numerator = u_val * delta
        factorial = math.factorial(i)
        term = numerator / factorial
        total += term

        expr_symbolic += rf"\, + \, \frac{{{u_expr}}}{{{i}!}}{format_num(delta)}"
        expr_numeric += rf"\, + \, \frac{{{format_num(numerator)}}}{{{factorial}}}"
        expr_evaluated += rf"\, + \, {format_num(term)}"

    steps.append(expr_symbolic)
    steps.append(rf"\text{{Or, }} {expr_numeric}")
    steps.append(rf"\text{{Or, }} {expr_evaluated}")
    steps.append(rf"\text{{Or, }} y = {fmt6(total)}")

    return steps