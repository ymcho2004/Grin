from fastapi import APIRouter
from stock_logic import get_current_price, get_top_sp500

router = APIRouter()

@router.get("/api/stock/{ticker}")
async def fetch_stock(ticker: str):
    result = get_current_price(ticker)
    if result is None:
        return {"error" : "Stock not found"}
    return result

@router.get("/api/stocks/top")
async def fetch_top_stocks():
    return get_top_sp500()