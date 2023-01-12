import {useAppSelector} from '@hooks';
import {selectMenu} from '@store/menuSlice';
import {CATEGORY} from '@utils';

const MenuHeader = () => {
  const {currentMenu} = useAppSelector(selectMenu);

  return (
    <div className="d-flex justify-between">
      <h2 className="mt-1">{CATEGORY[currentMenu]} 메뉴 관리</h2>
      <span className="mr-2 mt-4">총 0개</span>
    </div>
  );
};

export default MenuHeader;
