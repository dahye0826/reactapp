import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function App(props){
   //console.log('Bottom');
   const onClickTobottom= props.onClickTobottom;

const ClickItem = (event) =>{

    
const targetId = event.target.id;
onClickTobottom(targetId)

}

    return(
        <>
          <ButtonGroup aria-label="Basic example">
      <Button id="get_insert" onClick={ClickItem} variant="secondary">생성</Button>
      <Button id="get_update" onClick={ClickItem} variant="secondary">수정</Button>
      <Button id="get_delete" onClick={ClickItem} variant="secondary">삭제</Button>
      <Button id="get_category_add" onClick={ClickItem} variant="secondary">카테고리 추가</Button>
    </ButtonGroup>
    <br/>
    {props.message}      
        </>
    );

}

export default App;