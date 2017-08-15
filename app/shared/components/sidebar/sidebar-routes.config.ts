import { MenuType, RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', menuType: MenuType.LEFT, icon: 'dashboard' },
    { path: 'booking', title: 'Bookings', menuType: MenuType.LEFT, icon: 'confirmation_number' },
    { path: 'properties', title: 'Properties', menuType: MenuType.LEFT, icon: 'store' },
    { path: 'notifications', title: 'Notifications', menuType: MenuType.LEFT, icon: 'mail' },
    { path: 'users', title: 'Users', menuType: MenuType.LEFT, icon: 'group' },
];
