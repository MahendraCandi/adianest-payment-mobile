var digitalConf = {}

digitalConf.loadView = function () {
    $('#loadView').load('views/' + PAGE.DIGITAL_CONFIRM, digitalConf.getData);
}

digitalConf.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

digitalConf.showView = function () {
    $('#loadView').show();
}

digitalConf.hideModal = function () {
    $('#loadingModal').modal('hide');
}

digitalConf.getData = function () {
    let choosedPaket = GLOBAL_PARAM.getDigital();
    $('#namaPaket').text(choosedPaket.id);
    $('#harga').text("Rp. " + choosedPaket.jumlah);
    $('#nomorTujuan').text(choosedPaket.nomorHp);

    document.getElementById('back-btn').addEventListener("click", digitalConf.backHistory, false);
    document.getElementById('cancelBtn').addEventListener("click", digitalConf.backHistory, false);
    document.getElementById('okBtn').addEventListener("click", digitalConf.insertDigital, false);

}

digitalConf.insertDigital = function () {
    let choosedPaket = GLOBAL_PARAM.getDigital();
    let user = GLOBAL_PARAM.getUserCredential();
    let requestBody = {
        idPaket: choosedPaket.id,
        idKategori: GLOBAL_PARAM.getDigitalPage().page,
        nominalTransfer: choosedPaket.harga,
        nomorTujuan: choosedPaket.nomorHp,
        idUser: user.idUser
    }
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.INSERT_DIGITAL;
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
                GLOBAL_PARAM.clearDigital();
                GLOBAL_PARAM.clearDigitalPage();

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
                GLOBAL_PARAM.clearDigital();
                GLOBAL_PARAM.clearDigitalPage();
                GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
                changePage();
            });
        }
    });
}

digitalConf.backHistory = function () {
    GLOBAL_PARAM.setPage(PAGE.DIGITAL);
    changePage();
}