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

    function getProductList(item, index) {
        const trTag =
            <tr key={index} id={item.id}>
                <td align='center' onClick={ClickItem}>{item.name}</td>
                <td align='right' onClick={ClickItem}>{Number(item.price).toLocaleString()} 원</td>
                <td align='center' onClick={ClickItem}>{item.category === 'bread' ? '빵' : '음료수'}</td>

            </tr>
            ;
        return trTag;


    }

    const ProductList = () => {
        const dataList = contents.map(getProductList);
        return <tbody>{dataList}</tbody>;
    }

    return (
        <>
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