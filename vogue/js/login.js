"use strict";
$(() => {
    /***********************************************
        로그인 페이지 유효성 검사하기
    ***********************************************/
    // 대상: #mid, #mpw
    const mid = $("#mid");
    const mpw = $("#mpw");
    // 유효성 검사 기준: 전송시 아이디, 비번 모두 빈값이 없어야함
    // 이벤트대상: #sbtn;
    // 이벤트 종류: click
    $("#sbtn").on("click", function (e) {
        // 기본기능 막기 - 서브밋 기능 차단
        e.preventDefault();
        // 공백데이터 처리함수
        const groSpace = val => val.replace(/\s/g, "");
        // 유효성 검사하기
        if (groSpace(mid.val()) === "" || groSpace(mpw.val()) === "") {
            alert("아이디, 비밀번호 모두 입력하세요!");
            // 초기화
            mid.val("").focus();
            mpw.val("");
        }
        else {
            // 원래는 DB에서 조회된 결과를 받고 성공메시지를 보이거나
            // 첫페이지로 보내준다

            // DB조회 페이지를 호출하여 결과를 받아서 처리함
            // Ajax의 post() 메서드 사용
            // $.post(URL, data, callback())

            $.post(
                // 1. 전송할 페이지  
                "./process/loginSet.php",

                // 2. 전송할 데이터  
                {
                    "mid":mid.val(),  // 아이디
                    "mpw":mpw.val()  // 비밀번호
                },

                // 3. 전송 후 콜백함수  
                function(res){  //res는 결과값 전달변수
                    console.log("결과값: ", res);
                    // 3-1 로그인 성공시 : ok
                    if(res === "ok"){
                        alert("로그인에 성공하셨습니다.");
                        // 메인페이지로 이동하기
                        location.href = "./index.php"
                    }
                    // 3-2 비밀번호 불일치 : again
                    else if(res === "again"){
                        alert("비밀번호가 일치하지 않습니다.");
                        // 비밀번호 지우고 비번에 포커스
                        mpw.val("").focus();
                    }
                    // 3-3 아이디 불일치 : no
                    else if(res==="no"){
                        alert("사용가능한 아이디가 아닙니다.");
                        // 초기화
                        mid.val("").focus();
                        mpw.val("");
                    }
                    else{
                        alert("잘못된 접근입니다.");
                    }
                }////////콜백함수
            );//////////post() 메서드

            /************************
                [ 로그인 성공 후 어떤일이 일어나나? ]
                1. 로그인이 성공하면 서버에 사용자 로그인 정보를 기록한다. 이것이 세션이라고 불리우는 메모리공간

                2. 이 세션에 변수를 할당하여 필요한 사용자 정보를 로그인 시간동안 유지하여 사용함. 
                    -> 세션변수라고 함
                    -> 이것 때문에 로그인 상태가 유지되어 시스템을 편리하게 이용할 수 있음

                3. 세션의 기본유지설정 시간은 20분이다. 만약 20분동안 세션의 갱신이 없으면(웹 Request가 없으면) 이를 만료처리하여 세션을 지움 -> 자동 로그아웃
            ************************/



        }
    });
});
