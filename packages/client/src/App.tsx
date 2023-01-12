import {useEffect} from 'react';

import MenuForm from '@components/MenuForm';
import MenuHeader from '@components/MenuHeader';
import MenuList from '@components/MenuList';
import Navigator from '@components/Navigator';
import {useAppDispatch, useAppSelector} from '@hooks';
import {fetchMenu, selectCurrentMenu} from '@store/menuSlice';

function App() {
  const currentMenu = useAppSelector(selectCurrentMenu);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMenu(currentMenu));
  }, []);

  return (
    <div id="app" className="px-4">
      <div className="d-flex justify-center mt-5 w-100">
        <div className="w-100">
          <Navigator />
          <main className="mt-10 d-flex justify-center">
            <div className="wrapper bg-white p-10">
              <MenuHeader />
              <MenuForm />
              <MenuList />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
