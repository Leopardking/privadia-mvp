"use strict";
var properties_component_1 = require('./properties.component');
var setrates_component_1 = require('./setrates/setrates.component');
exports.MODULE_ROUTES = [
    { path: '', children: [
            { path: '', component: properties_component_1.PropertiesComponent },
            { path: 'add', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
            { path: 'edit', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
            { path: 'view', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
            // { path: 'setrates', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
            { path: 'setrates/:id', component: setrates_component_1.SetratesComponent },
        ] },
];
exports.MODULE_COMPONENTS = [
    properties_component_1.PropertiesComponent,
    setrates_component_1.SetratesComponent,
];
//# sourceMappingURL=properties.routes.js.map