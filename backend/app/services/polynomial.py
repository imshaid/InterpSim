import numpy as np

def polynomial_method(x, y, target):
    coeffs = np.polyfit(x, y, len(x) - 1)
    poly = np.poly1d(coeffs)
    return float(poly(target)), poly