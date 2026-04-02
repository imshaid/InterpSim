from pydantic import BaseModel
from typing import List

class InputData(BaseModel):
    x: List[float]
    y: List[float]
    target: float