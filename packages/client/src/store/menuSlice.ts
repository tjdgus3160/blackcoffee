import {filter, findIndex} from 'lodash-es';

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import MenuService from '@services/MenuService';
import {RootState} from '@store/index';
import {MenuItem} from '@types';
import {CategoryType} from '@utils';

export interface State {
  currentCategory: CategoryType;
  menus: MenuItem[];
}

const initialState: State = {
  currentCategory: CategoryType.espresso,
  menus: [],
};

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async (currentCategory: CategoryType) => {
  return await MenuService.getAllMenuByCategory(currentCategory);
});

export const addMenu = createAsyncThunk(
  'menu/addMenu',
  async ({currentCategory, name}: {currentCategory: CategoryType; name: string}) => {
    return await MenuService.createMenu(currentCategory, name);
  },
);

export const updateMenu = createAsyncThunk(
  'menu/updateMenu',
  async ({currentCategory, menuId, newName}: {currentCategory: CategoryType; menuId: string; newName: string}) => {
    return await MenuService.updateMenu(currentCategory, menuId, newName);
  },
);

export const deleteMenu = createAsyncThunk(
  'menu/deleteMenu',
  async ({currentCategory, menuId}: {currentCategory: CategoryType; menuId: string}) => {
    await MenuService.deleteMenu(currentCategory, menuId);

    return menuId;
  },
);

export const toggleSoldOutMenu = createAsyncThunk(
  'menu/toggleSoldOutMenu',
  async ({currentCategory, menuId}: {currentCategory: CategoryType; menuId: string}) => {
    await MenuService.toggleSoldOutMenu(currentCategory, menuId);

    return menuId;
  },
);

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<CategoryType>) => {
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
    builder.addCase(updateMenu.fulfilled, (state, action) => {
      const idx = findIndex(state.menus, ({id}) => id === action.payload.id);

      state.menus[idx] = action.payload;
    });
    builder.addCase(deleteMenu.fulfilled, (state, action) => {
      state.menus = filter(state.menus, ({id}) => id !== action.payload);
    });
    builder.addCase(toggleSoldOutMenu.fulfilled, (state, action) => {
      const idx = findIndex(state.menus, ({id}) => id === action.payload);

      state.menus[idx].isSoldOut = !state.menus[idx].isSoldOut;
    });
  },
});

export const {changeCategory} = menuSlice.actions;

export const selectMenu = (state: RootState) => state.menu;
export const selectCurrentCategory = (state: RootState) => state.menu.currentCategory;
export const selectMenus = (state: RootState) => state.menu.menus;
