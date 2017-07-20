"use strict";
function handlerErrorFieds(e, form) {
    var fileds = Object.keys(e.ModelState || {});
    this.errorsList = e.ModelState;
    fileds.forEach(function (field) {
        // console.log('control',form.controls[field.split('.')[0]])
        form.controls[field.split('.')[0]].setErrors({ serverError: e.ModelState[field] });
    });
}
exports.handlerErrorFieds = handlerErrorFieds;
function handlerErrorNotify(errorMessage) {
    $.notify({
        icon: "notifications",
        message: errorMessage
    }, {
        type: 'danger',
        timer: 3000,
        placement: {
            from: 'top',
            align: 'right'
        }
    });
}
exports.handlerErrorNotify = handlerErrorNotify;
//# sourceMappingURL=helpers.js.map