import ConditionalWrapper from '@components/ConditionalWrapper';
import LinkedItem from '@elements/LinkedItem';
import InlineLoader from '@elements/loader/InlineLoader';
import clsx from 'clsx';
import React from 'react';

import type { Props as LinkedItemProps } from '@elements/LinkedItem';

type Props = {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  hoverClassName?: string;
  title?: string;
  disabled?: boolean;
  Icon?: any;
  IconRight?: any;
  onClick?: any;
  href?: LinkedItemProps['href'];
  target?: LinkedItemProps['target'];
  loading?: boolean;
  loadingText?: string;
  text?: string;
};

const Button: React.FC<Props> = ({
  children,
  type = 'button',
  className,
  hoverClassName = '',
  title = '',
  disabled = false,
  Icon,
  IconRight,
  onClick,
  href,
  target,
  loading = false,
  loadingText = '',
  text = children,
}) => {
  const clickable = !disabled && !loading;
  return (
    <ConditionalWrapper
      condition={!!href}
      wrapper={(children) => (
        <LinkedItem {...{ href: href!, target }}>{children}</LinkedItem>
      )}
    >
      <button
        {...{ type, onClick, title }}
        className={clsx(
          'flex items-center justify-center py-2 px-4 rounded-md shadow-md outline-none transition-all ease-in-out duration-300',
          clickable
            ? clsx('hover:bg-opacity-95 active:scale-[0.95]', hoverClassName)
            : 'opacity-95 cursor-not-allowed',
          className
        )}
        disabled={!clickable}
      >
        {loading && <InlineLoader className="mr-2 text-white!" />}

        {Icon && <Icon className={clsx('w-5 h-5', text && 'mr-2')} />}

        {(loading && loadingText) || text}

        {IconRight && !loading && <IconRight className="w-5 h-5 ml-2" />}
      </button>
    </ConditionalWrapper>
  );
};

export const PrimaryButton: typeof Button = ({
  className,
  hoverClassName,
  ...rest
}) => {
  return (
    <Button
      className={clsx(
        'bg-primary-500 shadow-primary-500/30 text-white',
        className
      )}
      hoverClassName={clsx('hover:shadow-primary-600/30', hoverClassName)}
      {...rest}
    />
  );
};

export const SuccessButton: typeof Button = ({
  className,
  hoverClassName,
  ...rest
}) => {
  return (
    <Button
      className={clsx(
        'bg-success-500 shadow-success-500/30 text-white',
        className
      )}
      hoverClassName={clsx('hover:shadow-success-600/30', hoverClassName)}
      {...rest}
    />
  );
};

export const InfoButton: typeof Button = ({
  className,
  hoverClassName,
  ...rest
}) => {
  return (
    <Button
      className={clsx('bg-info-500 shadow-info-500/30 text-white', className)}
      hoverClassName={clsx('hover:shadow-info-600/30', hoverClassName)}
      {...rest}
    />
  );
};

export const WarningButton: typeof Button = ({
  className,
  hoverClassName,
  ...rest
}) => {
  return (
    <Button
      className={clsx(
        'bg-warning-500 shadow-warning-500/30 text-white',
        className
      )}
      hoverClassName={clsx('hover:shadow-warning-600/30', hoverClassName)}
      {...rest}
    />
  );
};

export const DangerButton: typeof Button = ({
  className,
  hoverClassName,
  ...rest
}) => {
  return (
    <Button
      className={clsx(
        'bg-danger-500 shadow-danger-500/30 text-white',
        className
      )}
      hoverClassName={clsx('hover:shadow-danger-600/30', hoverClassName)}
      {...rest}
    />
  );
};

export const OutlineButton: typeof Button = ({
  className,
  hoverClassName,
  ...rest
}) => {
  return (
    <Button
      className={clsx(
        'text-gray-500 bg-white border rounded-md shadow-sm border-secondary-500',
        className
      )}
      hoverClassName={clsx('hover:bg-gray-50', hoverClassName)}
      {...rest}
    />
  );
};

export const ActionButton: typeof Button = ({ className, ...rest }) => {
  return (
    <Button
      className={clsx('text-black border-none shadow-none', className)}
      {...rest}
    />
  );
};

export default Button;
export type { Props as ButtonProps };
