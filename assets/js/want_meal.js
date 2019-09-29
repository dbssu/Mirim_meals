var inputs = $('input[type="text"]');
var googleSubmitBtn = $('#google-submit');
var snackbar = $('#snackbar');

var inputNum = $('#num');
var inputName = $('#name');
var inputMenu = $('#like');

function isLoading(status) {
    if (status) {
        $('html, body').addClass('wait');
        googleSubmitBtn.attr('disabled', true).html('입력중...');
    } else {
        $('html, body').removeClass('wait');
        googleSubmitBtn.attr('disabled', false).html('입력');
    }
}

function checkInput() {
    var isEmpty = false;
    $.each(inputs, function (index, element) {
        if (element.value === '') {
            alert('빈 칸이 있어요.');
            isEmpty = true;
            return false;
        }
    });
    return isEmpty;
}

$('#google-submit').click(function () {

    //빈값 체크
    if (checkInput()) {
        return;
    }

    // 입력중
    isLoading(true);

    //alert(inputNum.val()+inputName.val()+inputMenu.val());
    $.ajax({
        type: "GET",
        url: "https://script.google.com/macros/s/AKfycbzyloF7k0r78_O9p8UvTxExm-QR8APEg7ifdhU_59Feov7x53jk/exec",
        data: {
            "학번": inputNum.val(),
            "이름": inputName.val(),
            "메뉴": inputMenu.val()
        },
        success: function (response) {
            isLoading(false);

            snackbar.html('입력이 완료되었습니다.').addClass('show');
            setTimeout(function () {
                snackbar.removeClass('show');
            }, 3000);

            //값 비워주기
            inputNum.val('');
            inputName.val('');
            inputMenu.val('');
        },
        error: function (request, status, error) {
            isLoading(false);
            console.log("code:" + request.status + "\n" + "error:" + error);
            console.log(request.responseText);
        }
    });
});