import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import MenuService from '@services/MenuService';
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

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async (currentCategory: MenuType) => {
  return await MenuService.getAllMenuByCategory(currentCategory);
});

export const addMenu = createAsyncThunk(
  'menu/addMenu',
  async ({currentCategory, name}: {currentCategory: MenuType; name: string}) => {
    return await MenuService.createMenu(currentCategory, name);
  },
);

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeMenu: (state, action: PayloadAction<MenuType>) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.menus = action.payload;
    });
    builder.addCase(addMenu.fulfilled, (state, action) => {
      if (action.payload) {
        state.menus.push(action.payload);
      }
    });
  },
});

export const {changeMenu} = menuSlice.actions;

export const selectMenu = (state: RootState) => state.menu;
export const selectCurrentCategory = (state: RootState) => state.menu.currentCategory;
export const selectMenus = (state: RootState) => state.menu.menus;
