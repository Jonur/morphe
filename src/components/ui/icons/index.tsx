// Custom SVG icons extracted from Figma design — sized and styled to match the design system exactly.
// All icons use currentColor so they can be coloured via CSS.

interface IconProps {
  size?: number
  className?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

/** Left-pointing back arrow, 24×24 */
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
        d="M15 19L8 12L15 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Three vertical dots menu icon */
export function VerticalMenuIcon({ size = 24, className = '', ...props }: IconProps) {
  const cy = [size * 0.21, size * 0.5, size * 0.79]
  const r = size * 0.063
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
      {...props}
    >
      {cy.map((y, i) => (
        <circle key={i} cx={size / 2} cy={y} r={r} fill="currentColor" />
      ))}
    </svg>
  )
}

/** Magnifying-glass search icon, 16×16 */
export function SearchIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10.5 10.5L13.5 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Plus / add icon, 16×16 */
export function PlusIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M8 3V13M3 8H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Filled circle with checkmark (used for selected state in dropdown), 20×20 */
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
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      <path
        d="M6.5 10.25L8.75 12.5L13.5 7.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Small × for chip/tag removal */
export function DeleteXIcon({ size = 10, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M2 2L8 8M8 2L2 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Circle with minus line (subtract/decrement), 16×16 */
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

/** Circle with plus line (add/increment), 16×16 */
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

/** Eye / view icon, 20×20 */
export function EyeIcon({ size = 20, className = '', ...props }: IconProps) {
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
        d="M2.5 10C2.5 10 5.5 4.5 10 4.5C14.5 4.5 17.5 10 17.5 10C17.5 10 14.5 15.5 10 15.5C5.5 15.5 2.5 10 2.5 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/** Pencil / edit icon, 20×20 */
export function PencilIcon({ size = 20, className = '', ...props }: IconProps) {
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
        d="M14.5 3.5L16.5 5.5L6.5 15.5L3.5 16.5L4.5 13.5L14.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13 5L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Trash / recycle bin icon — pass size=20 for menu items, size=24 for modal */
export function TrashIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      {...props}
    >
      <path d="M3.5 6H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M8 6V4H12V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 6L6 16H14L15 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.5V13.5M11 9.5V13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
