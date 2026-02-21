import yfinance as yf

def get_top_sp500():
    tickers = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA"]
    result = []
    
    for ticker in tickers:
        stock = yf.Ticker(ticker)
        data = stock.history(period="1d") # 오늘 토요일 밤이라 금요일 종가 가져올 거임!
        
        if not data.empty:
            close_price = round(data['Close'].iloc[-1], 2)
            result.append({
                "ticker": ticker,
                "name": ticker,
                "price": close_price,
                "change": "+0.00%" # 등락률 계산은 다음 단계에서!
            })
            
    return result

def get_current_price(ticker: str):
    stock = yf.Ticker(ticker)
    data = stock.history(period="1d")

    if data.empty:
        return None
    
    return {
        "ticker" : ticker.upper(),
        "price" : round(data["Close"].iloc[-1], 2),
    }
