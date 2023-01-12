import {useAppSelector} from '@hooks';
import {selectMenu} from '@store/menuSlice';
import {CATEGORY} from '@utils';

const MenuHeader = () => {
  const {currentCategory} = useAppSelector(selectMenu);

  return (
    <div className="d-flex justify-between">
      <h2 className="mt-1">{CATEGORY[currentCategory]} 메뉴 관리</h2>
      <span className="mr-2 mt-4">총 0개</span>
    </div>
  );
};

export default MenuHeader;
