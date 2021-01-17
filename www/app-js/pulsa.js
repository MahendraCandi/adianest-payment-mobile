var pulsa = {}


pulsa.loadView = function () {
    $('#loadView').load('views/' + PAGE.PULSA, pulsa.getData);
}

pulsa.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

pulsa.showView = function () {
    $('#loadView').show();
}

pulsa.hideModal = function () {
    $('#loadingModal').modal('hide');
}

pulsa.getData = function () {
    GLOBAL_PARAM.clearPulsa();
    pulsa.hideView();
    pulsa.getAllCategory();
}

pulsa.getAllCategory = function() {
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.KATEGORI_PULSA;
    $.ajax({
        type: "GET",
        url: url,
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + GLOBAL_PARAM.getToken()
        },
        success: function (data) {
            console.log(data);
            pulsa.setPaketButton(data);
        },
        complete: function () {
            pulsa.showView();
            document.getElementById('fireBtn').addEventListener("click", pulsa.fireBtn, false);
            document.getElementById('back-btn').addEventListener("click", pulsa.backHistory, false);
        },
        error: function (request, status, error) {
            alert(request.statusText + '\n' + url);
        }
    });
}

pulsa.fireBtn = function () {
    let nomorHp = $('#inputNomorHp').val();
    if (nomorHp === '') {
        alert('Masukkan nomor HP yang dituju!');
        return;
    }

    let choosedPaket = GLOBAL_PARAM.getPulsa();
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
    GLOBAL_PARAM.setPulsa(choosedPaket);

    GLOBAL_PARAM.setPage(PAGE.PULSA_CONFIRM);
    changePage();
}


pulsa.setPaketButton = function(data) {
    let div = document.getElementById('pulsa-kategori');
    let row = undefined;

    let indexData = 1;
    let records = $(data).length;
    $(data).each(function(i, paket) {
        if (i === 0) {
            row = pulsa.createRow();
        }

        let p = document.createElement('p');
        p.innerText = paket.jumlah;
        p.dataset.id = paket.idPaket;
        p.dataset.jumlah = paket.jumlah;
        p.dataset.harga = paket.hargaPaket;

        let wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'text-wrapper');
        wrapper.appendChild(p);
        wrapper.addEventListener('click', pulsa.choosePaket, false);

        let container = document.createElement('div');
        container.setAttribute('class', 'btn-container');
        container.appendChild(wrapper);

        row.appendChild(container);

        if (indexData % 3 === 0) {
            div.appendChild(row);
            row = pulsa.createRow(); 
        } else if (indexData === records) {
            div.appendChild(row);
            row = pulsa.createRow(); 
        }

        indexData++;
    });

}

pulsa.createRow = function() {
    let row = document.createElement('div');
    row.setAttribute('class', 'd-flex mb-3');
    return row;
}

pulsa.choosePaket = function() {
    $('div.bg-success').removeClass('bg-success');
    
    let attr = $(this).attr('class');
    $(this).attr('class', attr + " bg-success");

    let p = $(this).children('p');
    
    let choosedPaket = {
        id: "" + p.data('id'),
        jumlah: p.data('jumlah'),
        harga: "" + p.data('harga')
    }

    GLOBAL_PARAM.setPulsa(choosedPaket);
    
}

pulsa.backHistory = function () {
    GLOBAL_PARAM.clearPulsa();
    GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
    changePage();
}