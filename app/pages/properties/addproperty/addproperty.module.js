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
var router_1 = require('@angular/router');
var addproperty_routes_1 = require('./addproperty.routes');
var commons_routes_1 = require('../commons/commons.routes');
var common_1 = require("@angular/common");
var ng2_auto_complete_1 = require("ng2-auto-complete");
var ng2_cloudinary_1 = require("ng2-cloudinary");
var ng2_file_upload_1 = require("ng2-file-upload");
var forms_1 = require("@angular/forms");
var AddpropertyModule = (function () {
    function AddpropertyModule() {
    }
    AddpropertyModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                ng2_auto_complete_1.Ng2AutoCompleteModule,
                ng2_cloudinary_1.Ng2CloudinaryModule,
                ng2_file_upload_1.FileUploadModule,
                router_1.RouterModule.forChild(addproperty_routes_1.MODULE_ROUTES),
            ],
            declarations: [addproperty_routes_1.MODULE_COMPONENTS, commons_routes_1.MODULE_COMPONENTS]
        }), 
        __metadata('design:paramtypes', [])
    ], AddpropertyModule);
    return AddpropertyModule;
}());
exports.AddpropertyModule = AddpropertyModule;
//# sourceMappingURL=addproperty.module.js.map