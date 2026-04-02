import numpy as np

from app.services.difference import (
    difference_table,
    get_forward_diagonal,
    get_backward_diagonal
)
from app.services.polynomial import polynomial_method
from app.utils.validate import validate_input
from app.services.steps import (
    generate_forward_steps,
    generate_backward_steps
)

# ADD THIS IMPORT
from app.services.formula import (
    newton_forward_formulas,
    newton_backward_formulas
)


def select_method(x, target):
    mid = x[len(x)//2]
    return "forward" if target <= mid else "backward"


def newton_forward(x, y, target, h, table):
    p = (target - x[0]) / h
    diag = get_forward_diagonal(table)

    result = diag[0]
    fact = 1
    p_term = 1

    for i in range(1, len(x)):
        p_term *= (p - (i - 1))
        fact *= i
        result += (p_term * diag[i]) / fact

    return result


def newton_backward(x, y, target, h, table):
    p = (target - x[-1]) / h
    diag = get_backward_diagonal(table)

    result = diag[0]
    fact = 1
    p_term = 1

    for i in range(1, len(x)):
        p_term *= (p + (i - 1))
        fact *= i
        result += (p_term * diag[i]) / fact

    return result


def solve_interpolation(data):
    x, y = data.x, data.y
    target = data.target

    h = validate_input(x, y)
    table = difference_table(y)

    # 🔹 direct match
    for i in range(len(x)):
        if abs(x[i] - target) < 1e-9:
            return {
                "result": y[i],
                "method": "direct",
                "mode": "exact",
                "table": table,
                "axisX": x,
                "axisY": y,
                "formula": "Exact match found. No interpolation required.",
                "steps": []
            }

    method = select_method(x, target)

    n = len(x)

    if method == "forward":
        newton_val = newton_forward(x, y, target, h, table)
        formulas = newton_forward_formulas()
        steps = generate_forward_steps(x, y, table, target)
    else:
        newton_val = newton_backward(x, y, target, h, table)
        formulas = newton_backward_formulas()
        steps = generate_backward_steps(x, y, table, target)

    poly_val, _ = polynomial_method(x, y, target)

    coeffs = np.polyfit(x, y, len(x) - 1)
    poly = np.poly1d(coeffs)

    def polynomial_to_latex(poly):
        terms = []
        degree = len(poly.coeffs) - 1
    
        def format_number(val):
            val_str = f"{val:.10f}"
            val_str = val_str.rstrip("0").rstrip(".")
            return val_str
    
        for i, coef in enumerate(poly.coeffs):
            power = degree - i
    
            if abs(coef) < 1e-12:
                continue
            
            sign = "-" if coef < 0 else "+"
            coef_abs = abs(coef)
    
            # 🔥 FIX HERE
            if abs(coef_abs - 1) < 1e-10 and power != 0:
                coef_str = ""
            else:
                coef_str = format_number(coef_abs)
    
            # variable
            if power == 0:
                term = coef_str
            elif power == 1:
                term = f"{coef_str}x"
            else:
                term = f"{coef_str}x^{power}"
    
            # first term
            if len(terms) == 0:
                if sign == "-":
                    term = f"-{term}"
            else:
                term = f"{sign} {term}"
    
            terms.append(term)
    
        return " ".join(terms)

    x_smooth = np.linspace(min(x), max(x), 100)
    y_smooth = poly(x_smooth)

    return {
        "result": round(newton_val, 6),
        "poly": round(poly_val, 6),
        "method": method,
        "mode": method,
        "table": table,
        "axisX": x,
        "axisY": y,
        "formula": formulas,
        "steps": steps,
        "poly_eq": polynomial_to_latex(poly),
        "graph": {
            "x": x,
            "y": y,
            "x_smooth": x_smooth.tolist(),
            "y_smooth": y_smooth.tolist(),
            "target_x": target,
            "target_y": round(newton_val, 6)
        }
    }