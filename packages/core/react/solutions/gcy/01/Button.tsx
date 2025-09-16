import type { ButtonProps } from './types'

function getVariantClasses(variant: ButtonProps['variant']) {
  switch (variant) {
    case 'default':
      return 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90'
    case 'destructive':
      return 'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60'
    case 'outline':
      return 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50'
    case 'secondary':
      return 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80'
    case 'ghost':
      return 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50'
    case 'link':
      return 'text-primary underline-offset-4 hover:underline'
    default:
      return 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90' // 默认使用 default 样式
  }
}

function getSizeClasses(size: ButtonProps['size']) {
  switch (size) {
    case 'sm':
      return 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5'
    case 'lg':
      return 'h-10 rounded-md px-6 has-[>svg]:px-4'
    case 'icon':
      return 'size-9'
    case 'default':
      return 'h-9 px-4 py-2 has-[>svg]:px-3' // 默认使用 default 样式
    default:
      return 'h-9 px-4 py-2 has-[>svg]:px-3' // 默认使用 default 样式
  }
}

function getClasses(props: ButtonProps) {
  const { variant, size, loading, fullWidth, className } = props

  return [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    getVariantClasses(variant),
    getSizeClasses(size),
    loading && 'opacity-80 cursor-not-allowed',
    fullWidth && 'w-full',
    className,
    variant,
    size,
  ].filter(Boolean).join(' ')
}

function Button(props: ButtonProps) {
  const {
    type = 'button',
    children,
    disabled,
    loading,
    loadingText,
    onClick,
    leftIcon,
    rightIcon,
    ...rest
  } = props
  const classNames = getClasses(props)

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading ? 'true' : undefined}
      {...rest}
    >
      <span data-testid="left">
        {leftIcon}
      </span>
      {loading && loadingText ? loadingText : children}
      {!loading && (
        <span data-testid="right">
          {rightIcon}
        </span>
      )}

    </button>
  )
}

export default Button
