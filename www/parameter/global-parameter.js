var GLOBAL_PARAM = {
    TOP_UP: "TOP_UP",
    TOKEN: "TOKEN",
    USER: "USER",
    INTERNET: "INTERNET",
    SMS: "SMS"
}

GLOBAL_PARAM.setTopUp = function (userId, transaksiId, kodePembayaran) {
    let topUp = {
        userId : userId,
        transaksiId : transaksiId,
        kodePembayaran : kodePembayaran
    }

    window.localStorage.setItem(this.TOP_UP, JSON.stringify(topUp));
}

GLOBAL_PARAM.getTopUp = function() {
    return JSON.parse(window.localStorage.getItem(this.TOP_UP));
}

GLOBAL_PARAM.clearTopUp = function() {
    window.localStorage.removeItem(this.TOP_UP)
}

GLOBAL_PARAM.setPaketInternet = function(choosedPaket) {
    window.localStorage.setItem(GLOBAL_PARAM.INTERNET, JSON.stringify(choosedPaket));
}

GLOBAL_PARAM.getPaketInternet = function () {
    return JSON.parse(window.localStorage.getItem(GLOBAL_PARAM.INTERNET));
}

GLOBAL_PARAM.clearPaketInternet = function () {
    return window.localStorage.removeItem(GLOBAL_PARAM.INTERNET);
}

GLOBAL_PARAM.setPaketSms = function (paket) {
    window.localStorage.setItem(GLOBAL_PARAM.SMS, JSON.stringify(paket));
}

GLOBAL_PARAM.getPaketSms = function () {
    return JSON.parse(window.localStorage.getItem(GLOBAL_PARAM.SMS));
}

GLOBAL_PARAM.clearPaketSms = function () {
    return window.localStorage.removeItem(GLOBAL_PARAM.SMS);
}

GLOBAL_PARAM.saveToken = function(token) {
    window.localStorage.setItem(this.TOKEN, JSON.stringify(token));
}

GLOBAL_PARAM.getToken = function() {
    if (window.localStorage.getItem(this.TOKEN) === null) {
        return null;
    }
    return JSON.parse(window.localStorage.getItem(this.TOKEN)).token;
}

GLOBAL_PARAM.getTokenExpirationDate = function() {
    let expirationDate = JSON.parse(window.localStorage.getItem(this.TOKEN)).expirationDate;
    return new Date(expirationDate);
}

GLOBAL_PARAM.clearToken = function() {
    window.localStorage.removeItem(this.TOKEN);
}

GLOBAL_PARAM.setPhoneNumber = function(phoneNumber) {
    window.localStorage.setItem("phone-number", phoneNumber);
}

GLOBAL_PARAM.getPhoneNumber = function() {
    let phoneNumber = window.localStorage.getItem("phone-number");
    return phoneNumber;
}

GLOBAL_PARAM.clearPhoneNumber = function() {
    window.localStorage.removeItem("phone-number");
}

GLOBAL_PARAM.saveUserCredential = function(user) {
    window.localStorage.setItem(this.USER, JSON.stringify(user));
}

GLOBAL_PARAM.getUserCredential = function() {
    return JSON.parse(window.localStorage.getItem(this.USER));
}

GLOBAL_PARAM.setPage = function(page) {
    window.sessionStorage.setItem("page", page);
}

GLOBAL_PARAM.getLastPage = function() {
    return window.sessionStorage.getItem("page");
}

GLOBAL_PARAM.clearPage = function() {
    window.sessionStorage.removeItem("page");
}