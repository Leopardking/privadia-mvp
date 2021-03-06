"use strict";
var sidebar_metadata_1 = require('./sidebar.metadata');
exports.ROUTES = [
    { path: 'dashboard', title: 'Dashboard', menuType: sidebar_metadata_1.MenuType.LEFT, icon: 'dashboard' },
    { path: 'booking', title: 'Bookings', menuType: sidebar_metadata_1.MenuType.LEFT, icon: 'confirmation_number', disable: true },
    { path: 'properties', title: 'Properties', menuType: sidebar_metadata_1.MenuType.LEFT, icon: 'store' },
    { path: 'notifications', title: 'Notifications', menuType: sidebar_metadata_1.MenuType.LEFT, icon: 'mail', disable: true },
    { path: 'users', title: 'Users', menuType: sidebar_metadata_1.MenuType.LEFT, icon: 'group', disable: true },
];
//# sourceMappingURL=sidebar-routes.config.js.map