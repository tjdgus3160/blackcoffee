import {map} from 'lodash-es';

import {useAppDispatch, useAppSelector} from '@hooks';
import {deleteMenu, selectMenu, toggleSoldOutMenu, updateMenu} from '@store/menuSlice';

const MenuList = () => {
  const {currentCategory, menus} = useAppSelector(selectMenu);
  const dispatch = useAppDispatch();

  const handleUpdate = (menuId: string, name: string) => {
    const newName = prompt('메뉴명을 수정하세요', name) || name;

    if (newName !== name) {
      dispatch(updateMenu({currentCategory, menuId, newName}));
    }
  };

  const handleDelete = (menuId: string) => {
    dispatch(deleteMenu({currentCategory, menuId}));
  };

  const handleSoldOut = (menuId: string) => {
    dispatch(toggleSoldOutMenu({currentCategory, menuId}));
  };

  const renderList = () =>
    map(menus, ({id, name, isSoldOut}) => (
      <li key={id} className="menu-list-item d-flex items-center py-2">
        <span className={`w-100 pl-2 ${isSoldOut ? 'sold-out' : ''}`}>{name}</span>
        <button onClick={() => handleSoldOut(id)} className="bg-gray-50 text-gray-500 text-sm mr-1">
          품절
        </button>
        <button onClick={() => handleUpdate(id, name)} className="bg-gray-50 text-gray-500 text-sm mr-1">
          수정
        </button>
        <button onClick={() => handleDelete(id)} className="bg-gray-50 text-gray-500 text-sm">
          삭제
        </button>
      </li>
    ));

  return <ul className="mt-3 pl-0">{renderList()}</ul>;
};

export default MenuList;
