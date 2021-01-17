var sms = {}

sms.loadView = function () {
    $('#loadView').load('views/' + PAGE.SMS, sms.getData);
}

sms.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

sms.showView = function () {
    $('#loadView').show();
}

sms.hideModal = function () {
    $('#loadingModal').modal('hide');
}

sms.getData = function () {
    sms.getKategori();
    document.getElementById('back-btn').addEventListener('click', sms.backHistory, false);
}

sms.getKategori = function () {
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.KETEGORI_SMS;
    $.ajax({
        type: "GET",
        url: url,
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + GLOBAL_PARAM.getToken()
        },
        success: function (data) {
            console.log(data);
            sms.createListPackage(data);
            document.getElementById('fireBtn').addEventListener('click', sms.fireBtn, false);
        },
        error: function (request, status, error) {
            alert(request.statusText + '\n' + url);
        }
    });
}

sms.createListPackage = function (data) {
    let listPackage = document.getElementById('paket-sms-kategori');

    $(data).each(function (i, p) {
        let span = document.createElement('span');
        span.setAttribute('class', 'my-auto');
        span.innerText = p.deskripsiPaket;
        span.dataset.idPaket = p.idPaket;
        span.dataset.harga = p.harga;

        let wrap = document.createElement('div');
        wrap.setAttribute('class', 'd-flex flex-column smsDescription');
        wrap.appendChild(span);
        wrap.addEventListener('click', sms.choosePaket, false);
        
        listPackage.appendChild(wrap);
    });
}

sms.choosePaket = function () {
    $('div.bg-success').removeClass('bg-success');
    
    let attr = $(this).attr('class');
    $(this).attr('class', attr + " bg-success");

    let s = $(this).children('span');
    let paketSms = {
        idPaket: s.data("idPaket"),
        deskripsiPaket: s.text(),
        harga: "" + s.data('harga')
    }

    GLOBAL_PARAM.setPaketSms(paketSms);
}

sms.fireBtn = function () {
    let nomorTujuan = $('#inputNomorHp').val();
    if (nomorTujuan === '') {
        alert('Masukkan nomor HP yang dituju!');
        return;
    }

    let choosedPaket = GLOBAL_PARAM.getPaketSms();
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
    GLOBAL_PARAM.setPaketSms(choosedPaket);

    GLOBAL_PARAM.setPage(PAGE.SMS_CONFIRM);
    changePage();
}

sms.backHistory = function () {
    GLOBAL_PARAM.clearPaketSms();
    GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
    changePage();
}