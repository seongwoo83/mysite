"use strict";
// 보그 PJ 회원가입 페이지 JS - member.js
// 제이쿼리 코드블록
$(() => {
    // 로딩확인
    console.log("로딩완료");
    /*********************************************
        [ 사용자 입력폼 유효성 검사 ]
        - 이벤트종류 : blur(포커스가 빠질때 발생)
        - 제이쿼리 이벤트 메서드 : blur()
        - 이벤트 대상:
        -> id가 'email2'가 아니고 class가 'search'가
        아닌 type이 'text'인 입력요소 input
        과 함께 type이 'password'인 입력요소 input

        ->>>> 제이쿼리 선택표현법:
        input[type=text][id!=email2][class!=search],
        input[type=password]
        >>> 대괄호는 속성선택자(CSS원래문법)
        != 같지않다(제이쿼리전용)

    *********************************************/
    $(`input[type=text][id!=email2][class!=search],
   input[type=password]`).on("blur", function () {
        // 0. 공백제거 처리함수
        // get rid of space -> 공백을 제거
        const groSpace = (txt) => txt.replace(/\s/g, "");
        // function(cv : string){return  cv.replace(/\s/g, "");}
        // 정규식: 슬래쉬( / )사이에 표현, \s 스페이스 문자
        //  정규식 참고 -> https://www.w3schools.com/jsref/jsref_obj_regexp.asp
        // 해석: 공백문자를 모두(g: global - 전역) 찾아서 없애시오
        // 1. 방금 블러가 발생한 요소의 id는?
        let cid = $(this).attr("id");
        // 2. 블러가 발생한 요소의 입력값은?
        let cv = cid === "mnm" ? $(this).val().trim() : groSpace($(this).val());
        // 삼항 연산자 (cid가 mnm이냐? 응 : 아니)
        //서비스 차원에서 공백제거된 데이터를 다시 입력창에 넣어줌
        $(this).val(cv);
        /*********************************************
        3. 빈값 여부 검사하기
    *********************************************/
        if (cv === "") {
            // 메시지 출력
            $(this).siblings(".msg").text("값이 비어있습니다.");
            // 불통과
            pass = false;
        }
        else if (cid === "mid") {
            /*********************************************
            4. 아이디일 경우 유효성 검사
            - 검사기준: 영문자로 시작하는 6~20글자 영문자/숫자
        *********************************************/
            // 아이디 검사
            console.log("아이디 검사 결과", vReg(cv, cid));
            if (!vReg(cv, cid)) {
                //false일때
                $(this).siblings(".msg").text("영문자로 시작하는 6~20글자 영문자/숫자").removeClass("on");
                // 불통과
                pass = false;
            }
            else {
                /* 
                        [ AJAX로 중복아이디 검사하기! ]
                        ajax 처리 유형 2가지

                        1) post 방식 처리 메서드
                        - $.post(URL,data,callback)

                        2) get 방식 처리 메서드
                        - $.get(URL,callback)

                        3) 위의 2가지 유형 중 선택처리 메서드
                        - $.ajax({전송할페이지,전송방식,보낼데이터,전송할데이터타입,비동기옵션,성공처리,실패처리})
                        -> 보내는 값은 하나! 객체데이터임 - 객체안에 7가지 유형의 데이터를 보냄
                    */
                        $.ajax({
                            // 1. 전송할페이지
                            url: "./process/chkID.php",
                            // 2. 전송방식
                           type: "post",
                            // 3. 보낼데이터
                            data: {"mid":$("#mid").val()},
                            // 4. 전송할데이터타입
                            dataType: "html",
                            // 5. 비동기옵션 - ajax메서드는 비동기처리됨 다만, 현재 문서와의 동기처리를 하려면 비동기 옵션값을 false로 해야함
                            //  pass 전역변수를 사용하기 위해
                            //  최종 트리거 blur 발생시 순서대로 처리할때 동기화해야하기 떄문
                            async: false,
                            // 6. 성공처리
                            success: function(res){ //res는 결과값 리턴
                                console.log(res);
                                if(res === "ok"){
                                    $("#mid").siblings(".msg").text("멋진 아이디네요!").addClass("on");
                                }else{ //아이디 중복시
                                    $("#mid").siblings(".msg").text("이미 사용중인 아이디 입니다.").removeClass("on");

                                    //  불통과처리 -> pass변수 사용이유로 async: false 옵션을 사용함
                                    pass = false;
                                }
                            },
                            // 7. 실패처리
                            error: function(xhr, status, error){  
                                // xhr - XMLHttpRequest 객체가 들어옴
                                //status - 실패상태코드
                                //error - 에러 결과값
                                alert("연결 실행 실패: "+ error);
                            }
                        });




                // true일때 통과시
                // 1. DB에 아이디가 있는지 조회후 결과로 처리해야함 -> 보류중
                // 만약 아이디가 이미 있으면 "이미 사용중이거나 탈퇴한 아이디입니다."
                // 만약 아이디가 없으면 "멋진 아이디네요!"
                // 2. 메시지 띄우기
                // $(this).siblings(".msg").text("멋진 아이디네요!").addClass("on"); // 녹색글자
            }
        }
        else if (cid === "mpw") {
            /*********************************************
            5. 비밀번호일 경우 유효성 검사
            - 검사기준: 특수문자,문자,숫자포함 형태의 5~15자리
        *********************************************/
            // 비밀번호 검사
            console.log("비밀번호 검사 결과", vReg(cv, cid));
            if (!vReg(cv, cid)) {
                //false일때
                $(this).siblings(".msg").text("특수문자,문자,숫자포함 형태의 5~15자리");
                // 불통과
                pass = false;
            }
            else {
                // true일때 통과시
                //  메시지 지우기
                $(this).siblings(".msg").empty();
            }
        }
        else if (cid === "mpw2") {
            /*********************************************
            6. 비밀번호확인일 경우 유효성 검사
            - 검사기준: 특수문자,문자,숫자포함 형태의 5~15자리
        *********************************************/
            // 비밀번호확인 검사
            if (cv !== $("#mpw").val()) {
                //비밀번호와 같지 않을때
                $(this).siblings(".msg").text("비밀번호가 일치하지 않습니다.");
                // 불통과
                pass = false;
            }
            else {
                // 비밀번호와 같을때
                //  메시지 지우기
                $(this).siblings(".msg").empty();
            }
        }
        else if (cid === "email1") {
            /*********************************************
            7. 이메일 유효성 검사
            - 검사기준: 이메일 형식에 맞는지 검사
        *********************************************/
            // 1. 이메일 주소 만들기 : 앞주소 @ 뒷주소
            let comp = eml1.val() + "@" + (seleml.val() === "free" ? eml2.val() : seleml.val());
            // 2. 이메일 검사함수 호출하기
            resEml(comp);
        }
        else {
            //모두 통과했을 경우
            $(this).siblings(".msg").empty(); //내용지우기 메서드 empty()
        }
    });
    // 이메일 관련 대상설정
    // 이메일 앞주소
    const eml1 = $("#email1");
    // 이메일 뒷주소
    const eml2 = $("#email2");
    // 이메일 선택 박스
    const seleml = $("#seleml");
    /***************************************
        선택박스 변경시 이메일 검사하기
        _________________________

        검사시점: 선택박스 변경할 때
        이벤트: change -> 제이쿼리 change()메서드
        이벤트 대상: #seleml -> seleml 할당
   ***************************************/
    seleml.on("change", function () {
        // 1. 선택박스 변경된 값 읽어오기
        let cv = $(this).val();
        console.log(cv);
        // 2. 선택옵션별 분기문
        if (cv === "init") {
            // 선택해 주세요
            // 1. 메시지 출력
            eml1.siblings(".msg").text("이메일 옵션 선택필수").removeClass("on");
            // 2. 직접 입력창 숨기기
            eml2.fadeOut(300);
        }
        else if (cv === "free") {
            // 직접 입력
            // 1. 직접입력창 보이기
            eml2.fadeIn(300).val("").focus();
            //  val(값) -> 입력창에 값넣기(빈문자값은 기존값을 지워준다)
            // focus() -> 입력창에 포커스 가게 하기
            // 2. 기존 메시지 지우기
            eml1.siblings(".msg").empty();
        }
        else {
            // 이메일 주소일 경우
            // 1. 직접 입력창 숨기기
            eml2.fadeOut(300);
            // 2. 이메일 전체주소 조합하기
            let comp = eml1.val() + "@" + cv;
            // 3. 이메일 유효성 검사 함수 호출
            resEml(comp);
        }
    });
    /********************************************
        키보드 입력시 이메일 체크하기
        _______________________________
        - 키보드 관련 이벤트 : keypress, keyup, keydown
        1. keypress : 키가 눌려졌을 때
        2. keyup : 키가 눌렸다가 올라올 때
        3. keydown :  키가 눌려져서 내려가 있을 때
        -> 과연 글자가 입력되는 순간은 어떤 키보드 이벤트를 적용해야 할까? -> keyup 이벤트

        이벤트 대상: #email1, #email2
        -> 모든 이벤트를 함수와 연결하는 제이쿼리 메서드는?
        on(이벤트명, 함수)
   ********************************************/
    $("#email1, #email2").on("keyup", function () {
        // 1. 현재 이벤트 대상 아이디 읽어오기
        let cid = $(this).attr("id");
        // 2. 현재 입력된 값 읽어오기
        let cv = $(this).val();
        console.log("입력아이디", cid, "\n입력값", cv);
        //  3. 이메일 뒷주소 세팅하기
        let backeml = cid === "email1" ? seleml.val() : eml2.val();
        //  현재 아이디가 "email1"인가? 맞으면 선택박스 : 아니면 두번째 이메일 뒷주소를 입력하는
        //  중이므로 그것을 선택
        // 4. 만약 선택박스 값이 "free"(직접입력)이면 이메일 뒷주소로 변경함
        if (seleml.val() === "free")
            backeml = eml2.val();
        // 5. 이메일 전체주소 조합하기
        let comp = eml1.val() + "@" + backeml;
        // 6. 이메일 유효성 검사함수 호출
        resEml(comp);
    });
    /********************************************
        함수명: resEml
        기능: 이메일 검사 결과 처리
    ********************************************/
    const resEml = (comp) => {
        // 이메일 정규식 검사에 따른 메시지
        if (vReg(comp, "eml")) {
            //통과시
            eml1.siblings(".msg").text("적합한 이메일 형식 입니다.").addClass("on");
        }
        else {
            //통과 못했을 시
            eml1.siblings(".msg").text("맞지 않는 이메일 형식 입니다.").removeClass("on");
            // 불통과
            pass = false;
        }
    };
    /***********************************************
    가입하기(submit) 버튼 클릭시 처리하기
    _______________________________

    전체검사의 원리:
    전역변수 pass를 설정하여  true를 할당하고 검사중간에
    불통과 사유발생시 false로 변경하여
    유효성 검사 통과여부를 판단함

    검사방법:
    기존 이벤트 blur이벤트를 강제로 발생시킨다
    이벤트를 강제로 발생시키는 메서드는? trigger(이벤트명)
***********************************************/
    //  검사용 변수
    let pass = true;
    // 이벤트 대상: #btnj
    // 원래 서브밋버튼은 클릭시 싸고있는 form태그의 action 설정 페이지로
    // 모든 입력창의 값을 전송하도록 설계되어있다.
    // 기본 서브밋 이동을 막고 우리가 검사한 후 전송한다
    $("#btnj").on("click", function (e) {
        // 1. 기본이동 막기
        e.preventDefault();
        // 2. pass 통과 여부 변수에 true를 할당
        //  처음에 true로 시작하여 검사 중간에 한번이라도 false로 할당되면 결과는 false로 리턴
        pass = true;
        // 3. 입력창  blur 이벤트 강제 발생
        //  대상: blur  이벤트 발생했던 요소들
        $(`input[type=text][id!=email2][class!=search],
   input[type=password]`).trigger("blur");
        // 최종 통과여부
        console.log("통과여부", pass);
        // 4. 검사결과에 따라 메시지 보이기
        if (pass) {//통과시
            /* 
               [ Ajax를 이용한 POST방식으로 DB에 데이터 입력하기! ]

               AJAX = Asynchronous Javascript and XML

               - 비동기통신이란? 쉽게 말해서 페이지가 새로고쳐지지 않고
               그대로 있으면서 일부분만 서버통신을 하는 것을 말한다!
               - 제이쿼리는 POST방식으로 ajax를 할 수 있다!

               [ POST방식 Ajax 메서드 ]
               $.post(URL,data,callback)
               $.post(전송할페이지,전송할데이터,전송후실행함수)
           
           */
            
            $.post(
                // 1. 전송할 페이지 - 서브밋 할 페이지
                "./process/ins.php",
                // 2. 전송할 데이터 - 객체형식 {속성 : 값}
                {
                    // 1) 아이디
                    "mid": $("#mid").val(),
                    // 2) 비밀번호
                    "mpw": $("#mpw").val(),
                    // 3) 이름
                    "mnm": $("#mnm").val(),
                    // 4) 성별
                    "gen": $(":radio[name=gen]:checked").val(), // 요소 앞에 : 콜론 사용으로 속성을 읽음
                    // 5) 이메일 앞주소
                    "email1": $("#email1").val(),
                    // 6) 이메일 뒷주소
                    "seleml": $("#seleml").val(),
                    // 7) 이메일 직접 입력주소
                    "email2": $("#email2").val(),
                },
                // 3. 전송 후 실행함수 - 익명함수로 실행 후 결과 리턴 받음
                //  이부분이 Promise와 비슷하게 처리됨
                function(res){ // res는 리턴된 결과를 받는 변수
                    console.log(res);
                    if(res === "ok"){// 성공시
                        alert("회원가입을 축하드립니다~!");
                        location.replace("login.php");
                    }else{ //에러발생시
                        alert("관리자에게 문의하세요\n" + res);
                    }
                }

            );////////post()


            // 일단 페이지 테스를 위해 기본 서브밋 해준다
            // $(".logF").submit();
            // 원래는  post방식으로 DBV에 회원가입정보를 전송하여 입력후 DB처리 완료시 성공메시지나
            // 로그인 페이지로 넘겨준다

            // alert("회원가입을 축하드립니다~!");
            // 로그인페이지로 리디렉션
            // location.href = "/700.쉐도잉프로젝트/02.VOGUE_PJ/002.site/login.html"
            // location.replace("/700.쉐도잉프로젝트/02.VOGUE_PJ/002.site/login.html");
            // 브라우저 캐싱 히스토리를 지우려면
            // location.replace(url)을 사용함




        }
        else {
            alert("입력을 수정하세요");
        }
    });
});
/*////////////////////////////////////////////////////////
    함수명: vReg (validation with Regular Expression)
    기능: 값에 맞는 형식을 검사하여 리턴함
    (주의: 정규식을 따옴표로 싸지말아라!-싸면문자가됨!)
*/ ////////////////////////////////////////////////////////
function vReg(val, cid) {
    // val - 검사할값, cid - 처리구분아이디
    // //console.log("검사:"+val+"/"+cid);
    // 정규식 변수
    let reg;
    // 검사할 아이디에 따라 정규식을 변경함
    switch (cid) {
        case "mid": // 아이디
            reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
            // 영문자로 시작하는 6~20글자 영문자/숫자
            // /^[a-z]{1} 첫글자는 영문자로 체크!
            // [a-z0-9]{5,19} 첫글자 다음 문자는 영문 또는 숫자로
            // 최소 5글자에서 최대 19글자를 유효범위로 체크!
            // 첫글자 한글자를 더하면 최소 6글자에서 최대 20글자체크!
            break;
        case "mpw": // 비밀번호
            reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            // 특수문자,문자,숫자포함 형태의 5~15자리
            // (?=^.{5,15}$) 시작부터 끝까지 전체 5~15자릿수 체크!
            // (?=.*\d) 숫자 사용체크!
            // (?=.*[a-zA-Z]) 영문자 대문자 또는 소문자 사용체크!
            // (?=.*[!@#$%^&+=]) 특수문자 사용체크!
            break;
        case "eml": // 이메일
            reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            // 이메일 형식에 맞는지 검사하는 정규식
            break;
    } //////////// switch case문 //////////////////
    // //console.log("정규식:"+reg);
    // 정규식 검사를 위한 JS메서드
    // -> 정규식.test(검사할값) : 결과 true/false
    return reg.test(val); //호출한 곳으로 검사결과리턴!
} //////////// vReg 함수 //////////////////////////////////
///////////////////////////////////////////////////////////
