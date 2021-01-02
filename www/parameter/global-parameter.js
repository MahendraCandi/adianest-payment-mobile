var GLOBAL_PARAM = {
    PHONE_NUMBER: "phone-number",
    TOP_UP: "TOP_UP",
    TOKEN: "TOKEN",
    USER: "USER",
    INTERNET: "INTERNET",
    SMS: "SMS",
    TELP: "TELP",
    PULSA: "PULSA",
    DIGITAL: "DIGITAL",
    DIGITAL_PAGE: "digital-page",
    SHOOPEE_PAY: "SHOOPE_PAY",
    OVO: "OVO",
    DANA: "DANA",
    GOPAY: "GOPAY",
    GRAB: "GRAB"
}

GLOBAL_PARAM.clearAllStorage = function () {
    window.localStorage.removeItem(GLOBAL_PARAM.PHONE_NUMBER);
    window.localStorage.removeItem(GLOBAL_PARAM.TOP_UP);
    window.localStorage.removeItem(GLOBAL_PARAM.TOKEN);
    window.localStorage.removeItem(GLOBAL_PARAM.USER);
    window.localStorage.removeItem(GLOBAL_PARAM.INTERNET);
    window.localStorage.removeItem(GLOBAL_PARAM.SMS);
    window.localStorage.removeItem(GLOBAL_PARAM.TELP);
    window.localStorage.removeItem(GLOBAL_PARAM.PULSA);
    window.localStorage.removeItem(GLOBAL_PARAM.DIGITAL);
    window.localStorage.removeItem(GLOBAL_PARAM.DIGITAL_PAGE);
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

GLOBAL_PARAM.setPaketTelp = function (paket) {
    window.localStorage.setItem(GLOBAL_PARAM.TELP, JSON.stringify(paket));
}

GLOBAL_PARAM.getPaketTelp = function () {
    return JSON.parse(window.localStorage.getItem(GLOBAL_PARAM.TELP));
}

GLOBAL_PARAM.clearPaketTelp = function () {
    return window.localStorage.removeItem(GLOBAL_PARAM.TELP);
}

GLOBAL_PARAM.setPulsa = function (paket) {
    window.localStorage.setItem(GLOBAL_PARAM.PULSA, JSON.stringify(paket));
}

GLOBAL_PARAM.getPulsa = function () {
    return JSON.parse(window.localStorage.getItem(GLOBAL_PARAM.PULSA));
}

GLOBAL_PARAM.clearPulsa = function () {
    return window.localStorage.removeItem(GLOBAL_PARAM.PULSA);
}

GLOBAL_PARAM.setDigital = function (paket) {
    window.localStorage.setItem(GLOBAL_PARAM.DIGITAL, JSON.stringify(paket));
}

GLOBAL_PARAM.getDigital = function () {
    return JSON.parse(window.localStorage.getItem(GLOBAL_PARAM.DIGITAL));
}

GLOBAL_PARAM.clearDigital = function () {
    return window.localStorage.removeItem(GLOBAL_PARAM.DIGITAL);
}

GLOBAL_PARAM.setDigitalPage = function (page) {
    window.localStorage.setItem(GLOBAL_PARAM.DIGITAL_PAGE, JSON.stringify(page));
}

GLOBAL_PARAM.getDigitalPage = function () {
    return JSON.parse(window.localStorage.getItem(GLOBAL_PARAM.DIGITAL_PAGE));
}

GLOBAL_PARAM.clearDigitalPage = function () {
    return window.localStorage.removeItem(GLOBAL_PARAM.DIGITAL_PAGE);
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
    window.localStorage.setItem(GLOBAL_PARAM.PHONE_NUMBER, phoneNumber);
}

GLOBAL_PARAM.getPhoneNumber = function() {
    let phoneNumber = window.localStorage.getItem(GLOBAL_PARAM.PHONE_NUMBER);
    return phoneNumber;
}

GLOBAL_PARAM.clearPhoneNumber = function() {
    window.localStorage.removeItem(GLOBAL_PARAM.PHONE_NUMBER);
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