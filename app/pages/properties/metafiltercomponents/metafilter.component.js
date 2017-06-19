"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var PropertyMetafilterComponent = (function () {
    function PropertyMetafilterComponent() {
        this.metafiltersModel = [];
    }
    PropertyMetafilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.metafilters = [];
        var values = this.propertyForm.controls['MetaData'].value;
        var control = this.propertyForm.controls['MetaDataTmp'];
        var _loop_1 = function(i) {
            control.addControl('type_' + this_1.metadata.MetaDataSubTypes[i].Id, new forms_1.FormArray([]));
            var controlSubtype = control.controls['type_' + this_1.metadata.MetaDataSubTypes[i].Id];
            var _loop_2 = function(j) {
                var obj = _.find(values, function (el) {
                    return el['MetaDataId'] == _this.metadata.MetaDataSubTypes[i].MetaData[j].Id;
                });
                // console.log('Available', obj)
                controlSubtype.push(new forms_1.FormGroup({
                    MetaDataId: new forms_1.FormControl(this_1.metadata.MetaDataSubTypes[i].MetaData[j].Id),
                    MetaDataName: new forms_1.FormControl(this_1.metadata.MetaDataSubTypes[i].MetaData[j].Name),
                    Available: new forms_1.FormControl(obj && obj['Available'] || false),
                }));
                /*
                this.metafiltersModel.push({
                    MetaDataId: this.metadata.MetaDataSubTypes[i].MetaData[j].Id,
                    MetaDataName: this.metadata.MetaDataSubTypes[i].MetaData[j].Name,
                    Available: obj && obj['Available'] || false,
                })
                */
                this_1.metafilters[this_1.metadata.MetaDataSubTypes[i].MetaData[j].Id] = obj && obj['Available'] || false;
            };
            for (var j = 0; j < this_1.metadata.MetaDataSubTypes[i].MetaData.length; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.metadata.MetaDataSubTypes.length; i++) {
            _loop_1(i);
        }
        $(".selectpicker").selectpicker({
            selectedTextFormat: 'static'
        });
        $('.dropdown-menu.inner').perfectScrollbar();
    };
    PropertyMetafilterComponent.prototype.subfilterModelChange = function (e, type) {
        var control = this.propertyForm.controls['MetaDataTmp'];
        var controlSubtype = control.controls[type];
        controlSubtype.controls.forEach(function (key, value) {
            e.find(function (el) {
                if (el.MetaDataId == key.value.MetaDataId) {
                    key.setValue({
                        MetaDataId: el.MetaDataId,
                        MetaDataName: el.MetaDataName,
                        Available: !el.Available,
                    });
                }
            });
        });
    };
    PropertyMetafilterComponent.prototype.subfilterChange = function (e) {
        console.log('event ', e.target.value);
        // let optionId = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-id') : e.target.parentElement.parentElement.getAttribute('option-id');
        // let optionName = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-name') : e.target.parentElement.parentElement.getAttribute('option-name');
        // let optionSubtype = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-subtype') : e.target.parentElement.parentElement.getAttribute('option-subtype');
        // let optionIndex = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-index') : e.target.parentElement.parentElement.getAttribute('option-index');
        /// this.metafilters[optionId] = !this.metafilters[optionId];
        /*
        $(e.target).change(function() {
            var latest_value = $("option:selected:first",this).val();
            //alert(latest_value);

        });
        $(e.target).on('change',function() {
            //alert($(this).val());
            console.log($('option:selected:first',this).val());
        });
        let selectedValue = $("option:selected",$(e.target)).val();
        console.log('Selected Value', selectedValue);

        const control = <FormGroup>this.propertyForm.controls['MetaDataTmp'];
        const controlSubtype = <FormArray>control.controls[e.target.getAttribute('option-subtype')];
        controlSubtype.controls[selectedValue].setValue({
            MetaDataId: controlSubtype.controls[selectedValue].value.MetaDataId,
            MetaDataName: controlSubtype.controls[selectedValue].value.MetaDataName,
            Available: !controlSubtype.controls[selectedValue].value.Available,
        });
        */
        //console.log('Control Form after', this.propertyForm.value)
        //console.log('Control metadata after', this.metafilters)
        //console.log('Control metafiltersModel after', this.metafiltersModel)
    };
    PropertyMetafilterComponent.prototype.removeMetafilter = function (e) {
        console.log('remove', e.index);
        var control = this.propertyForm.controls['MetaDataTmp'];
        var controlSubtype = control.controls[e.type];
        controlSubtype.controls[e.index].setValue({
            MetaDataId: controlSubtype.controls[e.index].value.MetaDataId,
            MetaDataName: controlSubtype.controls[e.index].value.MetaDataName,
            Available: !controlSubtype.controls[e.index].value.Available,
        });
    };
    __decorate([
        core_1.Input('metadata'), 
        __metadata('design:type', Object)
    ], PropertyMetafilterComponent.prototype, "metadata", void 0);
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormGroup)
    ], PropertyMetafilterComponent.prototype, "propertyForm", void 0);
    PropertyMetafilterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' property-metafilter-cmp',
            templateUrl: 'metafilter.component.html',
            styleUrls: ['metafilter.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], PropertyMetafilterComponent);
    return PropertyMetafilterComponent;
}());
exports.PropertyMetafilterComponent = PropertyMetafilterComponent;
//# sourceMappingURL=metafilter.component.js.map