import { MenuType, RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'Dashboard', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: 'booking', title: 'Bookings', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'properties', title: 'Properties', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'home', title: 'Notifications', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'home', title: 'Users', menuType: MenuType.LEFT, icon:'material-icons' },
];
