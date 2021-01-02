var digital = {}


digital.loadView = function () {
    $('#loadView').load('views/' + PAGE.DIGITAL, digital.getData);
}

digital.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

digital.showView = function () {
    $('#loadView').show();
}

digital.hideModal = function () {
    $('#loadingModal').modal('hide');
}

digital.getData = function () {
    GLOBAL_PARAM.clearDigital();
    digital.hideView();
    digital.setTitle();
    digital.getAllCategory();
}

digital.setTitle = function () {
    let page = GLOBAL_PARAM.getDigitalPage().page;
    let title = "";

    if (page === GLOBAL_PARAM.SHOOPEE_PAY) {
        title = "ShoopePay";
    } else if (page === GLOBAL_PARAM.OVO) {
        title = "OVO";
    } else if (page === GLOBAL_PARAM.DANA) {
        title = "DANA";
    } else if (page === GLOBAL_PARAM.GOPAY) {
        title = "Gopay";
    } else if (page === GLOBAL_PARAM.GRAB) {
        title = "Grab";
    }

    $('#digitalPageTitle').text(title);
    $('#insertTitle').text('Masukkan nomor ' + title);
}

digital.getAllCategory = function() {
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.KATEGORI_DIGITAL;
    $.ajax({
        type: "GET",
        url: url,
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + GLOBAL_PARAM.getToken()
        },
        success: function (data) {
            console.log(data);
            digital.setPaketButton(data);
        },
        complete: function () {
            digital.showView();
            document.getElementById('fireBtn').addEventListener("click", digital.fireBtn, false);
            document.getElementById('back-btn').addEventListener("click", digital.backHistory, false);
        },
        error: function (request, status, error) {
            alert(request.statusText + '\n' + url);
        }
    });
}

digital.fireBtn = function () {
    let nomorHp = $('#inputNomorHp').val();
    if (nomorHp === '') {
        alert('Masukkan nomor HP yang dituju!');
        return;
    }

    let choosedPaket = GLOBAL_PARAM.getDigital();
    if (choosedPaket === null) {
        alert('Pilih paket yang mau dibeli!');
        return;
    }
    choosedPaket.nomorHp = nomorHp;
    GLOBAL_PARAM.setDigital(choosedPaket);

    GLOBAL_PARAM.setPage(PAGE.DIGITAL_CONFIRM);
    changePage();
}


digital.setPaketButton = function(data) {
    let div = document.getElementById('digital-kategori');
    let row = undefined;

    let indexData = 1;
    let records = $(data).length;
    $(data).each(function(i, paket) {
        if (i === 0) {
            row = digital.createRow();
        }

        let p = document.createElement('p');
        p.innerText = paket.jumlah;
        p.dataset.id = paket.idPaket;
        p.dataset.jumlah = paket.jumlah;
        p.dataset.harga = paket.hargaPaket;

        let wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'text-wrapper');
        wrapper.appendChild(p);
        wrapper.addEventListener('click', digital.choosePaket, false);

        let container = document.createElement('div');
        container.setAttribute('class', 'btn-container');
        container.appendChild(wrapper);

        row.appendChild(container);

        if (indexData % 3 === 0) {
            div.appendChild(row);
            row = digital.createRow(); 
        } else if (indexData === records) {
            div.appendChild(row);
            row = digital.createRow(); 
        }

        indexData++;
    });

}

digital.createRow = function() {
    let row = document.createElement('div');
    row.setAttribute('class', 'd-flex mb-3');
    return row;
}

digital.choosePaket = function() {
    $('div.bg-success').removeClass('bg-success');
    
    let attr = $(this).attr('class');
    $(this).attr('class', attr + " bg-success");

    let p = $(this).children('p');
    
    let choosedPaket = {
        id: "" + p.data('id'),
        jumlah: p.data('jumlah'),
        harga: "" + p.data('harga')
    }

    GLOBAL_PARAM.setDigital(choosedPaket);
    
}

digital.backHistory = function () {
    GLOBAL_PARAM.clearDigital();
    GLOBAL_PARAM.clearDigitalPage();
    GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
    changePage();
}