var topUpPage = {}

topUpPage.PARAM_KATEGORI_TOP_UP = '';

topUpPage.loadView = function () {
    $('#loadView').load('views/' + PAGE.TOP_UP, topUpPage.getData);
}

topUpPage.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

topUpPage.showView = function () {
    $('#loadView').show();
}

topUpPage.hideModal = function () {
    $('#loadingModal').modal('hide');
}

topUpPage.getData = function () {
    topUpPage.hideView();
    topUpPage.disabledButton();
    GLOBAL_PARAM.clearTopUp();

    topUpPage.getDataTopUp();

    document.getElementById("back-btn").addEventListener("click", topUpPage.backHistory, false);
    document.getElementById("topup-btn").addEventListener("click", topUpPage.confirmTopUp, false);
    document.getElementById("nominal-topup").addEventListener("keyup", function(e) {
        let amount = formatRupiah(this.value);
        // let amount = Number(this.value).toLocaleString('ID');
        $('#nominal-topup').val(amount);
    }, false);
    
    topUpPage.showView();
    topUpPage.hideModal();
}

topUpPage.getDataTopUp = function () {
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.KATEGORI_TOPUP_ALL;
    $.ajax({
        type: "GET",
        url: url,
        headers: {
            'Authorization': 'Bearer ' + GLOBAL_PARAM.getToken()
        },
        success: function (data) {
            console.log(data);
            topUpPage.insertItemToDom(data);
            topUpPage.enabledButton();
        },
        error: function (request, status, error) {
            let mainKategori = document.getElementsByClassName("main-kategori")[0];
            let spanError = document.createElement('span');
            spanError.setAttribute('class', 'text-danger');
            spanError.innerText = "Failed get kategori! " + request.statusText;
            mainKategori.appendChild(spanError);

            spanError = document.createElement('span');
            spanError.setAttribute('class', 'text-danger');
            spanError.innerText = "url: " + url;
            mainKategori.appendChild(spanError);
            topUpPage.disabledButton();
        }
    });
}

topUpPage.confirmTopUp = function () {
    let confirmBody = topUpPage.prepareResquestBody();

    if (confirmBody['kategoriTopUp'] === undefined || confirmBody['kategoriTopUp'] === '') {
        alert('Silakan pilih via pembayaran!');
        return;
    } else if (confirmBody['nominalTopUp'] === undefined || confirmBody['nominalTopUp'] === '') {
        alert('Mohon masukkan jumlah nominal top up!');
        return;
    }

    if (Number(confirmBody.nominalTopUp) < 20000) {
        alert("Pengisian top up minimal Rp. 20.000!");
        return;
    }

    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.TOPUP_CONFIRM_INSERT;
    $.ajax({
        type: "POST",
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(confirmBody),
        headers: {
            'Authorization': 'Bearer ' + GLOBAL_PARAM.getToken()
        },
        async: false,
        success: function (data) {
            console.log(data);
            topUpPage.saveParameter(data);
            topUpPage.changePageToConfirm();
        },
        error: function (request, status, error) {
            let inputSection = document.getElementById("input-section");
            let spanError = document.createElement('span');
            spanError.setAttribute('class', 'text-danger');
            spanError.innerText = "Failed top up! " + request.statusText;
            $(spanError).insertAfter(inputSection);

            spanError = document.createElement('span');
            spanError.setAttribute('class', 'text-danger');
            spanError.innerText = "url: " + url;
            $(spanError).insertAfter(inputSection);
        }
    });
}

topUpPage.changePageToConfirm = function () {
    GLOBAL_PARAM.setPage(PAGE.TOP_UP_CONFIRM);
    changePage();
}

topUpPage.prepareResquestBody = function () {
    let kategoriTopUp = topUpPage.getKategoriTopUp();
    let nominalTopUp = $('#nominal-topup').val().replace(/\./g, '').toString();

    let userCredential = GLOBAL_PARAM.getUserCredential();
    let requestBody = {
        userId: userCredential.idUser,
        noTelpon: userCredential.noTelpon,
        kategoriTransaksi: "TOP_UP",
        kategoriTopUp: kategoriTopUp,
        nominalTopUp: nominalTopUp
    }

    return requestBody;
}

topUpPage.insertItemToDom = function (data) {
    let mainKategori = document.getElementsByClassName("main-kategori")[0];
    let rowKategori = null;
    let indexData = 1;
    $(data).each(function (index, kategori) {

        if (index === 0) {
            rowKategori = topUpPage.createRowKategori();
        }

        let itemKategori = topUpPage.createItemKategori(kategori['id']);
        rowKategori.appendChild(itemKategori);

        if (indexData % 3 === 0) {
            mainKategori.appendChild(rowKategori);
            rowKategori = topUpPage.createRowKategori();
        }

        indexData++;
    });
}

topUpPage.createRowKategori = function () {
    let rowKategori = document.createElement('div');
    rowKategori.setAttribute("class", "row-kategori");
    return rowKategori;
}

topUpPage.createItemKategori = function (buttonValue) {
    let itemKategori = document.createElement('div');
    itemKategori.setAttribute("class", "item-kategori");

    let btnKategori = document.createElement('button');
    btnKategori.setAttribute('class', 'btn btn-outline-success');
    btnKategori.setAttribute('value', buttonValue);
    btnKategori.innerHTML = buttonValue;
    btnKategori.addEventListener("click", topUpPage.saveKategoriTopUp, false);

    itemKategori.appendChild(btnKategori);
    return itemKategori;
}

topUpPage.disabledButton = function () {

    $('#topup-btn').attr('disabled');
    $('#nominal-topup').attr('disabled');

    document.getElementById('topup-btn').setAttribute("disabled", "");
    document.getElementById('nominal-topup').setAttribute("disabled", "");

    let test1 = document.getElementById('topup-btn');
    let test2 = document.getElementById('nominal-topup');
}

topUpPage.enabledButton = function () {
    $('#topup-btn').removeAttr('disabled');
    $('#nominal-topup').removeAttr('disabled');
}

topUpPage.saveKategoriTopUp = function () {
    topUpPage.PARAM_KATEGORI_TOP_UP = $(this).val();
}

topUpPage.getKategoriTopUp = function () {
    return topUpPage.PARAM_KATEGORI_TOP_UP;
}

topUpPage.saveParameter = function (data) {
    GLOBAL_PARAM.setTopUp(data.userId, data.transaksiId, data.kodePembayaran);
}

topUpPage.backHistory = function () {
    GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
    changePage();
}