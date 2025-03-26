import Table from 'react-bootstrap/Table';

function App(props){
    var contents = props.contents; //상품 여러개를 가지고있는 배열
    console.log(contents);
    
    function getProductList(item,index){
        const trTag=
            <tr key={index}>
                <td align='center'>{item.name}</td>                
                <td align='right'>{Number(item.price).toLocaleString()} 원</td>                
                <td align='center'>{item.category==='bread'? '빵': '음료수'}</td>                

            </tr>
        ;
        return trTag;


    }

    const ProductList = () => {
        const dataList = contents.map(getProductList);
        return <tbody>{dataList}</tbody>;
    }

    return(
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