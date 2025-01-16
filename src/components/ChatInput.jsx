import React, { useCallback } from 'react';

function ChatInput({ value, onChange }) {
  const handleChange = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div className="chat-input">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Start typing..."
        rows={4}
      />
    </div>
  );
}

export default ChatInput;
