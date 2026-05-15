import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    // 1. 배경: 기존 화려한 그라데이션 제거. (전역 설정된 Parchment 색상이 그대로 비쳐 보임)
    <div className="flex items-center justify-center min-h-screen px-4">
      
      {/* 2. 중앙 컨텐츠 영역: 억지스러운 카드 박스와 그림자를 없애고 미니멀하게 텍스트와 폼만 남김 */}
      <div className="w-full max-w-[400px] flex flex-col items-center text-center">
        
        {/* 로고 및 타이틀 */}
        <div className="mb-12">
          {/*  아이콘 박스 */}
          <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center mb-6 mx-auto shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[#e5e5ea]">
            <span className="text-4xl">😊</span>
          </div>
          <h1 className="text-[32px] font-semibold mb-3 text-[#1d1d1f]">Grin 시작하기</h1>
          <p className="text-[#86868b] text-[17px]">S&P 500 스윙 투자의 새로운 시각</p>
        </div>
        
        {/* 버튼 영역 */}
        <div className="w-full flex flex-col gap-4">
          {/* 메인 버튼: index.css에 정의한 스타일 + 마이크로 인터랙션 */}
          <button className="btn-apple-blue btn-micro w-full py-4 text-[17px] flex items-center justify-center gap-2">
            <FcGoogle className="text-[20px]" />
            <span>구글 계정으로 계속하기</span>
          </button>
          
          {/* 서브 버튼 */}
          <button 
            onClick={() => navigate('/main')}
            className="btn-micro w-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] font-medium py-4 rounded-full text-[17px] transition-colors"
          >
            테스트 계정으로 둘러보기
          </button>
        </div>

        {/* 하단 약관 텍스트 */}
        <p className="text-[#86868b] text-[13px] mt-10 leading-relaxed px-4">
          계속 진행하면 Grin의 <span className="text-[#1d1d1f] underline cursor-pointer">이용약관</span> 및 <span className="text-[#1d1d1f] underline cursor-pointer">개인정보처리방침</span>에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}