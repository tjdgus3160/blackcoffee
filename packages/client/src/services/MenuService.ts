import axios from 'axios';

import {MenuItem} from '@types';
import {CategoryType} from '@utils';

axios.defaults.baseURL = 'http://localhost:5000/api';

export default class MenuService {
  static async getAllMenuByCategory(category: CategoryType): Promise<MenuItem[]> {
    return await axios.get(`/category/${category}/menu`).then(res => res.data);
  }

  static async createMenu(category: CategoryType, name: string): Promise<MenuItem | void> {
    return await axios
      .post(`/category/${category}/menu`, {name})
      .then(res => res.data)
      .catch(error => alert(error.response.data.message));
  }

  static async updateMenu(category: CategoryType, menuId: string, name: string): Promise<MenuItem> {
    return await axios.put(`/category/${category}/menu/${menuId}`, {name}).then(res => res.data);
  }

  static async deleteMenu(category: CategoryType, menuId: string) {
    return await axios.delete(`/category/${category}/menu/${menuId}`).then(res => res.data);
  }

  static async toggleSoldOutMenu(category: CategoryType, menuId: string): Promise<MenuItem> {
    return await axios.put(`/category/${category}/menu/${menuId}/soldout`).then(res => res.data);
  }
}
