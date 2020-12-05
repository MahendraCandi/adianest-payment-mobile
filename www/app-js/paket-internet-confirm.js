var internetConf = {}

internetConf.loadView = function () {
    $('#loadView').load('views/' + PAGE.PAKET_INTERNET_CONFIRM, internetConf.getData);
}

internetConf.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

internetConf.showView = function () {
    $('#loadView').show();
}

internetConf.hideModal = function () {
    $('#loadingModal').modal('hide');
}

internetConf.getData = function () {
    let choosedPaket = GLOBAL_PARAM.getPaketInternet();
    $('#namaPaket').text(choosedPaket.namaPaket);
    $('#harga').text("Rp. " + choosedPaket.harga);
    $('#nomorTujuan').text(choosedPaket.nomorHp);

    document.getElementById('back-btn').addEventListener("click", internetConf.backHistory, false);
    document.getElementById('cancelBtn').addEventListener("click", internetConf.backHistory, false);
    document.getElementById('okBtn').addEventListener("click", internetConf.insertPaketInternet, false);

}

internetConf.insertPaketInternet = function () {
    let choosedPaket = GLOBAL_PARAM.getPaketInternet();
    let user = GLOBAL_PARAM.getUserCredential();
    let requestBody = {
        idPaket: choosedPaket.id,
        namaPaket: choosedPaket.namaPaket,
        hargaPaket: choosedPaket.harga,
        nomorTujuan: choosedPaket.nomorHp,
        idUser: user.idUser
    }
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.INSERT_INTERNET;
    $.ajax({
        type: "POST",
        url: url,
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + GLOBAL_PARAM.getToken()
        },
        data: JSON.stringify(requestBody),
        success: function (data) {
            console.log(data);
            Swal.fire({
                title: 'Sukses',
                text: 'Pembelian paket Anda berhasil dilakukan',
                icon: 'success'
            }).then((result) => {
                GLOBAL_PARAM.clearPaketInternet();

                GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
                changePage();
            });
        },
        error: function (request, status, error) {
            Swal.fire({
                title: 'Gagal',
                text: 'Top Up Anda tidak berhasil dilakukan',
                icon: 'error'
            }).then((result) => {
                GLOBAL_PARAM.clearPaketInternet();
                GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
                changePage();
            });
        }
    });
}

internetConf.backHistory = function () {
    GLOBAL_PARAM.setPage(PAGE.PAKET_INTERNET);
    changePage();
}