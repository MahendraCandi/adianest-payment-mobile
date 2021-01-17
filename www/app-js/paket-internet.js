var internet = {}

internet.loadView = function () {
    $('#loadView').load('views/' + PAGE.PAKET_INTERNET, internet.getData);
}

internet.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

internet.showView = function () {
    $('#loadView').show();
}

internet.hideModal = function () {
    $('#loadingModal').modal('hide');
}

internet.getData = function () {
    GLOBAL_PARAM.clearPaketInternet();
    internet.hideView();
    internet.getAllCategory();
}

internet.getAllCategory = function() {
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.KATEGORI_INTERNET;
    $.ajax({
        type: "GET",
        url: url,
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + GLOBAL_PARAM.getToken()
        },
        success: function (data) {
            console.log(data);
            internet.setPaketButton(data);
        },
        complete: function () {
            internet.showView();
            document.getElementById('fireBtn').addEventListener("click", internet.fireBtn, false);
            document.getElementById('back-btn').addEventListener("click", internet.backHistory, false);
        },
        error: function (request, status, error) {
            alert(request.statusText + '\n' + url);
        }
    });
}

internet.fireBtn = function () {
    let nomorHp = $('#inputNomorHp').val();
    if (nomorHp === '') {
        alert('Masukkan nomor HP yang dituju!');
        return;
    }

    let choosedPaket = GLOBAL_PARAM.getPaketInternet();
    if (choosedPaket === null) {
        alert('Pilih paket yang mau dibeli!');
        return;
    }

    if (!appValidation.isPhoneNumberValid(nomorHp)) {
        alert('Nomor Hp yang dimasukkan tidak valid!')
        return;
    }

    if (!appValidation.isBalanceEnough(choosedPaket.harga)) {
        alert("Balance Saldo tidak mencukupi!")
        return;
    }

    choosedPaket.nomorHp = nomorHp;
    GLOBAL_PARAM.setPaketInternet(choosedPaket);

    GLOBAL_PARAM.setPage(PAGE.PAKET_INTERNET_CONFIRM);
    changePage();
}

internet.setPaketButton = function(data) {
    let div = document.getElementById('paket-internet-kategori');
    let row = undefined;

    let indexData = 1;
    $(data).each(function(i, paket) {
        if (i === 0) {
            row = internet.createRow();
        }

        let p = document.createElement('p');
        p.innerText = paket.namaPaket;
        p.dataset.id = paket.idKategori;
        p.dataset.jumlah = paket.jumlah;
        p.dataset.harga = paket.hargaPaket;

        let wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'text-wrapper');
        wrapper.appendChild(p);
        wrapper.addEventListener('click', internet.choosePaket, false);

        let container = document.createElement('div');
        container.setAttribute('class', 'btn-container');
        container.appendChild(wrapper);

        row.appendChild(container);

        if (indexData % 3 === 0) {
            div.appendChild(row);
            row = internet.createRow();
        }

        indexData++;
    });

}

internet.createRow = function() {
    let row = document.createElement('div');
    row.setAttribute('class', 'd-flex mb-3');
    return row;
}

internet.choosePaket = function() {
    $('div.bg-success').removeClass('bg-success');
    
    let attr = $(this).attr('class');
    $(this).attr('class', attr + " bg-success");

    let p = $(this).children('p');
    
    let choosedPaket = {
        id: p.data('id'),
        jumlah: "" + p.data('jumlah'),
        namaPaket: p.text(),
        harga: "" + p.data('harga')
    }

    GLOBAL_PARAM.setPaketInternet(choosedPaket);
    
}

internet.backHistory = function () {
    GLOBAL_PARAM.clearPaketInternet();
    GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
    changePage();
}

