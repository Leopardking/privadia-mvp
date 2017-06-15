import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: '/', title: 'Dashboard', menuType: MenuType.LEFT, icon: 'dashboard' },
    { path: '/home', title: 'Dashboard', menuType: MenuType.LEFT, icon: 'dashboard' },
    { path: '/booking', title: 'Bookings', menuType: MenuType.LEFT, icon: 'confirmation_number' },

    { path: '/properties', title: 'Properties', menuType: MenuType.LEFT, icon: 'store' },
    { path: '/properties/addproperty', title: 'Add Property', menuType: MenuType.LEFT, icon: 'store' },
    { path: '/properties/editproperty', title: 'Edit Property', menuType: MenuType.LEFT, icon: 'store' },

    { path: '/notifications', title: 'Notifications', menuType: MenuType.LEFT, icon: 'notifications' },
    { path: '/users', title: 'Users', menuType: MenuType.LEFT, icon: 'group' },
];
