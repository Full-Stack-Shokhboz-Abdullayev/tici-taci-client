import { FC } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo.svg';

const NavBar: FC = () => {
  return (
    <nav className="h-16 py-2 px-8 w-100 bg-light-yellow flex justify-between items-center">
      <Link to="/">
        <img src={logo} alt="logo" className="h-12" />
      </Link>
      <a
        href="https://shox-pro.netlify.app"
        className="hover:text-lg transition-all sm:visible invisible"
      >
        Who made this?
      </a>
    </nav>
  );
};

export default NavBar;
