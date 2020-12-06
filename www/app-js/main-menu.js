var mainMenu = {}

mainMenu.loadView = function () {
    $('#loadView').load('views/' + PAGE.MAIN_MENU, mainMenu.getData);
}

mainMenu.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

mainMenu.showView = function () {
    $('#loadView').show();
}

mainMenu.hideModal = function () {
    $('#loadingModal').modal('hide');
}

mainMenu.getData = function () {
    mainMenu.hideView();
    mainMenu.getUserCredential();
}

mainMenu.getUserCredential = function () {
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.USER_BY_PHONE;
    let phoneNumber = GLOBAL_PARAM.getPhoneNumber();
    $.ajax({
        type: "GET",
        url: url + phoneNumber,
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + GLOBAL_PARAM.getToken()
        },
        success: function (data) {
            console.log(data);
            GLOBAL_PARAM.saveUserCredential(data);
        },
        complete: function () {
            document.getElementById("top-up-btn").addEventListener("click", mainMenu.directTopUpPage, false);
            document.getElementById("history-btn").addEventListener("click", mainMenu.directHistoryPage, false);
            document.getElementById('saldoBalance').innerText =
                formatRupiah(GLOBAL_PARAM.getUserCredential().endingBalance, 'Rp.');
            document.getElementById("directPaketInternet")
                .addEventListener("click", mainMenu.directInternetPage, false);
            document.getElementById("directSms")
                .addEventListener("click", mainMenu.directSmsPage, false);
            mainMenu.showView();
            mainMenu.hideModal();
        },
        error: function (request, status, error) {
            alert(request.statusText + '\n' + url);
        }
    });

    console.log("End getUserCredentias");
}

function formatRupiah(angka, prefix) {
    var number_string = angka.replace(/[^\.\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

mainMenu.directTopUpPage = function () {
    GLOBAL_PARAM.setPage(PAGE.TOP_UP);
    changePage();
}

mainMenu.directInternetPage = function () {
    GLOBAL_PARAM.setPage(PAGE.PAKET_INTERNET);
    changePage();
}

mainMenu.directHistoryPage = function () {
    GLOBAL_PARAM.setPage(PAGE.HISTORY);
    changePage();
}

mainMenu.directSmsPage = function () {
    GLOBAL_PARAM.setPage(PAGE.SMS);
    changePage();
}