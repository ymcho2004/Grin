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

  // 👈 오직 웹소켓만 담당하는 깔끔한 useEffect!
  useEffect(() => {
    setIsLoading(true); // 처음에 로딩 띄우기
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/stock/${currentTicker}`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newPrice = data.price;

      // 가격 변동 색깔 이펙트 로직
      if (prevPrice.current !== null) {
        if (newPrice > prevPrice.current) {
          setFlash('up'); // 올랐으면 빨강 🔴
        } else if (newPrice < prevPrice.current) {
          setFlash('down'); // 내렸으면 파랑 🔵
        }
      }

      setPrice(newPrice);
      prevPrice.current = newPrice;
      setIsLoading(false); // 가격 들어왔으니 로딩 끝!

      // 0.5초 뒤에 색깔 원상복구
      setTimeout(() => setFlash('none'), 500);
    };

    // 컴포넌트 꺼질 때 전화 끊기
    return () => socket.close();
  }, [currentTicker]);

  // 👇 화면 그리는 return은 딱 한 번만!
  return (
    <div className="bg-[#131518] text-white font-sans min-h-screen">
      
      {/* 상단 헤더 */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-gray-800 bg-[#131518]">
        <div className="flex items-center gap-10">
          <h1 onClick={() => navigate('/main')} className="text-2xl font-extrabold text-[#20d87a] tracking-tight cursor-pointer">Grin.</h1>
          <nav className="flex gap-6 text-[16px] text-gray-400 font-bold">
            <a href="#" className="hover:text-white transition-colors">홈</a>
            <a href="#" className="hover:text-white transition-colors">피드</a>
            <a href="#" className="text-white">주식 골라보기</a>
          </nav>
        </div>
        <button className="bg-[#2a2c33] hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">내 정보</button>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="p-8 max-w-[1600px] mx-auto">
        
        {/* 종목명 & 반짝이는 실시간 가격 */}
        <div className="mb-6">
          <h2 className="text-4xl font-extrabold flex items-center gap-3">
            {currentTicker} <span className="text-gray-400 text-xl font-normal">🇺🇸</span>
          </h2>
          <div className="mt-3 flex items-baseline gap-3">
            {isLoading ? (
              <span className="text-gray-500 text-2xl font-bold">가져오는 중... 🏃‍♂️💨</span>
            ) : (
              <div className={`text-5xl font-bold transition-colors duration-300 ${
                flash === 'up' ? 'text-red-500' : flash === 'down' ? 'text-blue-500' : 'text-white'
              }`}>
                $ {price?.toLocaleString()}
              </div>
            )}
            {!isLoading && <span className="text-gray-500 text-lg font-bold">실시간 변동</span>}
          </div>
        </div>

        {/* 3단 그리드 (차트, AI, 관계망) */}
        <div className="grid grid-cols-12 gap-6 h-[700px]">
          
          <div className="col-span-7 bg-[#1c1e23] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
            <AdvancedRealTimeChart 
              symbol={`NASDAQ:${currentTicker}`} 
              theme="dark" 
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
            <div className="bg-[#1c1e23] rounded-2xl p-6 border border-gray-800 flex-grow shadow-xl">
              <h3 className="text-[#20d87a] text-lg font-bold mb-4 flex items-center gap-2">
                <span>🧠</span> Grin AI 분석
              </h3>
              <div className="space-y-4 text-sm text-gray-300">
                <div className="p-4 bg-[#2a2c33] rounded-xl border-l-4 border-[#20d87a]">
                  <p className="leading-relaxed">
                    {currentTicker} 모델 분석 결과, 현재 섹터 내 수급 유입 강도가 높습니다. 
                    GNN 노드상 인접 종목과의 상관계수가 높아지는 추세입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 bg-[#1c1e23] rounded-2xl p-5 border border-gray-800 shadow-xl flex flex-col">
            <h3 className="text-white text-md font-bold mb-4 flex items-center gap-2">
              <span>🌐</span> 섹터 관계망
            </h3>
            <div className="flex-grow flex items-center justify-center border border-dashed border-gray-700 rounded-xl text-gray-500 text-xs text-center">
              GNN Visualizer<br/>Coming Soon
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}