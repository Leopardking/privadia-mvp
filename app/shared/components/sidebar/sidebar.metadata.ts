export enum MenuType {
    BRAND,
    LEFT,
    RIGHT,
    TOGGLE
}

export interface RouteInfo {
    path: string;
    title: string;
    menuType: MenuType;
    icon: string;
    children?: Array<{
        path: string;
        title: string;
        menuType: MenuType;
        icon: string;
    }>;
}
