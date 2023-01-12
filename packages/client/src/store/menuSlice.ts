import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '@store/index';
import {MenuItem} from '@types';
import {MenuType} from '@utils';

export interface State {
  currentCategory: MenuType;
  menus: MenuItem[];
}

const initialState: State = {
  currentCategory: MenuType.espresso,
  menus: [
    {
      id: '123',
      name: 'asdf',
      isSoldOut: true,
    },
  ],
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
});

export const selectMenu = (state: RootState) => state.menu;
export const selectCurrentCategory = (state: RootState) => state.menu.currentCategory;
export const selectMenus = (state: RootState) => state.menu.menus;
