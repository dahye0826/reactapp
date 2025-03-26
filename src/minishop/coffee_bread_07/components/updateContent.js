import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

function App(props) {
    const categories = props.categories;
    
    
    //이전에 기입했던 정보모음


    const [formData, setFormData] = useState(props.formData);

    const onSubmitUpdate = props.onSubmitUpdate;

    
    const cateList = categories.map((item,index) => 
        <option key={index} value={item.key}>{item.value}</option>);
    
    //selected = {formData.category == item.key}

    console.log('수정');
    const submittedData = (event) => {
        event.preventDefault(); //이벤트 전파 방지

        onSubmitUpdate(formData);
    }

    const InputChange = (event) => {
        //입력 양식의 값이 변경될때 마다 실행이 되는 함수입니다.
        const { name, value } = event.target;

        //prvious는 수정되기 전의 form 양식의 값 정보이다.
        //전개 연산자를 사용하지 않으면, 이전에 기입한 다른 데이터는 모두 삭제된다.
        setFormData(previous => ({ ...previous, [name]: value }));





    }

    return (
        <div>
            <h2>수정하기</h2>
            <Form action="#" method="post" onSubmit={submittedData}>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="basic-addon1">아이디</InputGroup.Text>
                    <input type="hidden" name="id" value={formData.id} onChange={InputChange}/>

                    <Form.Control type="text" name="id" value={formData.id} onChange={InputChange}
                        aria-describedby="basic-addon1 inputGroup-sizing-sm" disabled/>
                </InputGroup>

                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="basic-addon1">이름</InputGroup.Text>
                    <Form.Control type="text" name="name" value={formData.name} onChange={InputChange}
                        aria-describedby="basic-addon1 inputGroup-sizing-sm" />
                </InputGroup>

                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="basic-addon1">가격</InputGroup.Text>
                    <Form.Control type="text" name="price" value={formData.price} onChange={InputChange}
                        aria-describedby="basic-addon1 inputGroup-sizing-sm" />
                </InputGroup>

                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="basic-addon1">카테고리</InputGroup.Text>
                    <Form.Select size="sm" name="category" aria-label="카테고리 선택" value={formData.category} onChange={InputChange}>
                        <option>카테고리를 선택해 주세요.</option>
                        
                        {cateList}
                       
                    </Form.Select>
                </InputGroup>

                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="basic-addon1">재고</InputGroup.Text>
                    <Form.Control type="text" name="stock" value={formData.stock} onChange={InputChange}
                        aria-describedby="basic-addon1 inputGroup-sizing-sm" />
                </InputGroup>

                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="basic-addon1">이미지</InputGroup.Text>
                    <Form.Control type="text" name="image" value={formData.image} onChange={InputChange}
                        aria-describedby="basic-addon1 inputGroup-sizing-sm" />
                </InputGroup>

                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="basic-addon1">부가 설명</InputGroup.Text>
                    <Form.Control name="description" as="textarea" value={formData.description} onChange={InputChange} style={{ height: '100px' }} aria-describedby="basic-addon1 inputGroup-sizing-sm" />
                </InputGroup>

                <Button type="submit" value={'수정'}>수정</Button>

            </Form>
        </div>
    );
}

export default App;
