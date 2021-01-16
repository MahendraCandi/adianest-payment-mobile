var transDetail = {}

transDetail.loadView = function () {
    $('#loadView').load('views/' + PAGE.TRANSAKSI_DETAIL, transDetail.getData);
}

transDetail.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

transDetail.showView = function () {
    $('#loadView').show();
}

transDetail.hideModal = function () {
    $('#loadingModal').modal('hide');
}

transDetail.getData = function () {
    transDetail.showView();
    document.getElementById('back-btn').addEventListener('click', transDetail.backHistory, false);
    transDetail.getTransaksiDetail();
}

transDetail.getTransaksiDetail = function () {
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.TRANSAKSI_DETAIL;
    
    let formData = new FormData();

    formData.append("id", GLOBAL_PARAM.getTransaksiDetail().idTransaksi);

    $.ajax({
        type: "POST",
        url: url,
        contentType: false,
        processData: false,
        headers: {
            'Authorization': 'Bearer ' + GLOBAL_PARAM.getToken()
        },
        data: formData,
        success: function (data) {
            console.log(data);
            $('#noTransaksi').text(data.noTransaksi);
            $('#noTujuan').text(data.noTujuan);
            $('#harga').text('Rp. ' + data.harga);
            $('#jenis').text(data.jenis);
            $('#nominal').text('Rp. ' + data.nominal);
            $('#waktu').text(data.tanggal + ', ' + data.waktu);
            $('#statusTransaksi').text('SUKSES');
            
        },
        error: function (request, status, error) {
            alert(request.statusText + '\n' + url);
            GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
            changePage();
        }
    });
}

transDetail.backHistory = function () {
    GLOBAL_PARAM.setPage(GLOBAL_PARAM.getTransaksiDetail().returnPage);
    changePage();
}

transDetail.updateStatusToRead = function () {
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.NOTIFICATION_UPDATE;
    
    let formData = new FormData();

    formData.append("idTransaksi", GLOBAL_PARAM.getTransaksiDetail().idTransaksi);

    $.ajax({
        type: "POST",
        url: url,
        contentType: false,
        processData: false,
        headers: {
            'Authorization': 'Bearer ' + GLOBAL_PARAM.getToken()
        },
        data: formData,
        success: function (data) {
            console.log(data);
        },
        error: function (request, status, error) {
            alert(request.statusText + '\n' + url);
            GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
            changePage();
        }
    });
}

