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
var commons_routes_1 = require('./commons.routes');
var common_1 = require("@angular/common");
var ng2_cloudinary_1 = require("ng2-cloudinary");
var ng2_file_upload_1 = require("ng2-file-upload");
var forms_1 = require("@angular/forms");
var ng2_auto_complete_1 = require("ng2-auto-complete");
var properties_service_1 = require("../../../providers/properties/properties.service");
var lookups_service_1 = require("../../../providers/lookups/lookups.service");
var form_field_module_1 = require("../../../modules/form-fields/form-field.module");
var angular_sortablejs_1 = require("angular-sortablejs");
var user_dropzone_1 = require("../../../directives/userdropzone/user.dropzone");
var CommonsModule = (function () {
    function CommonsModule() {
    }
    CommonsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng2_auto_complete_1.Ng2AutoCompleteModule,
                ng2_cloudinary_1.Ng2CloudinaryModule,
                ng2_file_upload_1.FileUploadModule,
                ng2_cloudinary_1.Ng2CloudinaryModule,
                ng2_file_upload_1.FileUploadModule,
                router_1.RouterModule.forChild(commons_routes_1.MODULE_ROUTES),
                form_field_module_1.FormFieldsModule,
                angular_sortablejs_1.SortablejsModule
            ],
            declarations: [commons_routes_1.MODULE_COMPONENTS, user_dropzone_1.UserDropzone],
            providers: [properties_service_1.PropertiesService, lookups_service_1.LookupsService]
        }), 
        __metadata('design:paramtypes', [])
    ], CommonsModule);
    return CommonsModule;
}());
exports.CommonsModule = CommonsModule;
//# sourceMappingURL=commons.module.js.map