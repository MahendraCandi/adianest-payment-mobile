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
            document.getElementById("ubah-profile").addEventListener("click", mainMenu.ubahProfil, false);
            document.getElementById("logout").addEventListener("click", mainMenu.logout, false);
            document.getElementById("directPaketInternet").addEventListener("click", mainMenu.directInternetPage, false);
            document.getElementById("directSms").addEventListener("click", mainMenu.directSmsPage, false);
            document.getElementById("directTelepon").addEventListener("click", mainMenu.directTelpPage, false);
            document.getElementById("directPulsa").addEventListener("click", mainMenu.directPulsaPage, false);
            document.getElementById("directShopee").addEventListener("click", mainMenu.directShopee, false);
            document.getElementById("directOvo").addEventListener("click", mainMenu.directOvo, false);
            document.getElementById("directGrab").addEventListener("click", mainMenu.directGrab, false);
            document.getElementById("directGopay").addEventListener("click", mainMenu.directGopay, false);
            document.getElementById("directDana").addEventListener("click", mainMenu.directDana, false);
            mainMenu.showView();
            mainMenu.hideModal();
        },
        error: function (request, status, error) {
            alert(request.statusText + '\n' + url);
        }
    });
}

function formatRupiah(angka, prefix) {
    let number_string = angka.replace(/[^\.\d]/g, '').toString(),
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

mainMenu.directTelpPage = function () {
    GLOBAL_PARAM.setPage(PAGE.TELEPON);
    changePage();
}

mainMenu.directPulsaPage = function () {
    GLOBAL_PARAM.setPage(PAGE.PULSA);
    changePage();
}

mainMenu.directShopee = function () {
    GLOBAL_PARAM.setPage(PAGE.DIGITAL);
    GLOBAL_PARAM.setDigitalPage({'page': GLOBAL_PARAM.SHOOPEE_PAY});
    changePage();
}

mainMenu.directOvo = function () {
    GLOBAL_PARAM.setPage(PAGE.DIGITAL);
    GLOBAL_PARAM.setDigitalPage({'page': GLOBAL_PARAM.OVO});
    changePage();
}

mainMenu.directDana = function () {
    GLOBAL_PARAM.setPage(PAGE.DIGITAL);
    GLOBAL_PARAM.setDigitalPage({'page': GLOBAL_PARAM.DANA});
    changePage();
}

mainMenu.directGopay = function () {
    GLOBAL_PARAM.setPage(PAGE.DIGITAL);
    GLOBAL_PARAM.setDigitalPage({'page': GLOBAL_PARAM.GOPAY});
    changePage();
}

mainMenu.directGrab = function () {
    GLOBAL_PARAM.setPage(PAGE.DIGITAL);
    GLOBAL_PARAM.setDigitalPage({'page': GLOBAL_PARAM.GRAB});
    changePage();
}

mainMenu.ubahProfil = function () {
    GLOBAL_PARAM.setPage(PAGE.PROFILE);
    changePage();
}

mainMenu.logout = function () {
    GLOBAL_PARAM.clearAllStorage();
    GLOBAL_PARAM.clearPage();
    window.location.href = "login.html";   
}