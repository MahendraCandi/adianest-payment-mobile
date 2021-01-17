appValidation = {}

appValidation.isPhoneNumberValid = function (phoneNumber) {
    return phoneNumber.startsWith("08") && phoneNumber.length >= 10;
}

appValidation.isBalanceEnough = function (harga) {
    let h = Number(harga);
    let balance = Number(GLOBAL_PARAM.getUserCredential().endingBalance);

    if (balance == 0 || balance <= h) {
        return false;
    }
    return true;
}