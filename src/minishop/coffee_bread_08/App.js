import './App.css'; //스타일 입힘
import Card from 'react-bootstrap/Card';

// import 앱이름 from '.comoponents/파일이름';
import Top from '../coffee_bread_08/components/Top';
import Bottom from '../coffee_bread_08/components/Bottom';
import Content from '../coffee_bread_08/components/Content';
import Display from '../coffee_bread_08/components/Display';
import CreateContent from '../coffee_bread_08/components/CreateContent';
import UpdateContent from '../coffee_bread_08/components/updateContent';
import CreateCategory from '../coffee_bread_08/components/CreateCategory';

import { useState } from 'react';


function App() {
    const title = 'React 맛집';
    const comment = '어서오세요~~맛있는 빵과 음료수가 많이 있습니다.';
    const message = '카운터에서 주문해주시고, 즐거운 시간 되시길 바랍니다.';

    const [products, setproducts] = useState([
        { id: 1, name: "프렌치 바게트", price: 1000, category: 'bread', stock: 111, image: 'french_baguette_01.png', description: "프랑스의 대표적인 빵 중 하나로, 길쭉하고 얇은 형태의 식빵입니다. 바삭하면서도 촉촉한 식감과 진한 맛이 특징입니다." },
        { id: 2, name: "크로와상", price: 2000, category: 'bread', stock: 222, image: 'croissant_02.png', description: "프랑스의 대표적인 베이커리 중 하나로, 층층이 쌓인 반죽에 버터를 추가하여 구워낸 과자입니다." },
        { id: 3, name: "아메리카노", price: 3000, category: 'beverage', stock: 333, image: 'americano01.png', description: "에스프레소의 쓴 맛과 향을 좋아하는 사람들이 물을 추가해서 즐기는 음료로, 물과 에스프레소의 비율에 따라서 쓴 맛과 진하게 즐길 수 있습니다." },
        { id: 4, name: "카푸치노", price: 4000, category: 'beverage', stock: 444, image: 'cappuccino01.png', description: "스팀밀크와 거품을 올린 것을 섞어 만든 이탈리아의 전통적인 커피 음료입니다." },
        { id: 5, name: "스폰지 케이크", price: 5000, category: 'cake', stock: 555, image: 'sponge_cake_01.png', description: "가장 일반적인 케이크로, 부드럽고 공기가 많은 스폰지 텍스처를 가지고 있습니다. 일반적으로 크림, 과일, 초콜릿 등 다양한 토핑과 함께 제공됩니다." },
        { id: 6, name: "초콜릿 케이크", price: 6000, category: 'cake', stock: 666, image: 'chocolate_cake_01.png', description: "초콜릿으로 만든 케이크로, 풍부하고 진한 초콜릿 맛을 가지고 있습니다. 초콜릿으로 만든 케이크 스폰지와 초콜릿으로 만든 크림 또는 가나슈를 사용하여 제작됩니다." }
    ]);

    /*모드 : read,insert,update,delete,detail 등등*/
    /*카테고리 한글 이름을 추가하기 위하여 mode 변수의 기본값을 initialize로 변경 */
    const [mode, setMode] = useState('initialize');
    /* selectedId: 선택된 행 index(상품의 id)*/
    const [selectedId, setSelectedId] = useState(1);




    /*테이블 특정 항목 클릭시 동작하는 함수*/
    const ClickArrived = (id, event) => {

        console.log('선택한 아이디:' + id);
        setSelectedId(Number(id));
        setMode('detail');//상세보기 모드로 변경
    };

    const InsertCategory = (formData, event) => {
        const newCategory = { key: formData.key.value, value: formData.value.value };
        const totalCategory = category.concat(newCategory);
        setCategory(totalCategory);
        setMode('read');
    }

    /*mode 변수에 따라서 화면을 다르게 보여주는 함수*/
    const getContent = () => {
        if (mode === 'detail') {
            var mycontent = getReadContent();
            return <Display selectedProduct={mycontent} />;

        } else if (mode === 'get_insert') {/*생성버튼(get 방식) */
            return <CreateContent onsubmintInsert={InsertedData} categories={category} />;

        } else if (mode === 'post_insert') {/*생성버튼(post 방식) */
            const newproducts = products.concat(newItem);
            setproducts(newproducts)
            setMode('initialize');//읽기전용모드로 변경함


        } else if (mode === 'get_update') {/*수정 버튼(get 방식) */
            const currentRow = getReadContent(); //현재 생성된 행 정보
            return <UpdateContent formData={currentRow} onSubmitUpdate={UpdateData} categories={category} />;


        } else if (mode === 'post_update') {/*수정 버튼(post 방식) */

        } else if (mode === 'get_delete') { /* 상품삭제*/
            const remainProduct = getExceptData(selectedId); //remainproduct: 선택된 나머지
            setproducts(remainProduct);


            
            setMode('read');

        } else if (mode === 'get_category_add') {
            return <CreateCategory onSubmitCategoryAdd={InsertCategory} />

        } else if (mode === 'filtering') {
            //현재 어떠한 category로 필터링 하는지 변수 filterCategory에 저장되어있습니다.
            //Content.js 파일 참조 바람
            if (filterCategory === 'all') { //전체보기
                setIsAllViewMode(true);



            } else { //특정 category만 보기
                const filteringProducts = products.filter((item) => item.category === filterCategory);
                // console.log(filterProduct);
                setFilteringProducts(filteringProducts);
                setIsAllViewMode(false);

            }
            setMode('read');

        }else if (mode === 'initialize') {
            //products 배열에 'category_kr' 항목을 추가합니다.
            const addedHangleName =[];
            
            products.map((item)=>{
                //'?'는 optional chaning이라고 부르며, 양자 택일 if 구문과 유사한 개념.
                //자바의 Optional 클래스 공부(NPE에 대한 처리)
                const hangleValue = category.find((category) => category.key === item.category)?.value;
                var hangul = {category_kr:hangleValue};
                const newItem = {...item, ...hangul};
                addedHangleName.push(newItem);
                
            });
            console.log(addedHangleName);
            setproducts(addedHangleName);
            setMode('read');//무한 반복 리렌더링 하지않도록 명시

            //const myUpdatedVehicle = {...myVehicle, ...updateMyVehicle}
        } else {
            return <></>;

        }
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

    const InsertedData = (formData, event) => { //formdata는 화면에서 작성한거
        console.log('생성폼에서 전송버튼 클릭됨');
        console.log('이름:' + formData.name.value);
        console.log('카테고리:' + formData.category.value);

        /*newData: 신규상품 */
        const newId = Math.max(...products.map((one) => one.id)) + 1;
        const newData = [{
            id: newId,
            name: formData.name.value,
            price: Number(formData.price.value),
            category: formData.category.value,
            stock: Number(formData.stock.value),
            image: formData.image.value,
            description: formData.description.value,
        }];

        setNewItem(newData);
        setMode('post_insert');
    }


    const UpdateData = (formData, event) => {
        console.log('수정화면에서 넘어온 데이터 정보');
        console.log(formData); // 수정한거 


        const anotherProduct = getExceptData(formData.id); //수정된 상품을 제외한 나머지 상품들
        const newproductList = anotherProduct.concat(formData)//수정된 상품과  anotherProduct 합치기
        setproducts(newproductList); //상품목록 state에 갱신
        setMode('initialize');



    }

    const getExceptData = (id) => {
        //상품의 아이디가 id가 아닌 항목들만 필터링 합니다.
        return products.filter((item) => item.id !== id);



    }
    /* 카테고리관련 */
    const categoryList = [
        { key: 'bread', value: '빵' },
        { key: 'beverage', value: '음료수' },
        { key: 'cake', value: '케익' }

    ];
    const [category, setCategory] = useState(categoryList);

    const [




        orderInfo, setOrderInfo] = useState({ column: 'name', ordering: 'asc' });


    /*Ordering: 정렬을 수행하는 함수입니다.*/
    const Ordering = (orderingInformation) => {
        const column = orderingInformation.column; //정렬하고자 하는 컬럼
        const method = orderingInformation.ordering; //정렬 방식

        const strColumn = ['name', 'category', 'category_kr']; //문자열 컬럼 목록

        const ischaracter = strColumn.includes(column);//문자열 컬럼인지 판단

        if (isAllViewMode) {//전체보기모드

            if (ischaracter) {
                products.sort((a, b) =>
                    //조건식 ? 참 : 거짓
                    method === 'asc' ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]));
            } else {
                products.sort((a, b) =>
                    //조건식 ? 참 : 거짓
                    method === 'asc' ? a[column] - b[column] : b[column] - a[column]);

            }


        } else { //필드 검색 모드
            if (ischaracter) {
                filteringProducts.sort((a, b) =>
                    //조건식 ? 참 : 거짓
                    method === 'asc' ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]));

            } else {
                filteringProducts.sort((a, b) =>
                    //조건식 ? 참 : 거짓
                    method === 'asc' ? a[column] - b[column] : b[column] - a[column]);

            }



        }


    }


    //사용자가 정렬할 컬럼과 정렬 방식을 변경하였습니다.
    const ClickOrderBy = (column_name, order_by) => {
        const newOrderInfo = { column: column_name, ordering: order_by };
        setOrderInfo(newOrderInfo);
        console.log(newOrderInfo);

        Ordering(newOrderInfo);

    }

    //필드 겁색: 전체 상품 중에서 특정한 상품만 필터링하기
    //filterCategory: 필드 검색시 내가 선택한 category의 영문이름이 저장됩니다.
    const [filterCategory, setFilterCategory] = useState(null);

    /*isAllViewMode가 true이면 전체 보기 모드입니다. */
    //시작하자마자 전체보기 모드가 되어야하므로 flag변수의 기본값을 true로 지정합니다. flag 변수의 기본값은 통상적으로 false입니다.
    const [isAllViewMode, setIsAllViewMode] = useState(true);

    /*필터링이 된 상품 목록을 저장하는 state 입니다.*/
    const [filteringProducts, setFilteringProducts] = useState(null);

    const CategoryChanged = (category, event) => {
        //category: 필터링하고자 하는 카테고리 영문 이름
        console.log(category);
        setFilterCategory(category);
        setMode('filtering');

        //필터링 목록이 생기면 다시 정렬하도록합니다.
        Ordering(orderInfo);
    }






    return (
        <>
            <Card>
                <Card.Header>
                    <Top title={title} comment={comment} />
                </Card.Header>
                <Card.Body>
                    <Content
                        contents={isAllViewMode ? products : filteringProducts}
                        onClickToContent={ClickArrived}
                        categories={category}
                        onOrderByClick={ClickOrderBy}
                        orderInfo={orderInfo}
                        onChangeCategory={CategoryChanged} />
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