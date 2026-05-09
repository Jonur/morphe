import { motion, HTMLMotionProps } from 'framer-motion'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dashed'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant
  fullWidth?: boolean
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-obsidian text-white font-medium hover:bg-seaweed active:bg-seaweed disabled:opacity-40',
  secondary:
    'border border-sage text-seaweed font-medium bg-transparent hover:bg-frost active:bg-dew disabled:opacity-40',
  ghost: 'text-patina font-medium bg-transparent hover:bg-frost active:bg-dew disabled:opacity-40',
  dashed:
    'border border-dashed border-mist text-patina font-medium bg-transparent hover:bg-frost active:bg-dew disabled:opacity-40',
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ duration: 0.1 }}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-pill px-6 py-3.5 text-sm',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patina focus-visible:ring-offset-1',
        'cursor-pointer disabled:cursor-not-allowed',
        variantStyles[variant],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
