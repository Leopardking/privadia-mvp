declare const $:any;

export function handlerErrorFieds(e, form) {
    const fileds = Object.keys( e.ModelState || {});
    this.errorsList = e.ModelState;
    fileds.forEach((field) => {
        form.controls[field.split('.')[0]].setErrors({ serverError: e.ModelState[field] });
    });
}

export function handlerErrorNotify(errorMessage) {
    $.notify({
        icon: "notifications",
        message: errorMessage

    },{
        type: 'danger',
        timer: 3000,
        placement: {
            from: 'top',
            align: 'right'
        }
    });
}