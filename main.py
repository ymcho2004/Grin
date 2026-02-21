from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api_routes import router

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
