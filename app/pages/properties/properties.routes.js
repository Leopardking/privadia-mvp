"use strict";
var properties_component_1 = require('./properties.component');
//
exports.MODULE_ROUTES = [
    // { path: '', component: PropertiesComponent, pathMatch: 'full'}
    { path: '', children: [
            { path: '', component: properties_component_1.PropertiesComponent },
            { path: 'addproperty', loadChildren: 'app/pages/properties/addproperty/addproperty.module#AddpropertyModule' },
            { path: 'editproperty/:id', loadChildren: 'app/pages/properties/editproperty/editproperty.module#EditpropertyModule' },
        ] },
];
//
exports.MODULE_COMPONENTS = [
    properties_component_1.PropertiesComponent,
];
//# sourceMappingURL=properties.routes.js.map