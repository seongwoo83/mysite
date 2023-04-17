/* 보그 PJ 카테고리 페이지 JS - category.js */

/* 넘어온 url받기 pm -> parameter*/
let pm = location.href;
/* location.href가 이퀄 오른쪽에 있으면 url주소 읽어옴 */
/* 문자열 잘라서 값 읽어오기 -> 물음표로 잘라서 두 번째 값 -> 이퀄로 잘라서 두 번째 값*/
pm = pm.split("?")[1].split("=")[1];
/* pm값 특수문자 복원하기 */
pm = decodeURIComponent(pm);
console.log(pm);

window.addEventListener("DOMContentLoaded", loadFn);

function loadFn(){
    console.log("로딩완료");

    /* 1. 변경대상선정 */
    /* 1) 서브타이틀 */
    const stit = document.querySelector(".stit");
    /* 2) 서브메뉴 */
    const lnb = document.querySelector(".lnb");
    /* 3) 내용 타이틀 */
    const contit = document.querySelectorAll(".icont h2");
    /* 4) 컨텐츠 상위박스 */
    const cont = document.querySelector(".cont");
    /* 5) title 요소(타이틀 내용에 카테고리명 추가) */
    const titag = document.querySelector("title");
    
    /* 2. 메뉴데이터(sinfo 변수) 객체에서 카테고리값 선택하기 */
    const mdata = sinfo[pm];
    
    /* 3. 대상에 변경 적용하기 */
    /* 1) 카테고리 페이지 타이틀 넣기 */
    /* 대상: .stit -> stit변수 */
    stit.innerText = mdata["제목"];
    /* 2) lnb 메뉴 넣기 */
    let mvalue = mdata["메뉴"];
    if(mdata["메뉴"] !== "없음"){
        let con = `<ul>`;
        for(let x of mdata["메뉴"]){
            con += `
                <li>
                    <a href="#">${x}</a>
                </li>`;
        }
        con += `</ul>`;
        lnb.innerHTML = con;
        // let temp = `<ul>`;
        // mvalue.forEach((val)=>{
        //     temp +=`
        //         <li>
        //             <a href="#">${val}</a>
        //         </li>
        //     `;
        // })
        // temp += `</ul>`
        // lnb.innerHTML = temp;
    }else{
        lnb.remove();
    }
    /* 3) 내용 타이틀 넣기 */
    /* ->  h2개수만큼 순번대로 mdata["타이틀"][순번] */
    /* h2를 돌릴때 for of가 아닌 forEach() 메서드 사용 */
    contit.forEach((ele,idx)=>{
        ele.innerHTML = mdata["타이틀"][idx];
    })
    /* 4) 컨텐츠박스에 pm과 같은 이름의 클래스 넣기*/
    cont.classList.add(mdata["경로"]); 
    // cont.classList.add(pm.replace(" & ", "-")); /* '&' 있으면 '-'로 바꿈

    /* 5) 탭메뉴 출력 title 요소 데이터 넣기 */
     /* 기존값을 앞에 "제목"속성값을 넣음 */
        titag.innerText = mdata["제목"] + titag.innerText;
}