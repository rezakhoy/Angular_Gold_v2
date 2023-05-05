export interface MenuItem {
    id?: number;
    label?: string;
    icon?: string;
    link?: string;
    per?: string[];
    subItems?: any;
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    isLayout?: boolean;
}
