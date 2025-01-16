import React from 'react';

function TokenPredictions({ predictions, loading, onTokenClick }) {
  if (loading) {
    return <div className="predictions">Loading predictions...</div>;
  }

  const sortedPredictions = [...predictions].sort((a, b) => b.probability - a.probability);

  return (
    <div className="predictions-list">
      {sortedPredictions.map((prediction, index) => {
        const percentage = (prediction.probability * 100).toFixed(1);
        return (
          <div key={index} className="prediction-item" onClick={() => onTokenClick(prediction.token)}>
            <div className="prediction-content">
              <span className="prediction-token">{prediction.token}</span>
              <span className="prediction-percentage">{percentage}%</span>
            </div>
            <div className="prediction-bar-bg">
              <div 
                className="prediction-bar"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TokenPredictions;
