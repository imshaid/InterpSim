def newton_forward_formulas():
    return [
        r"\Delta y_i = y_{i+1} - y_i",
        r"\Delta^{n} y_i = \Delta^{n-1} y_{i+1} - \Delta^{n-1} y_i",
        r"u = \dfrac{x - x_0}{h}, \quad h = \left|x_{i+1} - x_i\right|",
        r"y = f(x) = y_0 + u\Delta y_0 + \dfrac{u(u-1)}{2!}\Delta^2 y_0 + \dfrac{u(u-1)(u-2)}{3!}\Delta^3 y_0 + \cdots + \dfrac{u(u-1)(u-2)(u-3)\cdots(u-n+1)}{n!}\Delta^n y_0"
    ]


def newton_backward_formulas():
    return [
        r"\nabla y_i = y_i - y_{i-1}",
        r"\nabla^{n} y_i = \nabla^{n-1} y_{i+1} - \nabla^{n-1} y_i",
        r"u = \dfrac{x - x_n}{h}, \quad h = \left|x_{i+1} - x_i\right|",
        r"y = f(x) = y_n + u\nabla y_n + \dfrac{u(u+1)}{2!}\nabla^2 y_n + \dfrac{u(u+1)(u+2)}{3!}\nabla^3 y_n + \cdots + \dfrac{u(u+1)(u+2)(u+3)\cdots(u+n-1)}{n!}\nabla^n y_n"
    ]