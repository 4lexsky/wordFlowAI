import React from 'react';
import logo from '../assets/logo.svg';

function Header({ language, setLanguage, translations }) {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="WordFlow AI" className="logo" />
        <div className="title-container">
          <h1>{translations.title}</h1>
          <p className="subtitle">{translations.subtitle}</p>
        </div>
      </div>
      <div className="language-selector">
        <button 
          className={`lang-btn ${language === 'en' ? 'active' : ''}`}
          onClick={() => setLanguage('en')}
        >
          EN
        </button>
        <button 
          className={`lang-btn ${language === 'fr' ? 'active' : ''}`}
          onClick={() => setLanguage('fr')}
        >
          FR
        </button>
      </div>
    </header>
  );
}

export default Header;
