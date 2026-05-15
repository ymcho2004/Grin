import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

export default function DetailPage() {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const currentTicker = ticker?.toUpperCase() || "NVDA";

  // 상태 관리 바구니들
  const [price, setPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [flash, setFlash] = useState<'up' | 'down' | 'none'>('none');
  const prevPrice = useRef<number | null>(null);

  // 오직 웹소켓만 담당하는 깔끔한 useEffect!
  useEffect(() => {
    setIsLoading(true);
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/stock/${currentTicker}`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newPrice = data.price;

      if (prevPrice.current !== null) {
        if (newPrice > prevPrice.current) {
          setFlash('up');
        } else if (newPrice < prevPrice.current) {
          setFlash('down');
        }
      }

      setPrice(newPrice);
      prevPrice.current = newPrice;
      setIsLoading(false);

      setTimeout(() => setFlash('none'), 500);
    };

    return () => socket.close();
  }, [currentTicker]);

  return (
    <div className="bg-[#fbfbfd] text-[#1d1d1f] font-sans min-h-screen">
      
      {/* 상단 헤더 */}
      <header className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md border-b border-[#e5e5ea] sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <h1 onClick={() => navigate('/main')} className="text-2xl font-semibold tracking-tight cursor-pointer">Grin.</h1>
          <nav className="flex gap-6 text-[15px] text-[#86868b] font-medium">
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">홈</a>
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">피드</a>
            <a href="#" className="text-[#1d1d1f]">주식 골라보기</a>
          </nav>
        </div>
        <button className="bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] btn-micro px-4 py-2 rounded-full text-[15px] font-medium transition-colors">내 정보</button>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="p-8 max-w-[1400px] mx-auto mt-6">
        
        {/* 종목명 & 반짝이는 실시간 가격 (거대한 타이포그래피 강조) */}
        <div className="mb-10 text-center">
          <h2 className="text-[40px] font-semibold tracking-tight mb-2 flex items-center justify-center gap-2">
            {currentTicker} <span className="text-[#86868b] text-2xl font-normal">🇺🇸</span>
          </h2>
          <div className="flex items-baseline justify-center gap-3">
            {isLoading ? (
              <span className="text-[#86868b] text-3xl font-medium">가져오는 중...</span>
            ) : (
              <div className={`text-[64px] font-semibold tracking-tight transition-colors duration-300 ${
                // 애플 스타일의 직관적인 상승(레드)/하락(블루) 컬러 사용
                flash === 'up' ? 'text-[#ff3b30]' : flash === 'down' ? 'text-[#007aff]' : 'text-[#1d1d1f]'
              }`}>
                $ {price?.toLocaleString()}
              </div>
            )}
            {!isLoading && <span className="text-[#86868b] text-[17px] font-medium">실시간 변동</span>}
          </div>
        </div>

        {/* 3단 그리드 (차트, AI, 관계망) */}
        <div className="grid grid-cols-12 gap-8 h-[650px]">
          
          {/* 제품(차트) 영역: 이 부분에만 부드러운 그림자를 부여하여 갤러리 액자처럼 연출 */}
          <div className="col-span-7 bg-white rounded-[24px] border border-[#e5e5ea] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <AdvancedRealTimeChart 
              symbol={`NASDAQ:${currentTicker}`} 
              theme="light" /* 다크에서 라이트로 변경 */
              autosize 
              allow_symbol_change={false}
              hide_top_toolbar={false}
              hide_side_toolbar={false}
              interval="D" 
              timezone="Etc/UTC"
              style="1" 
              locale="kr"
            />
          </div>

          <div className="col-span-3 flex flex-col gap-6">
            <div className="bg-[#f5f5f7] rounded-[24px] p-8 flex-grow">
              <h3 className="text-[#1d1d1f] text-[17px] font-semibold mb-6 flex items-center gap-2 tracking-tight">
                <span className="text-xl">🧠</span> Grin AI 분석
              </h3>
              <div className="space-y-4 text-[15px] text-[#1d1d1f] leading-relaxed">
                <p>
                  {currentTicker} 모델 분석 결과, 현재 섹터 내 수급 유입 강도가 높습니다. 
                  GNN 노드상 인접 종목과의 상관계수가 높아지는 추세입니다.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-2 bg-[#f5f5f7] rounded-[24px] p-8 flex flex-col">
            <h3 className="text-[#1d1d1f] text-[17px] font-semibold mb-6 flex items-center gap-2 tracking-tight">
              <span className="text-xl">🌐</span> 섹터 관계망
            </h3>
            <div className="flex-grow flex items-center justify-center text-[#86868b] text-[15px] text-center font-medium">
              GNN Visualizer<br/>Coming Soon
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}