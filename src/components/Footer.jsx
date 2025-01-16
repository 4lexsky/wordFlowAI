import React from 'react';

function Footer({ translations }) {
  return (
    <footer className="footer">
      <p>{translations.footer}</p>
    </footer>
  );
}

export default Footer;
