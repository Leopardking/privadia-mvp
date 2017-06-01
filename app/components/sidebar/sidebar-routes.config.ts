import { MenuType, RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'Dashboard', menuType: MenuType.LEFT, icon: 'material-icons', iconName: 'dashboard' },
    { path: 'booking', title: 'Bookings', menuType: MenuType.LEFT, icon:'material-icons', iconName: 'confirmation_number' },
    { path: 'properties', title: 'Properties', menuType: MenuType.LEFT, icon:'material-icons', iconName: 'store' },
    { path: 'home', title: 'Notifications', menuType: MenuType.LEFT, icon:'material-icons', iconName: 'notifications' },
    { path: 'home', title: 'Users', menuType: MenuType.LEFT, icon:'material-icons', iconName: 'group' },
];
