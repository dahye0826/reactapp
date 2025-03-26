import Table from 'react-bootstrap/Table';


function App(props) {
    const product = props.selectedProduct;
    console.log('product');
    console.log(product);
    return (
        <div className="table-padding">
            <Table>
                <tbody>
                    <tr>
                        <td width="40%">
                             <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>아이디</td>
                                    <td>{product.id}</td>                               
                                </tr>
                                <tr>
                                    <td>이름</td>
                                    <td>{product.name}</td>                               
                                </tr>
                                <tr>
                                    <td>단가</td>
                                    <td>{Number(product.price).toLocaleString()}</td>                               
                                </tr>
                                <tr>
                                    <td>카테고리</td>
                                    <td>{product.category}</td>                               
                                </tr>
                                <tr>
                                    <td>재고</td>
                                    <td>{Number(product.stock).toLocaleString()}</td>                               
                                </tr>
                            </tbody>
                        </Table></td>
                        <td>
                            <img src={'/images/' +product.image} alt={product.name} width="210" height="210"/>
                        </td>
                        <td>
                            <p className="description">
                                {product.description}
                            {product.description} 
                            </p>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>

    );
}

export default App;