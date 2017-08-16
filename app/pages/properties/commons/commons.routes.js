"use strict";
var addproperty_component_1 = require("../addproperty/addproperty.component");
var editproperty_component_1 = require("../editproperty/editproperty.component");
var propertyinfo_component_1 = require("../propertyinfo/propertyinfo.component");
var propertyimage_component_1 = require("../propertyimage/propertyimage.component");
var propertymarketing_component_1 = require("../marketing/propertymarketing.component");
var meta_filter_heading_component_1 = require("../../../components/meta-filter-heading/meta-filter-heading.component");
var metafilter_component_1 = require("../../../components/meta-filter-components/metafilter.component");
exports.MODULE_ROUTES = [
    { path: '', component: addproperty_component_1.AddpropertyComponent },
    { path: ':id', component: editproperty_component_1.EditpropertyComponent },
];
exports.MODULE_COMPONENTS = [
    addproperty_component_1.AddpropertyComponent,
    editproperty_component_1.EditpropertyComponent,
    metafilter_component_1.PropertyMetafilterComponent,
    meta_filter_heading_component_1.MetafilterheadingComponent,
    propertyinfo_component_1.PropertyinfoComponent,
    propertyimage_component_1.PropertyimageoComponent,
    propertymarketing_component_1.PropertymarketingComponent,
];
//# sourceMappingURL=commons.routes.js.map