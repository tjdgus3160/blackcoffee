import {ChangeEvent, FormEvent, useCallback, useState} from 'react';
import {isEmpty} from 'lodash-es';

import {useAppDispatch, useAppSelector} from '@hooks';
import {addMenu, selectCurrentCategory} from '@store/menuSlice';

const MenuForm = () => {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(selectCurrentCategory);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      if (isEmpty(name)) {
        return;
      }

      dispatch(addMenu({currentCategory, name}));

      setName('');
    },
    [name, setName, dispatch],
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [setName],
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="d-flex w-100">
        <input className="input-field" placeholder="메뉴 이름" value={name} onChange={onChange} />
        <button className="input-submit bg-green-600 ml-2">확인</button>
      </div>
    </form>
  );
};

export default MenuForm;
