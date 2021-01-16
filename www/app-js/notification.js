var notif = {}

notif.loadView = function () {
    $('#loadView').load('views/' + PAGE.NOTIFICATION, notif.getData);
}

notif.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

notif.showView = function () {
    $('#loadView').show();
}

notif.hideModal = function () {
    $('#loadingModal').modal('hide');
}

notif.getData = function () {
    notif.showView();
    document.getElementById('back-btn').addEventListener('click', notif.backnotif, false);
    
    notif.getAllNotification();
}

notif.getAllNotification = function () {
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.NOTIFICATION;
    let u = GLOBAL_PARAM.getUserCredential();
    let formData = new FormData();
    formData.append("id", u.idUser);
    
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
            notif.setTransaksiList(data);
        },
        error: function (request, status, error) {
            alert(request.statusText + '\n' + url);
        }
    });
}

notif.setTransaksiList = function (data) {
    let notifList = document.getElementById('notifikasiList');
    if ($(data).length === 0) {
        let info = document.createElement('span');
        info.innerText = "Belum ada notifikasi";
        notifList.appendChild(info);
        return;
    }

    $(data).each(function (i, h) {

        let row = notif.createRow();
        row.dataset.idTransaksi = h.idTransaksi;
        row.addEventListener('click', notif.getTransaksiDetail, false);

        let tgl = document.createElement('span');
        tgl.innerText = h.tglTransaksi;

        let deskripsi = document.createElement('span');
        deskripsi.innerText = h.pesan;

        if (h.status === "0") {
            tgl.setAttribute('class', 'font-weight-bold');
            deskripsi.setAttribute('class', 'font-weight-bold');
        }

        row.appendChild(tgl);
        row.appendChild(deskripsi);

        notifList.appendChild(row);
    });

}

/*
<div class="d-flex flex-column mb-3">
    <span>5 Desember 2020</span>
    <span>Pembelian paket data 10 GB ke no. 081212341234 berhasil, harga Rp. 80.000</span>
</div>
*/

notif.createRow = function () {
    let row = document.createElement('div');
    row.setAttribute('class', 'd-flex flex-column mb-3');
    return row;
}

notif.backnotif = function () {
    GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
    changePage();
}

notif.getTransaksiDetail = function () {
    let page = GLOBAL_PARAM.getLastPage();
    GLOBAL_PARAM.setPage(PAGE.TRANSAKSI_DETAIL);
    GLOBAL_PARAM.setTransaksiDetail(this.dataset.idTransaksi, page);
    transDetail.updateStatusToRead();
    changePage();
}
