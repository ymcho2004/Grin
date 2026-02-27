import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect 
from fastapi.middleware.cors import CORSMiddleware
from api_routes import router
from stock_logic import get_current_price

app = FastAPI(title="Grin API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 일단 테스트니까 전부 다 허용!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "The Grin API is running!"}

#실시간 주가 쏴주는 웹소켓 통로
@app.websocket("/ws/stock/{ticker}")
async def websocket_endpoint(websocket: WebSocket, ticker: str):
    await websocket.accept()
    try:
        last_price = 0
        while True:
            # 1. 찐 가격 가져오기
            data = get_current_price(ticker)
            if data:
                current_price = data['price']
                # 2. 가격이 변했거나 처음일 때만 전송 (데이터 절약!)
                # 사실 본장 때는 계속 변하니까 거의 계속 쏠 거야
                await websocket.send_json({"price": current_price})
            
            # 3. 1초 쉬었다가 다시! (너무 빠르면 차단당하니까)
            await asyncio.sleep(0.5) 
    except WebSocketDisconnect:
        print(f"연결 종료: {ticker}")