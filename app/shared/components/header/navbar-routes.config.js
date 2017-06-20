"use strict";
var navbar_metadata_1 = require('./navbar.metadata');
exports.ROUTES = [
    { path: '/', title: 'Dashboard', menuType: navbar_metadata_1.MenuType.LEFT, icon: 'dashboard' },
    { path: '/home', title: 'Dashboard', menuType: navbar_metadata_1.MenuType.LEFT, icon: 'dashboard' },
    { path: '/booking', title: 'Bookings', menuType: navbar_metadata_1.MenuType.LEFT, icon: 'confirmation_number' },
    { path: '/properties', title: 'Properties', menuType: navbar_metadata_1.MenuType.LEFT, icon: 'store' },
    { path: '/properties/addproperty', title: 'Add Property', menuType: navbar_metadata_1.MenuType.LEFT, icon: 'store' },
    { path: '/properties/editproperty', title: 'Edit Property', menuType: navbar_metadata_1.MenuType.LEFT, icon: 'store' },
    { path: '/notifications', title: 'Notifications', menuType: navbar_metadata_1.MenuType.LEFT, icon: 'notifications' },
    { path: '/users', title: 'Users', menuType: navbar_metadata_1.MenuType.LEFT, icon: 'group' },
];
//# sourceMappingURL=navbar-routes.config.js.map