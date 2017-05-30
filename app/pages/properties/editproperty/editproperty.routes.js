"use strict";
var editproperty_component_1 = require("./editproperty.component");
var propertyinfo_component_1 = require("../propertyinfo/propertyinfo.component");
var propertyimage_component_1 = require("../propertyimage/propertyimage.component");
var propertymarketing_component_1 = require("../marketing/propertymarketing.component");
var metafilterheading_component_1 = require("../metafilterheading/metafilterheading.component");
var metafilter_component_1 = require("../metafiltercomponents/metafilter.component");
exports.MODULE_ROUTES = [
    { path: '', component: editproperty_component_1.EditpropertyComponent, pathMatch: 'full' }
];
exports.MODULE_COMPONENTS = [
    metafilter_component_1.PropertyMetafilterComponent,
    editproperty_component_1.EditpropertyComponent,
    metafilterheading_component_1.MetafilterheadingComponent,
    propertyinfo_component_1.PropertyinfoComponent,
    propertyimage_component_1.PropertyimageoComponent,
    propertymarketing_component_1.PropertymarketingComponent,
];
//# sourceMappingURL=editproperty.routes.js.map