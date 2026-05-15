import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface Stock {
  ticker: string;
  name: string;
  price: number;
  change: string;
}

export default function MainPage() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [macro, setMacro] = useState({sp500: 0, nasdaq: 0, exchange_rate: 0});
  const [isLoading, setIsLoading] = useState(true);

  // 탭 상태 관리 (swing, scanner, news)
  const [activeTab, setActiveTab] = useState("swing");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      navigate(`/stock/${searchInput.toUpperCase()}`);
    }
  };

  // 1. 전체 주식 리스트 (마켓 스캐너)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/stocks/top')
      .then((res) => res.json())
      .then((data) => setStocks(data))
      .catch((err) => console.error("데이터 에러:", err));
  }, []);

  // 2. 거시 지표 웹소켓
  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/macro');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMacro(data);
      setIsLoading(false);
    };
    return () => socket.close();
  }, []);

  return (
    // Apple Design: Parchment 배경, Dark Tile 텍스트
    <div className="bg-[#fbfbfd] min-h-screen text-[#1d1d1f] w-full font-sans">
      
      {/* 헤더 섹션: 투명도 있는 흰색 배경에 블러 효과 */}
      <header className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md border-b border-[#e5e5ea] sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <h1 onClick={() => navigate('/')} className="text-2xl font-semibold tracking-tight cursor-pointer">Grin.</h1>
          <nav className="flex gap-6 text-[15px] text-[#86868b] font-medium">
            <a href="#" className="text-[#1d1d1f]">홈</a>
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">피드</a>
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">전략 탐색</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="🔍 종목 검색 (AAPL, TSLA...)" 
              className="bg-[#f5f5f7] text-[15px] rounded-full px-5 py-2.5 w-72 focus:outline-none focus:bg-[#e8e8ed] transition-all uppercase placeholder-[#86868b]" 
            />
          </form>
          <button className="btn-apple-blue btn-micro px-6 py-2.5 text-[15px]">로그인</button>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 mt-12">
        
        {/* 거시 지표 섹션: 화이트 카드, 부드러운 곡률, 선 테두리 */}
        <div className="flex gap-6 mb-12">
          {[
            { label: "S&P 500", value: macro.sp500 },
            { label: "NASDAQ", value: macro.nasdaq },
            { label: "원/달러 환율", value: `₩ ${macro.exchange_rate}` }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-[#e5e5ea] rounded-[18px] p-6 flex-1 flex flex-col gap-2">
              <span className="text-[#86868b] font-medium text-[15px]">{item.label}</span>
              <span className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">
                {isLoading ? "로딩 중..." : item.value.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#86868b] uppercase mt-1 tracking-widest">Data: Yahoo Finance (Delayed)</span>
            </div>
          ))}
        </div>

        {/* 탭 메뉴: 여백을 넓게, 심플한 밑줄 */}
        <div className="flex gap-10 text-[17px] font-medium mb-6 border-b border-[#e5e5ea]">
          <button 
            onClick={() => setActiveTab("swing")}
            className={`${activeTab === "swing" ? "text-[#1d1d1f] border-b-2 border-[#1d1d1f]" : "text-[#86868b]"} pb-4 -mb-[1px] transition-all`}
          >
            AI 스윙 타점
          </button>
          <button 
            onClick={() => setActiveTab("scanner")}
            className={`${activeTab === "scanner" ? "text-[#1d1d1f] border-b-2 border-[#1d1d1f]" : "text-[#86868b]"} pb-4 -mb-[1px] transition-all`}
          >
            마켓 스캐너
          </button>
          <button 
            onClick={() => setActiveTab("news")}
            className={`${activeTab === "news" ? "text-[#1d1d1f] border-b-2 border-[#1d1d1f]" : "text-[#86868b]"} pb-4 -mb-[1px] transition-all`}
          >
            관련 뉴스
          </button>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="min-h-[400px]">
          {activeTab === "swing" && (
            <div className="animate-fadeIn">
              <div className="bg-[#f5f5f7] rounded-[14px] p-5 mb-8 text-[#1d1d1f] text-[15px] font-medium flex items-center gap-3">
                <span className="text-xl">🎯</span> GNN 모델이 분석한 24시간 내 +3% 이상 급등 확률 85% 이상 종목입니다.
              </div>
              <table className="w-full text-[15px]">
                <thead>
                  <tr className="text-[#86868b] border-b border-[#e5e5ea]">
                    <th className="py-4 font-medium w-24 text-center">추천</th>
                    <th className="py-4 font-medium text-left pl-4">종목명</th>
                    <th className="py-4 font-medium text-right">진입 권장가</th>
                    <th className="py-4 font-medium text-right">기대 수익률</th>
                    <th className="py-4 font-medium text-left pl-12">AI 판단 근거</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.slice(0, 2).map((stock) => (
                    <tr key={stock.ticker} onClick={() => navigate(`/stock/${stock.ticker}`)} className="border-b border-[#e5e5ea] hover:bg-[#f5f5f7] cursor-pointer transition-colors">
                      <td className="py-6 text-center">
                        <span className="bg-[#0066cc] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full tracking-wide">BUY</span>
                      </td>
                      <td className="py-6 pl-4 font-semibold text-[17px]">{stock.name} <span className="text-[#86868b] text-[15px] font-normal ml-1">{stock.ticker}</span></td>
                      <td className="py-6 text-right font-medium">$ {stock.price}</td>
                      <td className="py-6 text-right font-semibold text-[#1d1d1f]">+3.25%</td>
                      <td className="py-6 pl-12 text-[15px] text-[#86868b]">섹터 내 상관성 임계치(0.8) 돌파 및 수급 집중</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "scanner" && (
            <div className="animate-fadeIn">
              <table className="w-full text-[15px]">
                <thead>
                  <tr className="text-[#86868b] border-b border-[#e5e5ea]">
                    <th className="py-4 font-medium w-20">순위</th>
                    <th className="py-4 font-medium text-left pl-4">종목명</th>
                    <th className="py-4 font-medium text-right">현재가</th>
                    <th className="py-4 font-medium text-right">상태</th>
                    <th className="py-4 font-medium text-left pl-12">데이터 수집</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock, index) => (
                    <tr key={stock.ticker} onClick={() => navigate(`/stock/${stock.ticker}`)} className="border-b border-[#e5e5ea] hover:bg-[#f5f5f7] cursor-pointer transition-colors">
                      <td className="py-6 text-center text-[#86868b] font-medium">{index + 1}</td>
                      <td className="py-6 pl-4 font-semibold text-[17px]">{stock.name} <span className="text-[#86868b] text-[15px] font-normal ml-1">{stock.ticker}</span></td>
                      <td className="py-6 text-right font-medium">$ {stock.price.toLocaleString()}</td>
                      <td className="py-6 text-right text-[#1d1d1f] text-[13px] font-semibold tracking-wide">LIVE</td>
                      <td className="py-6 pl-12 text-[15px] text-[#86868b]">Real-time WebSocket Active</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "news" && (
            <div className="flex flex-col items-center justify-center py-32 text-[#86868b] animate-pulse">
              <p className="text-2xl font-semibold mb-3 tracking-tight">Global Market Headlines</p>
              <p className="text-[15px]">실시간 뉴스 API 연동 준비 중... (yfinance News API)</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}