import { RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'dashboard' },
    { path: '/booking', title: 'Bookings', icon: 'confirmation_number' },

    { path: '/properties/add', title: 'Add Property', icon: 'store' },
    { path: '/properties/edit', title: 'Edit Property :id', icon: 'store' },
    { path: '/properties/view', title: 'View Property :id', icon: 'store' },
    { path: '/properties', title: 'Properties', icon: 'store' },

    { path: '/notifications', title: 'Notifications', icon: 'notifications' },
    { path: '/message', title: 'Messages', icon: 'mail' },
    { path: '/message/dialogs', title: 'Messages', icon: 'mail' },
    { path: '/users', title: 'Users', icon: 'group' },
    { path: '/', title: 'Dashboard', icon: 'dashboard' },
];
