const MenuForm = () => {
  return (
    <form>
      <div className="d-flex w-100">
        <input className="input-field" placeholder="메뉴 이름" />
        <button className="input-submit bg-green-600 ml-2">확인</button>
      </div>
    </form>
  );
};

export default MenuForm;
