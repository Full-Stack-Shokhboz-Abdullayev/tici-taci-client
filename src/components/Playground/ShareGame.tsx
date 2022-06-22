import { FC, memo, useRef, useState } from 'react';

import Button from '../core/design/Button';
import Input from '../core/design/Input';

function fallbackCopyTextToClipboard(text: string, el: any) {
  el.focus();
  el.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
}
function copyTextToClipboard(text: string, el: any) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text, el);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    },
  );
}

export const ShareGameComponent: FC<{ gameLink: string }> = ({ gameLink }) => {
  const inp = useRef(null);
  const [copied, setCopied] = useState(false);

  const copy: () => void = async () => {
    copyTextToClipboard(gameLink, inp);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  return (
    <div className="flex justify-center items-center my-3 w-full">
      <div className="relative w-full sm:w-[450px] flex items-center justify-center">
        <Input
          readOnly
          innerRef={inp}
          value={gameLink}
          styleType="yellow"
          className="w-full z-50"
          onClick={copy}
        />
        <div className="absolute z-[60] right-2 pl-14 pointer-events-none bg-gradient-to-l from-white to-[rgba(255,255,255,0)]">
          <Button
            onClick={copy}
            styleType="black"
            className="py-1 px-3 pointer-events-auto"
          >
            Share
          </Button>
        </div>
        <div
          className={
            'text-center py-1 px-3 absolute top-full rounded bg-black text-white z-40 mt-2 transition-all -translate-y-10 pointer-events-none opacity-0 ' +
            (copied ? 'copied' : '')
          }
        >
          Copied!
        </div>
      </div>
    </div>
  );
};
export const ShareGame = memo(ShareGameComponent);
