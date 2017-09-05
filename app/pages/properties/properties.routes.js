"use strict";
var properties_component_1 = require('./properties.component');
var setrates_component_1 = require('./setrates/setrates.component');
var availability_component_1 = require('./availability/availability.component');
var calendar_component_1 = require("../../components/calendar/calendar.component");
var calendar_list_component_1 = require("../../components/calendar-list/calendar-list.component");
exports.MODULE_ROUTES = [
    { path: '', children: [
            { path: '', component: properties_component_1.PropertiesComponent },
            { path: 'add', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
            { path: 'edit', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
            // { path: 'setrates', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
            { path: 'view', loadChildren: 'app/pages/properties/commons/commons.module#CommonsModule' },
            { path: 'setrates/:id', component: setrates_component_1.SetratesComponent },
            { path: 'availability/:id', component: availability_component_1.AvailabilityComponent }
        ] },
];
exports.MODULE_COMPONENTS = [
    properties_component_1.PropertiesComponent,
    setrates_component_1.SetratesComponent,
    availability_component_1.AvailabilityComponent,
    calendar_component_1.CalendarComponent,
    calendar_list_component_1.CalendarListComponent,
];
//# sourceMappingURL=properties.routes.js.map