import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // 👈 useEffect 꼭 필요함!

interface Stock {
  ticker: string;
  name: string;
  price: number;
  change: string;
}

export default function MainPage() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  
  // 👈 오타 수정 완료 (setStcoks -> setStocks)
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      navigate(`/stock/${searchInput.toUpperCase()}`);
    }
  };

  // 👈 백엔드에서 찐 데이터 긁어오는 핵심 로직 추가!
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/stocks/top')
      .then((res) => res.json())
      .then((data) => {
        setStocks(data); // 백엔드에서 받은 5개 리스트를 state에 저장
        setIsLoading(false); // 로딩 끝!
      })
      .catch((err) => {
        console.error("데이터 가져오다 에러남:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#131518] min-h-screen text-white w-full font-sans">
      
      {/* 1. 토스 PC버전 스타일 넓은 헤더 */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-gray-800 bg-[#131518]">
        <div className="flex items-center gap-10">
          <h1 
            onClick={() => navigate('/')}
            className="text-2xl font-extrabold text-[#20d87a] tracking-tight cursor-pointer">Grin.</h1>
          <nav className="flex gap-6 text-[16px] text-gray-400 font-bold">
            <a href="#" className="text-white">홈</a>
            <a href="#" className="hover:text-white transition-colors">피드</a>
            <a href="#" className="hover:text-white transition-colors">주식 골라보기</a>
            <a href="#" className="hover:text-white transition-colors">내 계좌</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="🔍 / 를 눌러 검색하세요" 
              className="bg-[#2a2c33] text-[14px] rounded-lg px-4 py-2.5 w-72 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all uppercase" 
            />
          </form>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-[14px] font-bold transition-colors">
            로그인
          </button>
        </div>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <main className="max-w-[1400px] mx-auto px-6 mt-8">
        
        {/* 2. 상단 지수 전광판 */}
        <div className="flex gap-8 overflow-x-auto pb-6 mb-8 border-b border-gray-800">
          <div className="flex-shrink-0 cursor-pointer">
            <p className="text-gray-400 text-[13px] font-semibold mb-1">S&P 500</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-bold">5,842.10</h3>
              <span className="text-red-500 text-sm font-bold">+12.30 (0.2%)</span>
            </div>
          </div>
          <div className="w-[1px] bg-gray-800 my-1"></div>
          <div className="flex-shrink-0 cursor-pointer">
            <p className="text-gray-400 text-[13px] font-semibold mb-1">나스닥</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-bold">22,886.06</h3>
              <span className="text-red-500 text-sm font-bold">+203.34 (0.89%)</span>
            </div>
          </div>
          <div className="w-[1px] bg-gray-800 my-1"></div>
          <div className="flex-shrink-0 cursor-pointer">
            <p className="text-gray-400 text-[13px] font-semibold mb-1">달러 환율</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-bold">1,452.00</h3>
              <span className="text-red-500 text-sm font-bold">+1.3 (0.08%)</span>
            </div>
          </div>
        </div>

        {/* 3. 리스트 탭 메뉴 */}
        <div className="flex gap-6 text-[17px] font-bold mb-4 border-b border-gray-800">
          <button className="text-white border-b-2 border-white pb-3 -mb-[2px]">🔥 AI 스윙 타점</button>
          <button className="text-gray-500 hover:text-gray-300 pb-3">실시간 차트</button>
          <button className="text-gray-500 hover:text-gray-300 pb-3">투자자 동향</button>
        </div>

        {/* 4. 종목 리스트 테이블 */}
        <div className="w-full text-left">
          {/* 테이블 헤더 */}
          <div className="flex text-gray-400 text-[13px] font-semibold py-3 border-b border-gray-800">
            <div className="w-16 text-center">순위</div>
            <div className="flex-1 pl-4">종목명</div>
            <div className="w-40 text-right">현재가</div>
            <div className="w-40 text-right">예상 등락률</div>
            <div className="w-80 text-left pl-12">AI 분석 근거</div>
          </div>

          {/* 👈 하드코딩 날려버리고 데이터 자동 매핑! */}
          {isLoading ? (
            <div className="text-center py-20 text-gray-400 text-lg font-bold">
              yfinance 서버에서 찐 데이터 긁어오는 중... 🏃‍♂️💨
            </div>
          ) : (
            stocks.map((stock, index) => (
              <div 
                key={stock.ticker}
                onClick={() => navigate(`/stock/${stock.ticker}`)}
                className="flex items-center py-4 border-b border-gray-800/50 hover:bg-[#1c1e23] cursor-pointer transition-colors"
              >
                <div className="w-16 text-center text-gray-400 font-bold">{index + 1}</div>
                <div className="flex-1 flex items-center gap-3 pl-4">
                  <div className="w-8 h-8 bg-[#2a2c33] rounded-full flex items-center justify-center text-xs border border-gray-700 font-bold">
                    {stock.ticker[0]}
                  </div>
                  <h4 className="font-bold text-[16px]">
                    {stock.name} <span className="text-gray-500 text-[13px] ml-1 font-normal">{stock.ticker}</span>
                  </h4>
                </div>
                <div className="w-40 text-right font-bold text-[16px]">$ {stock.price.toLocaleString()}</div>
                <div className="w-40 text-right text-gray-400 font-bold text-[16px]">-</div>
                <div className="w-80 text-left pl-12 text-gray-500 text-[14px]">분석 데이터 로딩 중...</div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}