import { Link } from 'react-router-dom';

const variantStyles = {
  primary:
    'bg-purple-800 font-semibold text-zinc-100 hover:bg-purple-700 active:bg-purple-800 active:text-zinc-100/70',
  secondary:
    'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60',
};

export function Button({
  variant = 'primary',
  className = '',
  ...props
}) {
  const combinedClassName = `inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none ${variantStyles[variant]} ${className}`;

  return typeof props.to === 'undefined' ? (
    <button className={combinedClassName} {...props} />
  ) : (
    <Link className={combinedClassName} {...props} />
  );
}