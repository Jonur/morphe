/**
 * Custom icons extracted directly from Figma — exact SVG paths from the design.
 * All stroke icons use currentColor so they can be coloured via className.
 * The CheckCircleIcon fill also uses currentColor (apply text-coral etc on the parent).
 */

interface IconProps {
  size?: number
  className?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

// ─── Navigation ─────────────────────────────────────────────────────────────

/**
 * Left-pointing arrow (back navigation), 24×24.
 * Figma: Arrow — full arrow with horizontal shaft + arrowhead.
 */
export function BackArrowIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M23.9991 12.0006H1.49907M9.49907 4.00053L1.49907 12.0006L9.49907 20.0005"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

/**
 * Three vertical square dots (options / more menu).
 * Figma: vertical-menu-square — 3 small filled squares in a vertical column.
 * Works at 24px (nav) and 16px (card).
 */
export function VerticalMenuIcon({ size = 24, className = '', ...props }: IconProps) {
  const d = size <= 16 ? 1.5 : 2 // dot size in px
  const x = (size - d) / 2
  const ys = [size * 0.167, size * 0.5, size * 0.833]

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
      {...props}
    >
      {ys.map((cy, i) => (
        <rect key={i} x={x} y={cy - d / 2} width={d} height={d} fill="currentColor" />
      ))}
    </svg>
  )
}

// ─── Search ──────────────────────────────────────────────────────────────────

/**
 * Magnifying-glass search icon, 16×16.
 * Figma: magnifying-glass — circle + diagonal handle.
 */
export function SearchIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15.947 15.947"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M0.75 7.41667C0.75 9.1848 1.45238 10.8805 2.70262 12.1307C3.95287 13.3809 5.64856 14.0833 7.41667 14.0833C9.1848 14.0833 10.8805 13.3809 12.1307 12.1307C13.3809 10.8805 14.0833 9.1848 14.0833 7.41667C14.0833 5.64856 13.3809 3.95287 12.1307 2.70262C10.8805 1.45238 9.1848 0.75 7.41667 0.75C5.64856 0.75 3.95287 1.45238 2.70262 2.70262C1.45238 3.95287 0.75 5.64856 0.75 7.41667Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12.0833 12.0833L15.4167 15.4167"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

// ─── Actions ─────────────────────────────────────────────────────────────────

/**
 * Plus / add icon — used in "Create workout" CTA, 16×16.
 * Figma: add-1 — full-width + sign without padding.
 */
export function PlusIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14.6667 14.6667"
      fill="none"
      className={className}
      {...props}
    >
      <path d="M7.33333 0V14.6667" stroke="currentColor" strokeWidth="1.5" />
      <path d="M0 7.33333H14.6667" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/**
 * Filled circle with checkmark — selected state in the exercise dropdown, 20×20.
 * Figma: check-circle — filled circle (currentColor) + white check stroke.
 */
export function CheckCircleIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M0 10C0 12.6522 1.05357 15.1957 2.92894 17.0711C4.8043 18.9465 7.34784 20 10 20C12.6522 20 15.1957 18.9465 17.0711 17.0711C18.9465 15.1957 20 12.6522 20 10C20 7.34784 18.9465 4.8043 17.0711 2.92894C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92894 2.92894C1.05357 4.8043 0 7.34784 0 10Z"
        fill="currentColor"
      />
      <path
        d="M6 9.83333L8.91667 12.75L13.9167 6.5"
        stroke="white"
        strokeWidth="1.8"
      />
    </svg>
  )
}

/**
 * × mark for clearing a search / text input field, 16×16 display.
 * Figma: Delete icon — two crossing diagonal lines, no circle.
 */
export function ClearIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8.98995 8.98995"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M8.49497 0.494975L0.494975 8.49497"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8.49497 8.49497L0.494975 0.494975"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}

/**
 * Small × for removing an exercise chip/tag, 10×10 display.
 * Figma: Delete icon (smaller variant) — same two crossing diagonals.
 */
export function DeleteXIcon({ size = 10, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 6.91924 6.91924"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M6.45962 0.459619L0.459619 6.45962"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M6.45962 6.45962L0.459619 0.459619"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  )
}

// ─── Workout card / context menu icons ───────────────────────────────────────

/**
 * Eye / view icon, 20×20.
 * Figma: visible--eye-eyeball-open-view — lens outline + circle pupil.
 */
export function EyeIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20.4078 17"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M10.2038 1C5.62053 1 4.13732 4.33333 1.22066 8.5C4.13732 12.6667 5.62053 16 10.2038 16C14.7872 16 16.2705 12.6667 19.1872 8.5C16.2705 4.33333 14.7872 1 10.2038 1Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12.7034 8.5C12.7034 9.88075 11.5842 11 10.2034 11C8.82266 11 7.70341 9.88075 7.70341 8.5C7.70341 7.11925 8.82266 6 10.2034 6C11.5842 6 12.7034 7.11925 12.7034 8.5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

/**
 * Pencil / edit icon, 20×20.
 * Figma: pencil--change-edit-modify-pencil-write-writing.
 */
export function PencilIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19.2561 19.2561"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M15.4833 9.60613L9.65 3.77279L12.15 1.27279L17.9833 7.10613L15.4833 9.60613Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M15.4833 9.60613L6.73333 18.3561H0.9V12.5228L9.65 3.77279L15.4833 9.60613Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}

/**
 * Trash / recycle bin icon — 20×20 for menu items, 24×24 for modal.
 * Figma: recycle-bin-2 — rectangular body + arch handle + two inner vertical lines.
 */
export function TrashIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20.1333"
      fill="none"
      className={className}
      {...props}
    >
      {/* Lid separator line */}
      <path d="M0 5.06667H20" stroke="currentColor" strokeWidth="1.8" />
      {/* Body */}
      <path
        d="M2.5 5.06667H17.5V19.2333H2.5V5.06667Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      {/* Inner lines */}
      <path d="M7.5 9.23333V15.0667" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12.5 9.23333V15.0667" stroke="currentColor" strokeWidth="1.8" />
      {/* Arch handle */}
      <path
        d="M6.66667 5.06667V4.23333C6.66667 2.39238 8.15905 0.9 10 0.9C11.8409 0.9 13.3333 2.39238 13.3333 4.23333V5.06667"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}

// ─── Stepper controls (custom, not from Figma icon set) ──────────────────────

/**
 * Circle with minus line (subtract/decrement set count), 16×16.
 */
export function SubtractCircleIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 8H11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Circle with plus line (add/increment set count), 16×16.
 */
export function AddCircleIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M8 5V11M5 8H11"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  )
}
