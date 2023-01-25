import { useDispatch, useSelector } from 'react-redux';
import { logOutRequest } from 'redux/User/thunk';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);

  const handleLogOut = () => {
    dispatch(logOutRequest());
  };

  return (
    <div>
      <p>{userData.email} </p>
      <button onClick={handleLogOut} type="button">
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
