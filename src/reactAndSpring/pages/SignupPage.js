import { Button, Container, Form, Alert } from "react-bootstrap";

import axios from 'axios' ;
import { useState } from "react";

// 특정한 페이지로 이동을 시킬 때 사용하는 hook
import { useNavigate } from "react-router-dom";

function App() {
    // 파라미터 관련 state 변수 선언
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();

    // 예외 관련 state 변수 선언
    // 오류 메시지 객체
    const [errors, setErrors] = useState({
        name: "", email: "", password: "", address: "", general: ""
    });

    const handleSignup = async (event) => {
        event.preventDefault();

        /* spring boot에게 post 방식으로 전달 */
        try{
            /* response는 응답 객체 */
            const response = await axios.post(
                "http://localhost:9000/member/signup", {
                name, email, password, address
            });

            // http 응답 코드 201은 요청 성공이고, 새로운 리스소 생성시 서버가 반환해주는 코드 
            if(response.status === 201){ 
                alert('회원 가입 성공');                
                navigate('/member/login') ; // 로그인 페이지로 이동
            }
        }catch(error){
            if(error.response && error.response.data){
                setErrors(error.response.data); // 서버에서 받은 오류 메시지를 객체로 저장
            }else{ // 다른 오류 메시지 
                setErrors(prevErrors => ({ ...prevErrors, general: "회원 가입 중 오류가 발생하였습니다." }));
            }
        }
    };

    return (
        <Container className="mt-5" style={{ height: '70vh' }}>
            <h2 className="text-center mb-4">회원 가입</h2>

            {/* 일반 오류 메시지 표시 (예: 서버 오류) */}
            {errors.general && <Alert variant="danger">{errors.general}</Alert>}

            <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3 d-flex align-items-center" controlId="forName">
                    <Form.Label className="me-3 d-flex align-items-center" style={{ whiteSpace: "nowrap" }}>이름</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="이름을(를) 입력해 주세요."
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        isInvalid={!!errors.name} // 오류가 있으면 빨간색 표시
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>                
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center" controlId="forEmail">
                    <Form.Label className="me-3 d-flex align-items-center" style={{ whiteSpace: "nowrap" }}>이메일</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="이메일을(를) 입력해 주세요."
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        isInvalid={!!errors.email}
                        required
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center" controlId="forPassword">
                    <Form.Label className="me-3 d-flex align-items-center" style={{ whiteSpace: "nowrap" }}>비밀 번호</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="비밀 번호을(를) 입력해 주세요."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        isInvalid={!!errors.password}
                        required
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center" controlId="forAddress">
                    <Form.Label className="me-3 d-flex align-items-center" style={{ whiteSpace: "nowrap" }}>주소</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="주소을(를) 입력해 주세요."
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        isInvalid={!!errors.address}
                        required
                    />
                    <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    회원 가입
                </Button>
            </Form>
        </Container>
    );
}

export default App;