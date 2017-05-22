"use strict";
var AutoCompleteConfig = (function () {
    function AutoCompleteConfig(dataSource, suggestFromCharNumber, placeholder, dataKey, dataValue) {
        this.placeholder = placeholder;
        this.dataSource = dataSource;
        this.suggestFromCharNumber = suggestFromCharNumber;
        this.dataKey = dataKey;
        this.dataValue = dataValue;
    }
    return AutoCompleteConfig;
}());
exports.AutoCompleteConfig = AutoCompleteConfig;
//# sourceMappingURL=autocomplete.config.js.map