import {map} from 'lodash-es';

import {useAppDispatch} from '@hooks';
import {changeMenu} from '@store/menuSlice';
import {CATEGORY, MenuType} from '@utils';

const Navigator = () => {
  const dispatch = useAppDispatch();

  return (
    <header className="my-4">
      <a href="/" className="text-black">
        <h1 className="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
      </a>
      <nav className="d-flex justify-center flex-wrap">
        {map(CATEGORY, (value, key) => (
          <button
            key={key}
            onClick={() => dispatch(changeMenu(key as MenuType))}
            className="cafe-category-name btn bg-white shadow mx-1"
          >
            {value}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Navigator;
