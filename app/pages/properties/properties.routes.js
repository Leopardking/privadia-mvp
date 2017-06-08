"use strict";
var properties_component_1 = require('./properties.component');
exports.MODULE_ROUTES = [
    { path: '', children: [
            { path: '', component: properties_component_1.PropertiesComponent },
            { path: 'addproperty', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
            { path: 'editproperty', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
        ] },
];
exports.MODULE_COMPONENTS = [
    properties_component_1.PropertiesComponent,
];
//# sourceMappingURL=properties.routes.js.map