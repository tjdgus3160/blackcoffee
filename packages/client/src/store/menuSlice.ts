import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import MenuService from '@services/MenuService';
import {RootState} from '@store/index';
import {MenuItem} from '@types';
import {MenuType} from '@utils';

export interface State {
  currentMenu: MenuType;
  menus: MenuItem[];
}

const initialState: State = {
  currentMenu: MenuType.espresso,
  menus: [
    {
      id: '123',
      name: 'asdf',
      isSoldOut: true,
    },
  ],
};

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async (currentMenu: MenuType) => {
  return await MenuService.getAllMenuByCategory(currentMenu);
});

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeMenu: (state, action: PayloadAction<MenuType>) => {
      state.currentMenu = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.menus = action.payload;
    });
  },
});

export const {changeMenu} = menuSlice.actions;

export const selectMenu = (state: RootState) => state.menu;
export const selectCurrentMenu = (state: RootState) => state.menu.currentMenu;
export const selectMenus = (state: RootState) => state.menu.menus;
