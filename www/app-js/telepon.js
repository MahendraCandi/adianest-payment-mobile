var telp = {}

telp.loadView = function () {
    $('#loadView').load('views/' + PAGE.TELEPON, telp.getData);
}

telp.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

telp.showView = function () {
    $('#loadView').show();
}

telp.hideModal = function () {
    $('#loadingModal').modal('hide');
}

telp.getData = function () {
    telp.getKategori();
    document.getElementById('back-btn').addEventListener('click', telp.backHistory, false);
}

telp.getKategori = function () {
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.KATEGORI_TELEPON;
    $.ajax({
        type: "GET",
        url: url,
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + GLOBAL_PARAM.getToken()
        },
        success: function (data) {
            console.log(data);
            telp.createListPackage(data);
            document.getElementById('fireBtn').addEventListener('click', telp.fireBtn, false);
        },
        error: function (request, status, error) {
            alert(request.statusText + '\n' + url);
        }
    });
}

telp.createListPackage = function (data) {
    let listPackage = document.getElementById('paket-telp-kategori');

    $(data).each(function (i, p) {
        let span = document.createElement('span');
        span.setAttribute('class', 'my-auto');
        span.innerText = p.deskripsiPaket;
        span.dataset.idPaket = p.idPaket;
        span.dataset.harga = p.harga;

        let wrap = document.createElement('div');
        wrap.setAttribute('class', 'd-flex flex-column smsDescription');
        wrap.appendChild(span);
        wrap.addEventListener('click', telp.choosePaket, false);
        
        listPackage.appendChild(wrap);
    });
}

telp.choosePaket = function () {
    $('div.bg-success').removeClass('bg-success');
    
    let attr = $(this).attr('class');
    $(this).attr('class', attr + " bg-success");

    let s = $(this).children('span');
    let paket = {
        idPaket: s.data("idPaket"),
        deskripsiPaket: s.text(),
        harga: "" + s.data('harga')
    }

    GLOBAL_PARAM.setPaketTelp(paket);
}

telp.fireBtn = function () {
    let nomorTujuan = $('#inputNomorHp').val();
    if (nomorTujuan === '') {
        alert('Masukkan nomor HP yang dituju!');
        return;
    }

    let choosedPaket = GLOBAL_PARAM.getPaketTelp();
    if (choosedPaket === null) {
        alert('Pilih paket yang mau dibeli!');
        return;
    }

    if (!appValidation.isPhoneNumberValid(nomorTujuan)) {
        alert('Nomor Hp yang dimasukkan tidak valid!')
        return;
    }

    if (!appValidation.isBalanceEnough(choosedPaket.harga)) {
        alert("Balance Saldo tidak mencukupi!")
        return;
    }

    choosedPaket.nomorTujuan = nomorTujuan;
    GLOBAL_PARAM.setPaketTelp(choosedPaket);

    GLOBAL_PARAM.setPage(PAGE.TELEPON_CONFIRM);
    changePage();
}

telp.backHistory = function () {
    GLOBAL_PARAM.clearPaketTelp();
    GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
    changePage();
}