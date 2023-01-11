import {MenuItem, MenuType} from '@types';

const BASE_URL = 'http://localhost:5000/api';

const option = (method: string, data?: any) => ({
  method,
  headers: {'Content-Type': 'application/json'},
  body: data ? JSON.stringify(data) : null,
});

export default class MenuService {
  static async getAllMenuByCategory(category: MenuType): Promise<MenuItem[]> {
    return this.request(`/category/${category}/menu`);
  }

  static async createMenu(category: MenuType, name: string): Promise<MenuItem> {
    return this.request(`/category/${category}/menu`, option('POST', {name}));
  }

  static async updateMenu(category: MenuType, menuId: string, name: string) {
    return this.request(`/category/${category}/menu/${menuId}`, option('PUT', {name}));
  }

  static async toggleSoldOutMenu(category: MenuType, menuId: string) {
    return this.request(`/category/${category}/menu/${menuId}/soldout`, option('PUT'));
  }

  static async deleteMenu(category: MenuType, menuId: string) {
    return this.request(`/category/${category}/menu/${menuId}`, option('DELETE'));
  }

  static async request(url: string, option?: any) {
    const response = await fetch(`${BASE_URL}${url}`, option);

    if (!response.ok) {
      const error = await response.json();

      alert(error.message);

      return;
    }

    return option?.method === 'DELETE' ? response : response.json();
  }
}
