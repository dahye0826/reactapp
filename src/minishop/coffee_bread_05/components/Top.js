function App(props){
    //props는 상위 컴포넌트가 넘겨주는 property 모음
    //console.log('Top');

    return(
        <>
           <h2>{props.title}</h2>
           {props.comment}        
        </>
    );

}

export default App;