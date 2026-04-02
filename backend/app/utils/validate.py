def validate_input(x, y):
    if len(x) != len(y):
        raise ValueError("x and y must have same length")

    if len(x) < 2:
        raise ValueError("At least 2 data points required")

    # 🔥 detect order
    is_increasing = all(x[i] < x[i+1] for i in range(len(x)-1))
    is_decreasing = all(x[i] > x[i+1] for i in range(len(x)-1))

    if not (is_increasing or is_decreasing):
        raise ValueError("x must be strictly increasing or decreasing")

    # 🔥 equal interval (absolute spacing)
    h = abs(x[1] - x[0])

    for i in range(1, len(x)-1):
        if abs(abs(x[i+1] - x[i]) - h) > 1e-6:
            raise ValueError("x must be equally spaced")

    return h