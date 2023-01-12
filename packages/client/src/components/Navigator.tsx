import {map} from 'lodash-es';

import {CATEGORY} from '@utils';

const Navigator = () => {
  return (
    <header className="my-4">
      <a href="/" className="text-black">
        <h1 className="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
      </a>
      <nav className="d-flex justify-center flex-wrap">
        {map(CATEGORY, (value, key) => (
          <button key={key} className="cafe-category-name btn bg-white shadow mx-1">
            {value}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Navigator;
