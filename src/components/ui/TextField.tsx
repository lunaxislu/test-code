import { useState, type ChangeEvent, type KeyboardEvent } from 'react';

type TextFieldProps = {
  placeholder?: string;
  className?: string;
  onFocus?: () => void;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
};

export default function TextField({
  placeholder,
  className,
  onFocus,
  onChange,
  onEnter,
}: TextFieldProps) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const changeValue = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
    onChange?.(ev.target.value);
  };

  const focus = () => {
    setFocused(true);
    onFocus?.();
  };

  const blur = () => {
    setFocused(false);
  };

  const pressEnter = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter' && !ev.nativeEvent.isComposing) {
      ev.preventDefault();
      onEnter?.(value);
    }
  };

  const classes = [
    'w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors',
    focused ? 'border-blue-700 border-2' : 'border-slate-300',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <input
      type="text"
      className={classes}
      onChange={changeValue}
      onFocus={focus}
      onBlur={blur}
      onKeyDown={pressEnter}
      placeholder={placeholder || '텍스트를 입력해 주세요.'}
      value={value}
    />
  );
}
