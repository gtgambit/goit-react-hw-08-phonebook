import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import css from '../App.module.css';
import UserMenu from 'components/UserMenu/UserMenu';

const Layout = ({ children }) => {
  const userData = useSelector(state => state.auth.userData);

  const isUserAuthenticated = userData !== null;
  return (
    <div style={css.styles}>
      <header className={css.header}>
        <nav>
          {isUserAuthenticated ? (
            <>
              {' '}
              <NavLink
                className={({ isActive }) =>
                  cn(css.NavLink, { [css.active]: isActive })
                }
                to="/contacts"
              >
                Contacts
              </NavLink>
              <UserMenu />
            </>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  cn(css.NavLink, { [css.active]: isActive })
                }
                to="/register"
              >
                Register
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  cn(css.NavLink, { [css.active]: isActive })
                }
                to="/login"
              >
                Login
              </NavLink>
            </>
          )}
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Layout;
