import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    // 1. 배경: 토스 느낌의 은은한 다크 블루 그라데이션 적용
    <div 
      className="flex items-center justify-center min-h-screen text-white px-4"
      style={{
        background: 'radial-gradient(ellipse at top, #1a1c2e 0%, #131518 50%, #131518 100%)'
      }}
    >
      
      {/* 2. 중앙 카드 modal 영역 */}
      <div className="w-full max-w-[440px] bg-[#1c1e23]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-800/50 shadow-2xl relative overflow-hidden">
        
        {/* 카드 내부 은은한 파란색 빛 효과 (데코레이션) */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/30 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* 실제 컨텐츠 (relative로 띄워야 빛 효과 위에 올라옴) */}
        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* 로고 및 타이틀 */}
          <div className="mb-10">
            <div className="w-20 h-20 bg-[#2a2c33] rounded-[1.5rem] flex items-center justify-center mb-5 mx-auto shadow-inner border border-gray-700/50">
              <span className="text-4xl">😊</span>
            </div>
            <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Grin 시작하기</h1>
            <p className="text-gray-400 text-[15px] font-medium">S&P 500 스윙 투자의 새로운 시각</p>
          </div>
          
          {/* 버튼 영역 */}
          <div className="w-full flex flex-col gap-3">
            {/* 메인 버튼: 구글 로그인 (토스 파란색 버튼 느낌) */}
            <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-[16px] transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 relative group overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300"></div>
              <FcGoogle className="text-2xl relative z-10" />
              <span className="relative z-10">구글 계정으로 계속하기</span>
            </button>
            
            {/* 서브 버튼: 테스트 계정 */}
            <button 
            onClick={() => navigate('/main')}
            className="w-full bg-[#2a2c33] hover:bg-[#35373f] text-gray-200 font-bold py-4 rounded-2xl text-[16px] transition-all border border-gray-700/50">
              테스트 계정으로 둘러보기
            </button>
          </div>

          <p className="text-gray-500 text-xs mt-8">
            계속 진행하면 Grin의 <span className="underline cursor-pointer">이용약관</span> 및 <span className="underline cursor-pointer">개인정보처리방침</span>에 동의하게 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}