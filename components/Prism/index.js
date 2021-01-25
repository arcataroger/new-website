import theme from 'custom-prism-react-renderer/themes/nightOwl';
import Highlight, { defaultProps } from 'custom-prism-react-renderer';
import cn from 'classnames';
import s from './style.module.css';
import { range } from 'range';
import { useMemo } from 'react';

const modifiedTheme = {
  ...theme,
  styles: theme.styles.map((style) =>
    style.types.includes('comment')
      ? {
          types: ['comment'],
          style: {
            color: '#98c6e7',
            fontStyle: 'italic',
          },
        }
      : style,
  ),
};

const Prism = ({ code, language, showLineNumbers, highlightLines = [] }) => {
  const linesCount = useMemo(() => {
    return code.split(/\r\n|\r|\n/).length;
  }, [code]);

  return (
    <Highlight
      {...defaultProps}
      theme={modifiedTheme}
      code={code}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i });

            return (
              <div
                {...lineProps}
                className={cn(lineProps.className, {
                  [s.highlight]: highlightLines.includes(i),
                  [s.showLineNumbers]: showLineNumbers,
                })}
                data-line-number={`${i + 1}`.padStart(
                  linesCount.toString().length,
                  ' ',
                )}
              >
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default Prism;
