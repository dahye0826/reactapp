import 'bootstrap/dist/css/bootstrap.min.css'; // 부트 스트랩 스타일

import { Container, Nav, Navbar } from 'react-bootstrap';

// 웹 페이지 요청에 따른 라우팅 관련 코드
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// 라우팅 관련 컴포넌트
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductInsertForm from './pages/ProductInsertForm';
import ProductUpdateForm from './pages/ProductUpdateForm';
import CartList from './pages/CartList';

import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    // 로그인 여부를 알 수 있는 사용자 정보
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
           
    // 브라우저의 localStorage에서 "user" 값을 가져온다.
    //localStorage는 문자열만 저장할 수 있기때문에 제이슨 형식으로 바꿔줘야한다.
    // 우리는 한번만 rendering되어야 하므로, 빈 배열 []을 2번째 매개 변수로 넣어 줍니다.
    //
    useEffect(() => {
        const loginUser = localStorage.getItem('user');
        setUser(JSON.parse(loginUser)); // 로컬 스토리지에서 데이터 읽어 오기
    }, []); 

    const handleLoginSuccess = (userData) => {
        // userData : 로그인 페이지에서 넘겨 주는 로그인한 사용자 정보 
        setUser(userData);
        // 로컬 스토리지에 데이터 저장
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('로그인 추카해요');
    };


    const handleLogout = (event) => {
        event.preventDefault() ;
        
        axios.post("http://localhost:9000/member/logout")
            .then(() => {
                setUser(null); // 미로그인 상태로 변환
                localStorage.removeItem('user');
                console.log('로그 아웃 성공');
                navigate("/member/login");
            })
            .catch((error) => {
                console.log('로그 아웃 실패', error);
            }) ;
    };

    const MenuItems = () => {  

        switch (user?.role) {
            case 'ADMIN':
                return (
                    <>
                        <Nav.Link onClick={() => navigate('/product/list')}>상품 보기</Nav.Link>
                        <Nav.Link onClick={() => navigate('/product/insert')}>상품 등록</Nav.Link>
                        <Nav.Link href='/member/login' onClick={handleLogout}>로그 아웃</Nav.Link>
                    </>
                );
            case 'USER':
                return (
                    <>
                        <Nav.Link onClick={() => navigate('/product/list')}>상품 보기</Nav.Link>
                        <Nav.Link onClick={() => navigate('cart/list')}>장바구니</Nav.Link>
                        <Nav.Link onClick={() => navigate('order/list')}>주문 내역</Nav.Link>
                        <Nav.Link href='/member/login' onClick={handleLogout}>로그 아웃</Nav.Link>
                    </>
                );
            default:
                return (
                    <>
                        <Nav.Link onClick={() => navigate('/product/list')}>상품 보기</Nav.Link>
                        <Nav.Link onClick={() => navigate('/member/login')}>로그인</Nav.Link>
                        <Nav.Link onClick={() => navigate('/member/signup')}>회원 가입</Nav.Link>   
                    </>
                );
        }
    };


    return (
        <>
            {/* 상단 네비게이션 바 */}
            <Navbar bg='dark' variant='dark' expand='lg'>
                <Container>
                    <Navbar.Brand href='/'>
                        Ict Coffee Shop
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <MenuItems />
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                {/* path에는 요청 url 정보, element에는 컴포넌트 이름 */}
                <Route path='/' element={<HomePage />} /> {/* 홈 페이지 */}
                <Route path='/member/login' element={<LoginPage setUser={handleLoginSuccess} />} />
                <Route path='/member/signup' element={<SignupPage />} />

                {/* 로그인 여부에 따라서 상품 목록 페이지가 다르게 보여야 하므로, user를 넘겨 줍니다. */}
                <Route path='/product/list' element={<ProductList user={user} />} /> 
                <Route path='/product/insert' element={<ProductInsertForm />} />
                <Route path='/product/update/:id' element={<ProductUpdateForm />} />

                {/* 장바구니 목록 페이지(user 넘겨줌) */}
                <Route path='/cart/list' element={<CartList user={user} />} /> 


                {/* 미로그인시 [장바구니]와 [구매하기] 기능은 선택 불가능해야 하므로, user를 넘겨 줍니다. */}
                <Route path='/product/detail/:id' element={<ProductDetail user={user} />} /> 
            </Routes>

            {/* 푸터 */}
            <footer className="bg-dark text-light text-center py-3 mt-5">
                <p>© 2025 ICT Coffee Shop. All rights reserved.</p>
            </footer>
        </>
    );
}

export default App;