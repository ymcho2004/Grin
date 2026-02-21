import { useParams, useNavigate } from 'react-router-dom';

export default function DetailPage() {
  // 👈 1. 주소창에서 ticker 변수를 쏙 뽑아옴! (/stock/AAPL 이면 ticker는 'AAPL'이 됨)
  const { ticker } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-[#131518] text-white font-sans min-h-screen">
      
      {/* 상단 네비게이션 (헤더) */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-gray-800 bg-[#131518]">
        <div className="flex items-center gap-10">
          <h1 onClick={() => navigate('/main')} className="text-2xl font-extrabold text-[#20d87a] tracking-tight cursor-pointer">Grin.</h1>
          <nav className="flex gap-6 text-[16px] text-gray-400 font-bold">
            <a href="#" className="hover:text-white transition-colors">홈</a>
            <a href="#" className="hover:text-white transition-colors">피드</a>
            <a href="#" className="text-white">주식 골라보기</a>
          </nav>
        </div>
        {/* 상세 페이지에서는 굳이 검색창 안 둬도 되니까 심플하게 내 정보만! */}
        <button className="bg-[#2a2c33] hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">내 정보</button>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <main className="p-8 max-w-[1600px] mx-auto">
        
        {/* 👈 2. 하드코딩했던 '엔비디아 NVDA' 대신 {ticker} 변수를 꽂아넣음! */}
        <div className="mb-6">
          <h2 className="text-4xl font-extrabold flex items-center gap-3">
            {ticker} <span className="text-gray-400 text-xl font-normal">🇺🇸</span>
          </h2>
          <div className="text-4xl font-bold mt-3 flex items-baseline gap-3">
            $ 126.50 {/* 이건 아직 가짜 데이터! */}
            <span className="text-red-500 text-lg font-bold">▼ 2.30 (1.8%)</span>
          </div>
        </div>

        {/* 3단 그리드 레이아웃 (아까 만든 그대로!) */}
        <div className="grid grid-cols-12 gap-6 h-[700px]">
          
          {/* 1. 차트 영역 */}
          <div className="col-span-7 bg-[#1c1e23] rounded-2xl p-4 border border-gray-800 flex flex-col items-center justify-center">
            <h3 className="text-gray-400 text-lg font-semibold mb-2">📈 {ticker} 실시간 캔들 차트</h3>
          </div>

          {/* 2. 중앙 영역: AI 설명 */}
          <div className="col-span-3 flex flex-col gap-6">
            <div className="bg-[#1c1e23] rounded-2xl p-5 border border-gray-800 flex-grow">
              <h3 className="text-white text-lg font-bold mb-4">🧠 Grin AI 분석</h3>
              <div className="space-y-4 text-sm text-gray-300">
                <div className="p-3 bg-[#2a2c33] rounded-lg border-l-4 border-blue-500">
                  <span className="text-blue-400 font-bold block mb-1">기술적 지표 (RSI)</span>
                  {ticker}의 현재 RSI는 32로 단기 과매도 구간입니다.
                </div>
              </div>
            </div>
            {/* 투자자 동향 */}
            <div className="bg-[#1c1e23] rounded-2xl p-5 border border-gray-800 h-[200px]">
              <h3 className="text-white text-md font-bold mb-4">투자자 동향</h3>
            </div>
          </div>

          {/* 3. 우측 영역: GNN 마인드맵 */}
          <div className="col-span-2 bg-[#1c1e23] rounded-2xl p-4 border border-gray-800 flex flex-col items-center justify-center">
            <h3 className="text-white text-md font-bold mb-2">🌐 {ticker} 섹터 관계망</h3>
          </div>

        </div>
      </main>
    </div>
  )
}