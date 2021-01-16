var telpConfirm = {}

telpConfirm.loadView = function () {
    $('#loadView').load('views/' + PAGE.TELEPON_CONFIRM, telpConfirm.getData);
}

telpConfirm.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

telpConfirm.showView = function () {
    $('#loadView').show();
}

telpConfirm.hideModal = function () {
    $('#loadingModal').modal('hide');
}

telpConfirm.getData = function () {
    let choosedPaket = GLOBAL_PARAM.getPaketTelp();
    $('#namaPaket').text(choosedPaket.deskripsiPaket);
    $('#harga').text("Rp. " + choosedPaket.harga);
    $('#nomorTujuan').text(choosedPaket.nomorTujuan);

    document.getElementById('back-btn').addEventListener("click", telpConfirm.backHistory, false);
    document.getElementById('cancelBtn').addEventListener("click", telpConfirm.backHistory, false);
    document.getElementById('okBtn').addEventListener("click", telpConfirm.insertPaket, false);
}

telpConfirm.backHistory = function () {
    GLOBAL_PARAM.setPage(PAGE.TELEPON);
    changePage();
}

telpConfirm.insertPaket = function () {
    let paket = GLOBAL_PARAM.getPaketTelp();
    let user = GLOBAL_PARAM.getUserCredential();
    let requestBody = {
        idPaket: paket.idPaket,
        harga: paket.harga,
        nomorTujuan: paket.nomorTujuan,
        idUser: user.idUser
    }
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.INSERT_TELEPON;
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
                text: 'Pembelian paket Telepon Anda berhasil dilakukan',
                icon: 'success'
            }).then((result) => {
                GLOBAL_PARAM.clearPaketTelp();

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
                GLOBAL_PARAM.clearPaketTelp();
                GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
                changePage();
            });
        }
    });
}