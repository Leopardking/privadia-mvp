"use strict";
var propertyinfo_component_1 = require("../propertyinfo/propertyinfo.component");
var propertyimage_component_1 = require("../propertyimage/propertyimage.component");
var propertymarketing_component_1 = require("../marketing/propertymarketing.component");
var metafilterheading_component_1 = require("../metafilterheading/metafilterheading.component");
var metafilter_component_1 = require("../metafiltercomponents/metafilter.component");
var addproperty_component_1 = require("./addproperty.component");
exports.MODULE_ROUTES = [
    { path: '', component: addproperty_component_1.AddpropertyComponent, pathMatch: 'full' }
];
exports.MODULE_COMPONENTS = [
    metafilter_component_1.PropertyMetafilterComponent,
    addproperty_component_1.AddpropertyComponent,
    metafilterheading_component_1.MetafilterheadingComponent,
    propertyinfo_component_1.PropertyinfoComponent,
    propertyimage_component_1.PropertyimageoComponent,
    propertymarketing_component_1.PropertymarketingComponent,
];
//# sourceMappingURL=addproperty.routes.js.map