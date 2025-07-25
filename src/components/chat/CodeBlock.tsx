'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  language: string;
  value: string;
}

export const CodeBlock = ({ language, value }: CodeBlockProps) => {
  return (
    <div className="my-2 rounded-md overflow-hidden bg-[#1e1e1e] font-code text-sm">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '1rem' }}
        codeTagProps={{
          style: {
            fontFamily: 'var(--font-code)',
            fontSize: 'inherit',
          },
        }}
        showLineNumbers={false}
      >
        {value.trim()}
      </SyntaxHighlighter>
    </div>
  );
};
