var smsConfirm = {}

smsConfirm.loadView = function () {
    $('#loadView').load('views/' + PAGE.SMS_CONFIRM, smsConfirm.getData);
}

smsConfirm.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

smsConfirm.showView = function () {
    $('#loadView').show();
}

smsConfirm.hideModal = function () {
    $('#loadingModal').modal('hide');
}

smsConfirm.getData = function () {
    let choosedPaket = GLOBAL_PARAM.getPaketSms();
    $('#namaPaket').text(choosedPaket.deskripsiPaket);
    $('#harga').text("Rp. " + choosedPaket.harga);
    $('#nomorTujuan').text(choosedPaket.nomorTujuan);

    document.getElementById('back-btn').addEventListener("click", smsConfirm.backHistory, false);
    document.getElementById('cancelBtn').addEventListener("click", smsConfirm.backHistory, false);
    document.getElementById('okBtn').addEventListener("click", smsConfirm.insertPaket, false);
}

smsConfirm.backHistory = function () {
    GLOBAL_PARAM.setPage(PAGE.SMS);
    changePage();
}

smsConfirm.insertPaket = function () {
    let paket = GLOBAL_PARAM.getPaketSms();
    let user = GLOBAL_PARAM.getUserCredential();
    let requestBody = {
        idPaket: paket.idPaket,
        harga: paket.harga,
        nomorTujuan: paket.nomorTujuan,
        idUser: user.idUser
    }
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.INSERT_SMS;
    $.ajax({
        type: "POST",
        url: url,
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + GLOBAL_PARAM.getToken()
        },
        data: JSON.stringify(requestBody),
        success: function (data) {
            Swal.fire({
                title: 'Sukses',
                text: 'Pembelian paket SMS Anda berhasil dilakukan',
                icon: 'success'
            }).then((result) => {
                GLOBAL_PARAM.clearPaketSms();

                GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
                changePage();
            });
        },
        error: function (request, status, error) {
            Swal.fire({
                title: 'Gagal',
                text: 'Transaksi Anda tidak berhasil dilakukan',
                icon: 'error'
            }).then((result) => {
                GLOBAL_PARAM.clearPaketSms();
                GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
                changePage();
            });
        }
    });
}