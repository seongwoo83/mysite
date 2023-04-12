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
        const groSpace = val => val.repalce(/\s/g, "");
        // 유효성 검사하기
        if (mid.val() === "" || mpw.val() === "") {
            alert("모두 넣으시오");
            // 초기화
            mid.val("").focus();
            mpw.val("");
        }
        else {
            // 원래는 DB에서 조회된 결과를 받고 성공메시지를 보이거나
            // 첫페이지로 보내준다
            alert("로그인에 성공하셨습니다.");
        }
    });
});
