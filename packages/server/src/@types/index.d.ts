export type Menu = Record<MenuType, MenuItem[]>;

export type MenuType = 'espresso' | 'frappuccino' | 'blended' | 'teavana' | 'desert';

export interface MenuItem {
  id: string;
  name: string;
  isSoldOut: boolean;
}
