import {MenuItem, MenuType} from '@types';

const BASE_URL = 'http://localhost:5000/api';

const option = (method: string, data?: any) => ({
  method,
  headers: {'Content-Type': 'application/json'},
  body: data ? JSON.stringify(data) : null,
});

export default class MenuService {
  async getAllMenuByCategory(category: MenuType): Promise<MenuItem[]> {
    return this.request(`/category/${category}/menu`);
  }

  async createMenu(category: MenuType, name: string) {
    return this.request(`/category/${category}/menu`, option('POST', {name}));
  }

  async updateMenu(category: MenuType, menuId: string, name: string) {
    return this.request(`/category/${category}/menu/${menuId}`, option('PUT', {name}));
  }

  async toggleSoldOutMenu(category: MenuType, menuId: string) {
    return this.request(`/category/${category}/menu/${menuId}/soldout`, option('PUT'));
  }

  async deleteMenu(category: MenuType, menuId: string) {
    return this.request(`/category/${category}/menu/${menuId}`, option('DELETE'));
  }

  async request(url: string, option?: any) {
    const response = await fetch(`${BASE_URL}${url}`, option);

    if (!response.ok) {
      alert('에러가 발생했습니다.');
    }

    return option?.method === 'DELETE' ? response : response.json();
  }
}
