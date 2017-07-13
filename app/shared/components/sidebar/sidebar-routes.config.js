"use strict";
var sidebar_metadata_1 = require('./sidebar.metadata');
exports.ROUTES = [
    { path: 'dashboard', title: 'Dashboard', menuType: sidebar_metadata_1.MenuType.LEFT, icon: 'dashboard' },
    { path: 'booking', title: 'Bookings', menuType: sidebar_metadata_1.MenuType.LEFT, icon: 'confirmation_number' },
    { path: 'properties', title: 'Properties', menuType: sidebar_metadata_1.MenuType.LEFT, icon: 'store' },
    { path: 'messages', title: 'Messages', menuType: sidebar_metadata_1.MenuType.LEFT, icon: 'mail', children: [
            { path: 'messages', hash: 'notifications', title: 'Notifications', menuType: sidebar_metadata_1.MenuType.LEFT, icon: 'dashboard' },
            { path: 'messages', hash: 'enquiries', title: 'Enquiries', menuType: sidebar_metadata_1.MenuType.LEFT, icon: 'info' },
            { path: 'messages', hash: 'bookings', title: 'Bookings', menuType: sidebar_metadata_1.MenuType.LEFT, icon: 'confirmation_number' },
        ] },
    { path: 'users', title: 'Users', menuType: sidebar_metadata_1.MenuType.LEFT, icon: 'group' },
];
//# sourceMappingURL=sidebar-routes.config.js.map