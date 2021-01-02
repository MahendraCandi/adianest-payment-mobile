var pulsaConf = {}

pulsaConf.loadView = function () {
    $('#loadView').load('views/' + PAGE.PULSA_CONFIRM, pulsaConf.getData);
}

pulsaConf.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

pulsaConf.showView = function () {
    $('#loadView').show();
}

pulsaConf.hideModal = function () {
    $('#loadingModal').modal('hide');
}

pulsaConf.getData = function () {
    let choosedPaket = GLOBAL_PARAM.getPulsa();
    $('#namaPaket').text(choosedPaket.id);
    $('#harga').text("Rp. " + choosedPaket.jumlah);
    $('#nomorTujuan').text(choosedPaket.nomorHp);

    document.getElementById('back-btn').addEventListener("click", pulsaConf.backHistory, false);
    document.getElementById('cancelBtn').addEventListener("click", pulsaConf.backHistory, false);
    document.getElementById('okBtn').addEventListener("click", pulsaConf.insertPulsa, false);

}

pulsaConf.insertPulsa = function () {
    let choosedPaket = GLOBAL_PARAM.getPulsa();
    let user = GLOBAL_PARAM.getUserCredential();
    let requestBody = {
        idPaket: choosedPaket.id,
        namaPaket: choosedPaket.namaPaket,
        hargaPaket: choosedPaket.harga,
        nomorDari: user.noTelpon,
        nomorTujuan: choosedPaket.nomorHp,
        idUser: user.idUser
    }
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.INSERT_PULSA;
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
                GLOBAL_PARAM.clearPulsa();

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
                GLOBAL_PARAM.clearPulsa();
                GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
                changePage();
            });
        }
    });
}

pulsaConf.backHistory = function () {
    GLOBAL_PARAM.setPage(PAGE.PULSA);
    changePage();
}