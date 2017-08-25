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
    disable?: boolean;
    children?: Array<{
        path: string;
        hash: string;
        title: string;
        menuType: MenuType;
        icon: string;
    }>;
}
