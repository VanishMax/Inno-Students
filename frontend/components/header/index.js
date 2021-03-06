import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { LangContext, AuthContext } from '../../middleware/context';

// Viewport components for the Header
import Big from './big';
import Small from './small';

// Component that divides logic and design
const Header = ({ changeLang }) => {
  // State hook to open or close small-viewport menu by clicking on the burger
  const [opened, setOpen] = useState('closed');
  const open = () => {
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    setOpen('opened');
  };
  const close = () => {
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
    setOpen('closed');
  };

  // Get data from global context
  const lang = useContext(LangContext);
  const user = useContext(AuthContext);
  const isAuthed = user && user._id !== undefined;

  return (
    <header className="app header">
      {/* Large viewport (>1024px) */}
      <Big
        lang={lang}
        changeLang={changeLang}
      />

      {/* Small viewport (<1024px) */}
      <Small
        isAuthed={isAuthed}
        lang={lang}
        opened={opened}
        open={open}
        close={close}
        changeLang={changeLang}
      />
    </header>
  );
};

Header.propTypes = {
  changeLang: PropTypes.func.isRequired,
};

export default Header;
