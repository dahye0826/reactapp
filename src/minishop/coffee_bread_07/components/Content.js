import { Dropdown, Form, ListGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function App(props) {
    var contents = props.contents; //상품 여러개를 가지고있는 배열
    console.log(contents);

    var onClickToContent = props.onClickToContent;

    /*<td> 태그 클릭시 실행될 함수*/
    const ClickItem = (event) => {

        //이벤트가 발생된 객체의 부모의 id 값을 읽어온다.
        const itemId = event.target.parentNode.id;

        //부모 App에 id 를 넘겨준다.
        onClickToContent(itemId);
    }

    var categories = props.categories;



    function getProductList(item, index) {

        // var hangul = '';

        // switch (item.category) {
        //     case 'bread':
        //         hangul = '빵';
        //         break;
        //     case 'beverage':
        //         hangul = '음료수';
        //         break;
        //     case 'cake':
        //         hangul = '케익';
        //         break;

        // }

        const findItem = categories.find((element) => element.key === item.category);

        var hangul = findItem ? findItem.value: '';


        const trTag =
            <tr key={index} id={item.id}>
                <td align='center' onClick={ClickItem}>{item.name}</td>
                <td align='right' onClick={ClickItem}>{Number(item.price).toLocaleString()} 원</td>
                <td align='center' onClick={ClickItem}>{hangul}</td>

            </tr>
            ;
        return trTag;


    }

    const ProductList = () => {
        const dataList = contents.map(getProductList);
        return <tbody>{dataList}</tbody>;
    }

    /*정렬할 컬럼과 정렬 방식*/
    var onOrderByClick=props.onOrderByClick;
    var orderInfo= props.orderInfo; /* 넘겨받은 정렬 정보*/
    
    const ClickButtonGroup = (event) =>{
        event.preventDefault();
        const target_id = event.target.id;
        
        
        
        const columns = ['name','price','category'];
        const bool = columns.includes(target_id);
        
        if(bool){
            onOrderByClick(target_id, orderInfo.ordering);

        }else{ /*정렬 방식을 클릭했다면...*/ 
            onOrderByClick(orderInfo.column,target_id);
        };

    }

    //필드 검색 기능으로 추가됨
    const onChangeCategory = props.onChangeCategory;

    const ChangedItem = (event) => {
       
        const SelectedCategory = event.target.value;
        //선택한 option의 영문 이름을 넘겨줍니다.
        onChangeCategory(SelectedCategory); 
    }
    //카테고리 목록을 반복하여 변수로 만들고, 콤보박스에 동적으로 추가하기
    
    const cateList = categories.map((item,index) =>
        <option key={index} value={item.key}>{item.value}</option>
    );



    return (
        <>
             <Table>
                <tbody>
                    <tr>
                        <td width="10%" valign="middle">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">정렬할 컬럼</Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item id="name" onClick={ClickButtonGroup} >이름</Dropdown.Item>

                                    <Dropdown.Item id="price" onClick={ClickButtonGroup} >가격</Dropdown.Item>

                                    <Dropdown.Item id="category" onClick={ClickButtonGroup} >카테고리</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                        <td valign="middle">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">정렬 방식</Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item id="asc" onClick={ClickButtonGroup}>오름차순</Dropdown.Item>

                                    <Dropdown.Item id="desc" onClick={ClickButtonGroup} >내림차순</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                        <td valign="middle">
                            <ListGroup horizontal>
                                <ListGroup.Item>
                                    정렬할 컬럼 : {orderInfo.column}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    정렬 방식 : {orderInfo.ordering =='asc'?'오름차순':'내림차순'}
                                </ListGroup.Item>
                            </ListGroup>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div>
            <Form.Select size="sm" name="category" onChange= {ChangedItem} required defaultValue="" aria-label="카테고리 선택">
               <option value="all">전체 보기</option> 
               {cateList}
            </Form.Select>
         </div>

            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>이름</th>
                        <th>가격</th>
                        <th>카테고리</th>
                    </tr>
                </thead>
                {ProductList()}
            </Table>
        </>
    );

}

export default App;