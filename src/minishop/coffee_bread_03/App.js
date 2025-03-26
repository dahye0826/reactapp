import './App.css'; //스타일 입힘
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// import 앱이름 from '.comoponents/파일이름';
import Top from './components/Top';
import Bottom from './components/Bottom';
import Content from './components/Content';
import Display from './components/Display';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/updateContent';

import { useState } from 'react';


function App() {
    const title = 'React 맛집';
    const comment = '어서오세요~~맛있는 빵과 음료수가 많이 있습니다.';
    const message = '카운터에서 주문해주시고, 즐거운 시간 되시길 바랍니다.';

    const [products, setproducts] = useState([
        { id: 1, name: "프렌치 바게트", price: 1000, category: 'bread', stock: 111, image: 'french_baguette_01.png', description: "프랑스의 대표적인 빵 중 하나로, 길쭉하고 얇은 형태의 식빵입니다. 바삭하면서도 촉촉한 식감과 진한 맛이 특징입니다." },
        { id: 2, name: "크로와상", price: 2000, category: 'bread', stock: 222, image: 'croissant_02.png', description: "프랑스의 대표적인 베이커리 중 하나로, 층층이 쌓인 반죽에 버터를 추가하여 구워낸 과자입니다." },
        { id: 3, name: "아메리카노", price: 3000, category: 'beverage', stock: 333, image: 'americano01.png', description: "에스프레소의 쓴 맛과 향을 좋아하는 사람들이 물을 추가해서 즐기는 음료로, 물과 에스프레소의 비율에 따라서 쓴 맛과 진하게 즐길 수 있습니다." },
        { id: 4, name: "카푸치노", price: 4000, category: 'beverage', stock: 444, image: 'cappuccino01.png', description: "스팀밀크와 거품을 올린 것을 섞어 만든 이탈리아의 전통적인 커피 음료입니다." }
    ]);

    /*모드 : read,insert,update,delete,detail 등등*/
    const [mode, setMode] = useState('');
    /* selectedId: 선택된 행 index(상품의 id)*/
    const [selectedId, setSelectedId] = useState(1);


   

    /*테이블 특정 항목 클릭시 동작하는 함수*/
    const ClickArrived = (id, event) => {

        console.log('선택한 아이디:' + id);
        setSelectedId(Number(id));
        setMode('detail');//상세보기 모드로 변경
    };
    /*mode 변수에 따라서 화면을 다르게 보여주는 함수*/
    const getContent = () => {
        if (mode === 'detail') {
            var mycontent = getReadContent(); 
            return <Display selectedProduct={mycontent} />;
        
        }else if (mode === 'get_insert') {/*생성버튼(get 방식) */
            return <CreateContent onsubmintInsert={InsertedData}/>;

        } else if (mode === 'post_insert') {/*생성버튼(post 방식) */
            const newproducts = products.concat(newItem);
            setproducts(newproducts)
            setMode('read');//읽기전용모드로 변경함
          

        } else if (mode === 'get_update') {/*수정 버튼(get 방식) */
            const currentRow = getReadContent(); //현재 생성된 행 정보
            return <UpdateContent formData={currentRow} onSubmitUpdate={UpdateData} />;


        } else if (mode === 'post_update') {/*수정 버튼(post 방식) */

        } else if (mode === 'get_delete') {

        } else if (mode === 'get_category_add') {

        }

        return <></>;

    }

    const getReadContent = () => {
        /*선택한 객체 1개를 반환합니다.*/
        const selectedProduct = products.filter((product) => product.id == selectedId);
        return selectedProduct[0];
    }

    const ModeSelected = (mode, event) => {
        //사용자가 클릭한 버튼의 mode 정보로 변경
        console.log('received mode:' + mode);
        setMode(mode);

    }

    /*신규 상품 정보를 담기 위한 state */
    const [newItem, setNewItem] = useState(null);

    const InsertedData = (formData,event) => { //formdata는 화면에서 작성한거
        console.log('생성폼에서 전송버튼 클릭됨');
        console.log('이름:' +formData.name.value);
        console.log('카테고리:' +formData.category.value);

        /*newData: 신규상품 */
        const newId = Math.max(...products.map((one) => one.id))+ 1 ;
        const newData =[ {
            id:newId,
            name:formData.name.value,
            price:Number(formData.price.value),
            category:formData.category.value,
            stock:Number(formData.stock.value),
            image:formData.image.value,
            description:formData.description.value,
        }];

        setNewItem(newData);
        setMode('post_insert');
    }


    const UpdateData =(formData,event) =>{
        console.log('수정화면에서 넘어온 데이터 정보');
        console.log(formData);

    }

    return (
        <>
            <Card>
                <Card.Header>
                    <Top title={title} comment={comment} />
                </Card.Header>
                <Card.Body>
                    <Content contents={products} onClickToContent={ClickArrived} />
                </Card.Body>
                <Card.Body>
                    {getContent()}
                </Card.Body>
                <Card.Footer>
                    <Bottom message={message} onClickTobottom={ModeSelected} />
                </Card.Footer>
            </Card>



        </>
    )

}

export default App;