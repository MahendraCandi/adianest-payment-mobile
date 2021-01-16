var profile = {}


profile.loadView = function () {
    $('#loadView').load('views/' + PAGE.PROFILE, profile.getData);
}

profile.hideView = function () {
    $('#loadView').attr('style', 'display:none !important');
}

profile.showView = function () {
    $('#loadView').show();
}

profile.hideModal = function () {
    $('#loadingModal').modal('hide');
}

profile.getData = function () {
    profile.getPicture();
}


profile.getPicture = function () {
    let u = GLOBAL_PARAM.getUserCredential();
    let image = document.getElementById('img-profile');
    image.addEventListener('error', profile.defaultImg, false);

    $('#nameLabel').text(u.nameUser);
    $('#phoneLabel').text(u.noTelpon);
    $('#namaLengkap').val(u.nameUser);
    $('#nomorPonsel').val(u.noTelpon);
    $('#email').val(u.emailUser);

    document.getElementById('fireBtn').addEventListener("click", profile.fireBtn, false);
    document.getElementById("openCamera").addEventListener("click", profile.openCamera, false);
    document.getElementById("openGallery").addEventListener("click", profile.openGallery, false);
    document.getElementById("back-btn").addEventListener("click", profile.backHistory, false);

    if (GLOBAL_PARAM.getAvailableImg() !== null) {
        let availableImg = GLOBAL_PARAM.getAvailableImg();
        image.src = "data:image/png;base64," + availableImg;
        return;
    }

    if (u.idPhoto === undefined || u.idPhoto === null) {
        return;
    }

    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.PROFILE_PICTURE + "/" + u.idPhoto;

    $.ajax({
        type: "GET",
        url: url,
        // dataType: 'arrayBuffer',
        xhrFields: {
            responseType: 'blob'
         },
        success: function (data) {
    
            let reader = new FileReader();
            reader.readAsDataURL(data); 
            reader.onloadend = function() {
                let base64data = reader.result;
                
                let split = base64data.split(",");
                GLOBAL_PARAM.setAvailableImg(split[1]);

                image.src = "data:image/png;base64," + split[1];
            }
        },
        error: function (request, status, error) {
            alert(error);
        }
    });
}

profile.fireBtn = function () {
    Swal.fire({
        title: 'Konfirmasi',
        text: "Yakin mau ubah profile?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
      }).then((result) => {
        if (result.isConfirmed) {
            profile.updateProfile();
        }
      })
}

profile.updateProfile = function () {
    let url = CONFIG_PROPERTIES.HOST_NAME + CONFIG_PROPERTIES.UPDATE_PROFILE;
    let u = GLOBAL_PARAM.getUserCredential();
    let formData = new FormData();

    let imageData = GLOBAL_PARAM.getImgProfile();
    if (imageData !== null) {
        formData.append("photo", profile.getBlobFromBase64(imageData), u.idUser + ".png");
    }

    let nama = $('#namaLengkap').val();
    let ponsel = $('#nomorPonsel').val();
    let email = $('#email').val();

    formData.append("namaLengkap", nama);
    formData.append("nomorPonsel", ponsel);
    formData.append("alamatEmail", email);
    formData.append("idUser", u.idUser);
    formData.append("authorities", u.idAuthorities);

    for (var value of formData.values()) {
        console.log(value);
     }

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
            Swal.fire({
                title: 'Sukses',
                text: 'Data berhasil diubah',
                icon: 'success'
            }).then((result) => {
                GLOBAL_PARAM.clearImgProfile();

                u.nameUser = nama;
                u.noTelpon = ponsel;
                u.emailUser = email;

                GLOBAL_PARAM.saveUserCredential(u);
                GLOBAL_PARAM.setPhoneNumber(ponsel);
                if (imageData) GLOBAL_PARAM.setAvailableImg(imageData);
               
                profile.getPicture();

            });
        },
        error: function (request, status, error) {
            Swal.fire({
                title: 'Gagal',
                text: 'Ubah profile gagal dilakukan',
                icon: 'error'
            }).then((result) => {
                profile.getPicture();
            });
        }
    });
}

profile.openCamera = function () {
    navigator.camera.getPicture(
        profile.successCallback, 
        profile.errorCallback, 
        {
            quality: 10,
            destinationType: Camera.DestinationType.DATA_URL
        }
    );
}

profile.openGallery = function () {
    navigator.camera.getPicture(
        profile.successCallback, 
        profile.errorCallback, 
        {
            quality: 10,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        }
    );
}

profile.successCallback = function (imageData) {
    GLOBAL_PARAM.setImgProfile(imageData);

    var image = document.getElementById('img-profile'); 
    image.src = "data:image/png;base64," + imageData;
}

profile.getBlobFromBase64 = function (base64) {
    base64 = "data:image/png;base64," + base64;

    const splitDataURI = base64.split(',');
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
        

    return new Blob([ia], { type: mimeString })
    // return blob;
}

profile.errorCallback = function (message) {
    alert("Failed because: " + message);
}

profile.backHistory = function () {
    // GLOBAL_PARAM.clearDigital();
    // GLOBAL_PARAM.clearDigitalPage();
    GLOBAL_PARAM.clearImgProfile();
    GLOBAL_PARAM.setPage(PAGE.MAIN_MENU);
    changePage();
}


profile.defaultImg = function () {
    this.src = "image/default-image.png";
}


