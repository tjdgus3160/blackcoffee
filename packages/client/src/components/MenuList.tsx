import {map} from 'lodash-es';

import {useAppSelector} from '@hooks';
import {selectMenus} from '@store/menuSlice';

const MenuList = () => {
  const menus = useAppSelector(selectMenus);

  const renderList = () =>
    map(menus, ({id, name, isSoldOut}) => (
      <li key={id} className="menu-list-item d-flex items-center py-2">
        <span className={`w-100 pl-2 ${isSoldOut ? 'sold-out' : ''}`}>{name}</span>
        <button className="bg-gray-50 text-gray-500 text-sm mr-1">품절</button>
        <button className="bg-gray-50 text-gray-500 text-sm mr-1">수정</button>
        <button className="bg-gray-50 text-gray-500 text-sm">삭제</button>
      </li>
    ));

  return <ul className="mt-3 pl-0">{renderList()}</ul>;
};

export default MenuList;
