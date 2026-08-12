import React from 'react';

const englishPhraseRegex = /([A-Za-z0-9][A-Za-z0-9'’\-.,!?()\/&%$#@]*(?:\s+[A-Za-z0-9][A-Za-z0-9'’\-.,!?()\/&%$#@]*)*)/g;

export const TextWrapper = ({ text = '' }) => {
  if (!text) return null;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = englishPhraseRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <span key={`${match.index}-${match[0]}`} dir="ltr" className="inline-block font-sans">
        {match[0]}
      </span>
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <span dir="auto" className="[unicode-bidi:plaintext]">{parts}</span>;
};
