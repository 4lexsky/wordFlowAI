import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ChatInput from './components/ChatInput';
import TokenPredictions from './components/TokenPredictions';
import Footer from './components/Footer';
import { useTokenPredictions } from './hooks/useTokenPredictions';
import { translations } from './i18n/translations';

function App() {
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const { predictions, loading } = useTokenPredictions(input);
  const t = translations[language];

  const handleTokenClick = useCallback((token) => {
    setInput(prev => prev + token);
  }, []);

  return (
    <div className="app">
      <Header 
        language={language} 
        setLanguage={setLanguage}
        translations={t}
      />
      <main className="main-content">
        <div className="container">
          <div className="intro">
            <p className="description">{t.description}</p>
            <p className="instructions">{t.instructions}</p>
          </div>
          <ChatInput 
            value={input} 
            onChange={setInput}
            placeholder={t.placeholder}
          />
          <TokenPredictions 
            predictions={predictions}
            loading={loading}
            onTokenClick={handleTokenClick}
            loadingText={t.loading}
          />
        </div>
      </main>
      <Footer translations={t} />
    </div>
  );
}

export default App;
