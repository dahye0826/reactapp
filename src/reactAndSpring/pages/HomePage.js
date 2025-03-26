import { Carousel, Container } from "react-bootstrap";

function App() {
    return (
        <Container className="mt-4">
            <Carousel>
                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src="http://localhost:9000/images/chicago.jpg"
                        alt="시카고"
                    />
                    <Carousel.Caption>
                        <h3>시카고</h3>
                        <p>미국 중서부의 경제 중심지로, 건축과 재즈 음악의 도시.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src="http://localhost:9000/images/la.jpg"
                        alt="LA"
                    />
                    <Carousel.Caption>
                        <h3>LA</h3>
                        <p>할리우드가 있는 엔터테인먼트 도시이자, 따듯한 기후와 해변이 매력.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src="http://localhost:9000/images/ny.jpg"
                        alt="뉴욕"
                    />
                    <Carousel.Caption>
                        <h3>뉴욕</h3>
                        <p>세계 금융과 문화의 중심지로, 타임스퀘어와 브로드웨이가 유명.</p>
                    </Carousel.Caption>
                </Carousel.Item>                                
            </Carousel>
        </Container>
    );
}

export default App;
