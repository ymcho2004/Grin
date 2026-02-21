import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 주소창에 아무것도 없으면 로그인 페이지 */}
        <Route path="/" element={<LoginPage />} />
        
        {/* /main 으로 가면 메인 페이지 */}
        <Route path="/main" element={<MainPage />} />
        
        {/* /stock/NVDA 처럼 티커를 붙이면 상세 페이지 */}
        <Route path="/stock/:ticker" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;