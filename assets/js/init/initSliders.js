if ('undefined' !== typeof module) {

    module.exports = function initSliders(){
        // Sliders for demo purpose in refine cards section
        // Sliders for demo purpose
        $('#sliderRegular').noUiSlider({
            start: 40,
            connect: "lower",
            range: {
                min: 0,
                max: 100
            }
        });
    }
}
