import React, { MouseEventHandler } from 'react';
import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';
import { ReactNode } from 'react';
import './styles.scss';

interface MbuttonProps extends ButtonProps {
  onLongClick?: () => void;
  longClickDuration?: number;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
}

const Mbutton: React.FC<MbuttonProps> = ({
  onClick,
  onLongClick,
  longClickDuration = 500, // Default duration for long click
  loading,
  className,
  prefixIcon,
  suffixIcon,
  children,
  ...rest
}) => {
  let timeoutId: NodeJS.Timeout;

  const handleMouseDown = () => {
    if (onLongClick) {
      timeoutId = setTimeout(() => {
        onLongClick();
      }, longClickDuration);
    }
  };

  const handleMouseUp = () => {
    clearTimeout(timeoutId);
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      className={classNames('mbutton', className)}
      loading={loading}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      {...rest}
    >
      {prefixIcon && <span className="mbutton-prefix-icon">{prefixIcon}</span>}
      <span>{children}</span>
      {suffixIcon && <span className="mbutton-suffix-icon">{suffixIcon}</span>}
    </Button>
  );
};

export default Mbutton;
