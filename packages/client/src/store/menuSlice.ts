import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '@store/index';
import {MenuType} from '@utils';

export interface State {
  currentCategory: MenuType;
}

const initialState: State = {
  currentCategory: MenuType.espresso,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
});

export const selectMenu = (state: RootState) => state.menu;
export const selectCurrentCategory = (state: RootState) => state.menu.currentCategory;
