const MenuForm = () => {
  return (
    <form>
      <div className="d-flex w-100">
        <label htmlFor="menu-name" className="input-label" hidden>
          에스프레소 메뉴 이름
        </label>
        <input type="text" id="menu-name" name="espressoMenuName" className="input-field" placeholder="메뉴 이름" />
        <button type="button" name="submit" id="menu-submit-button" className="input-submit bg-green-600 ml-2">
          확인
        </button>
        <input type="hidden" />
      </div>
    </form>
  );
};

export default MenuForm;
