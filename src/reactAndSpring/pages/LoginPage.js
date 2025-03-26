import { useState } from "react";
import { Button, Card, Container, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App({setUser}) {
    // setUser : 메인 페이지에서 넘겨 주는 props(로그인 여부를 저장)

    // 로그인 관련 state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // 오류 메시지 관련 state
    const [error, setError] = useState('');
    
    const handleLogin = async (event) => {
        event.preventDefault();

        try{
            const response = await axios.post(
                "http://localhost:9000/member/login", 
                { email, password}
            );
            // message : 로그인 성공 여부 메시지
            // member : 로그인 한 회원의 정보
            const {message, member} = response.data ;

            if(message === '로그인 성공'){
                console.log(member) ;
                setUser(member) ; // 로그인 성공시 사용자 정보 저장하기
                navigate('/') ; // 홈 페이지로 이동

            }else{
                // 로그인 실패 메시지(예시 : email, 비밀 번호 오류 등등)
                setError(message);
            }
        }catch(error){
            if(error.response){
                setError(error.response.data.message || '로그인 실패');
            }else{
                setError('Server Error');
            }
        };
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">로그인</h2>

                    {/* 오류 메시지 표시 */}
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="이메일을 입력하세요"
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="d-block w-100">
                            로그인
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default App;