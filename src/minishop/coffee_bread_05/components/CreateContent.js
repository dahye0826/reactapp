import { Button, Form, InputGroup } from "react-bootstrap";



function App(props){
    
    const onsubmintInsert = props.onsubmintInsert;

    //기존에 hard coding 되어있는 카테고리 정보를 동적으로 만들어주기 위한 것입니다.
    const categories = props.categories;

    const cateList = categories.map((item,index)=> 
      <option key={index} value={item.key}>{item.value}</option>
      
   );



    const submittedData = (event) => {
        event.preventDefault();
        const formObject = event.target;/*폼 양식 객체 (폼양식 전체를 말함)*/
        onsubmintInsert(formObject);
;    }
     
    
    return(
        <div>
            <h2>생성하기</h2>
        <Form action="#" method="post" onSubmit={submittedData}>
            <InputGroup size="sm" className="mb-3">
               <InputGroup.Text id="basic-addon1">이름</InputGroup.Text>
               <Form.Control type="text" name="name"
               aria-describedby="basic-addon1 inputGroup-sizing-sm"/>
            </InputGroup> 
            
            <InputGroup size="sm" className="mb-3">
               <InputGroup.Text id="basic-addon1">가격</InputGroup.Text>
               <Form.Control type="text" name="price"
               aria-describedby="basic-addon1 inputGroup-sizing-sm"/>
            </InputGroup>  

            <InputGroup size="sm" className="mb-3">
               <InputGroup.Text id="basic-addon1">카테고리</InputGroup.Text>
               <Form.Select size="sm" name="category" aria-label="카테고리 선택" defaultValue="">
                  <option value="" >카테고리를 선택해 주세요.</option>
             {cateList} {/*동적으로 생성함 */}
               </Form.Select>
            </InputGroup>
            
            <InputGroup size="sm" className="mb-3">
               <InputGroup.Text id="basic-addon1">재고</InputGroup.Text>
               <Form.Control type="text" name="stock"
               aria-describedby="basic-addon1 inputGroup-sizing-sm"/>
            </InputGroup>  
            
            <InputGroup size="sm" className="mb-3">
               <InputGroup.Text id="basic-addon1">이미지</InputGroup.Text>
               <Form.Control type="text" name="image"
               aria-describedby="basic-addon1 inputGroup-sizing-sm"/>
            </InputGroup>     

                <InputGroup size="sm" className="mb-3">
               <InputGroup.Text id="basic-addon1">부가 설명</InputGroup.Text>             
               <Form.Control name="description" as="textarea" style={{height: '100px'}} aria-describedby="basic-addon1 inputGroup-sizing-sm"/>
            </InputGroup>
            
            <Button type="submit" value={'생성'}>생성</Button>  
                
            </Form>
        </div>
    );
}

export default App;