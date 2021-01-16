var history = {}

history.loadView = function () {
    $('#loadView').load('views/' + PAGE.HISTORY, history.getData);
}

history.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

history.showView = function () {
    $('#loadView').show();
}

history.hideModal = function () {
    $('#loadingModal').modal('hide');
}

history.getData = function () {
    history.showView();
    document.getElementById('back-btn').addEventListener('click', history.backHistory, false);
    history.getAllHistory();
}

history.getAllHistory = function () {
    let user = GLOBAL_PARAM.getUserCredential();
    let requestBody = {
        idUser: user.idUser
    }
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.HISTORY;
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
            history.setTransaksiList(data);
        },
        error: function (request, status, error) {
            alert(request.statusText + '\n' + url);
        }
    });
}

history.setTransaksiList = function (data) {
    let historyList = document.getElementById('historyList');
    $(data).each(function (i, h) {

        let row = history.createRow();
        row.dataset.idTransaksi = h.idTransaksi;
        row.addEventListener('click', history.getTransaksiDetail, false);

        let span = document.createElement('span');
        span.innerText = '*';

        let number = document.createElement('div');
        number.setAttribute('class', 'mr-1');
        number.appendChild(span);

        let tgl = document.createElement('span');
        tgl.innerText = h.tglTransaksi;

        let deskripsi = document.createElement('span');
        deskripsi.innerText = h.deskripsi;

        let historyDescription = document.createElement('div');
        historyDescription.setAttribute('class', 'd-flex flex-column');
        historyDescription.appendChild(tgl);
        historyDescription.appendChild(deskripsi);

        row.appendChild(number);
        row.appendChild(historyDescription);

        historyList.appendChild(row);
    });

}

history.createRow = function () {
    let row = document.createElement('div');
    row.setAttribute('class', 'd-flex mb-2');
    return row;
}

history.backHistory = function () {
    GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
    changePage();
}

history.getTransaksiDetail = function () {
    let page = GLOBAL_PARAM.getLastPage();
    GLOBAL_PARAM.setPage(PAGE.TRANSAKSI_DETAIL);
    GLOBAL_PARAM.setTransaksiDetail(this.dataset.idTransaksi, page);
    changePage();
}