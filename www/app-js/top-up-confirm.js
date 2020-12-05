var topUpConfirmPage = {}

topUpConfirmPage.topUp = undefined;

topUpConfirmPage.loadView = function () {
    $('#loadView').load('views/' + PAGE.TOP_UP_CONFIRM, topUpConfirmPage.getData);
}

topUpConfirmPage.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

topUpConfirmPage.showView = function () {
    $('#loadView').show();
}

topUpConfirmPage.hideModal = function () {
    $('#loadingModal').modal('hide');
}

topUpConfirmPage.getData = function () {
    topUpConfirmPage.hideView();

    topUpConfirmPage.topUp = GLOBAL_PARAM.getTopUp();
    topUpConfirmPage.getConfirmTopUp();

    document.getElementById("back-btn").addEventListener("click", topUpConfirmPage.backHistory, false);
    document.getElementById("confirm-btn").addEventListener("click", topUpConfirmPage.insertTopUp, false);

}

topUpConfirmPage.getConfirmTopUp = function () {
    let confirmBody = topUpConfirmPage.prepareResquestBody();

    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.TOPUP_CONFIRM_GET;
    $.ajax({
        type: "POST",
        url: url,
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + GLOBAL_PARAM.getToken()
        },
        data: JSON.stringify(confirmBody),
        // async: false,
        success: function (data) {
            console.log(data);
            topUpConfirmPage.topUp = data;
            topUpConfirmPage.setLabel();

            topUpConfirmPage.showView();
            topUpConfirmPage.hideModal();

        },
        error: function (request, status, error) {

            alert(request.statusText + '\n' + url);
        }
    });
}

topUpConfirmPage.insertTopUp = function () {
    topUpConfirmPage.topUp.konfirmasiTransaksi = true;
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.TOPUP_INSERT;
    $.ajax({
        type: "POST",
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(topUpConfirmPage.topUp),
        headers: {
            'Authorization': 'Bearer ' + GLOBAL_PARAM.getToken()
        },
        // async: false,
        success: function (data) {
            console.log(data);
            if (data == true) {
                Swal.fire({
                    title: 'Sukses',
                    text: 'Top Up Anda berhasil dilakukan',
                    icon: 'success'
                }).then((result) => {
                    GLOBAL_PARAM.clearTopUp();

                    GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
                    changePage();
                });
            } else {
                Swal.fire({
                    title: 'Gagal',
                    text: 'Top Up Anda tidak berhasil dilakukan',
                    icon: 'error'
                }).then((result) => {
                    GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
                    changePage();
                });
            }

        },
        error: function (request, status, error) {

            alert(request.statusText + '\n' + url);
        }
    });
}

topUpConfirmPage.prepareResquestBody = function () {
    let requestBody = {
        userId: topUpConfirmPage.topUp.userId,
        transaksiId: topUpConfirmPage.topUp.transaksiId,
        kodePembayaran: topUpConfirmPage.topUp.kodePembayaran
    }

    return requestBody;
}

topUpConfirmPage.setLabel = function () {
    document.getElementById('confirmTitle').innerText = topUpConfirmPage.topUp.kategoriTopUp;
    document.getElementById('kodePembayaranText').innerText = topUpConfirmPage.topUp.kodePembayaran;
    if (topUpConfirmPage.topUp.kategoriTopUp === 'ATM') {
        document.getElementById('confirmText').innerText = 'Virtual Account';
        document.getElementById('confirmDetailText').innerText = 'Virtual Account';
    } else {
        document.getElementById('confirmText').innerText = 'Kode Pembayaran ' + topUpConfirmPage.topUp.kategoriTopUp;
        document.getElementById('confirmDetailText').innerText = 'Kode Pembayaran';
    }
}

topUpConfirmPage.backHistory = function () {
    window.history.go(-1); return false;
}