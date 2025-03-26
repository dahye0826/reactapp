import { Button, Form, InputGroup } from "react-bootstrap";

function App(props){
   const onSubmitCategoryAdd = props.onSubmitCategoryAdd;

   const onSubmitCategory = (event) => {
      event.preventDefault();
      const formObject = event.target;/*폼 양식 객체 (폼양식 전체를 말함)*/
      onSubmitCategoryAdd( formObject );
;    }
 
   return(
       <div>
         <h2>카테고리 추가</h2>
         <Form action="#" method="post" onSubmit={onSubmitCategory}>
            <InputGroup size="sm" className="mb-3">
               <InputGroup.Text id="basic-addon1">영문 이름</InputGroup.Text>
               <Form.Control type="text" name="key"
               aria-describedby="basic-addon1 inputGroup-sizing-sm"/>
            </InputGroup> 
            
            <InputGroup size="sm" className="mb-3">
               <InputGroup.Text id="basic-addon1">한글 이름</InputGroup.Text>
               <Form.Control type="text" name="value"
               aria-describedby="basic-addon1 inputGroup-sizing-sm"/>
            </InputGroup>  
            <Button type="submit" value={'카테고리 추가'}>카테고리 추가</Button>  
            </Form>
         
         </div>
   );
}

export default App;