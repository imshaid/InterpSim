from fastapi import APIRouter, HTTPException
from app.models.schema import InputData
from app.services.newton import solve_interpolation

router = APIRouter()

@router.post("/solve")
def solve(data: InputData):
    try:
        return solve_interpolation(data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))