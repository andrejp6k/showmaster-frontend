import { useState } from 'react';

interface TestProps {
  onConnectClickAsync: (teamName: string) => Promise<void>;
}

export default function Test({ onConnectClickAsync }: TestProps) {
  const [inputText, setInputText] = useState('');
  const onInputChange = (e: any) => {
    setInputText(e?.target?.value?.trim() || '');
  };
  return (
    <>
      <input onChange={onInputChange} />
      <button
        type="button"
        onClick={() => onConnectClickAsync(inputText)}
        disabled={inputText === ''}
      >
        Join game
      </button>
    </>
  );
}
