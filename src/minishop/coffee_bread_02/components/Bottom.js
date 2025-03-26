import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function App(props){
   //console.log('Bottom');

    return(
        <>
          <ButtonGroup aria-label="Basic example">
      <Button variant="secondary">생성</Button>
      <Button variant="secondary">수정</Button>
      <Button variant="secondary">삭제</Button>
      <Button variant="secondary">카테고리 추가</Button>
    </ButtonGroup>
    <br/>
    {props.message}      
        </>
    );

}

export default App;