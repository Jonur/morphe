/**
 * Custom icons — exact paths extracted from the Figma Design System (node 120:2).
 * All coordinates are in the icon frame's coordinate space (local vector coords + vector offset).
 * Stroke settings: strokeLinejoin="miter" strokeLinecap="butt" (SVG defaults = Figma MITER/NONE).
 * All stroke icons use currentColor so colour is controlled via className / parent text colour.
 */

interface IconProps {
  size?: number
  className?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

// ─── Navigation ─────────────────────────────────────────────────────────────

/**
 * Left-pointing back arrow — 24×24.
 * Figma: full horizontal shaft + arrowhead, strokeWeight 1.8.
 */
export function BackArrowIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M24 12L1.5 12M9.5 20L1.5 12L9.5 4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}

/**
 * Three vertical square dots — options / more menu.
 * Figma: vertical-menu-square — 3 tiny stroked squares.
 * 24px variant (AppBar): strokeWeight 1.8 · 16px variant (WorkoutCard): strokeWeight 1.5.
 */
export function VerticalMenuIcon({ size = 24, className = '', ...props }: IconProps) {
  if (size <= 16) {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} {...props}>
        <path d="M8.5 2L8.5 1L7.5 1L7.5 2L8.5 2Z"       stroke="currentColor" strokeWidth="1.5" />
        <path d="M8.5 8.5L8.5 7.5L7.5 7.5L7.5 8.5L8.5 8.5Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8.5 15L8.5 14L7.5 14L7.5 15L8.5 15Z"   stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M12.5 5L12.5 4L11.5 4L11.5 5L12.5 5Z"         stroke="currentColor" strokeWidth="1.8" />
      <path d="M12.5 12.5L12.5 11.5L11.5 11.5L11.5 12.5L12.5 12.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12.5 20L12.5 19L11.5 19L11.5 20L12.5 20Z"   stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

// ─── Search ──────────────────────────────────────────────────────────────────

/**
 * Magnifying-glass — 16×16.
 * Figma: magnifying-glass — circle (r≈6.67, centre 7.33 7.33) + diagonal handle.
 */
export function SearchIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} {...props}>
      <path
        d="M0.667 7.333C0.667 9.102 1.369 10.797 2.619 12.048C3.869 13.298 5.565 14 7.333 14C9.102 14 10.797 13.298 12.048 12.048C13.298 10.797 14 9.102 14 7.333C14 5.565 13.298 3.869 12.048 2.619C10.797 1.369 9.102 0.667 7.333 0.667C5.565 0.667 3.869 1.369 2.619 2.619C1.369 3.869 0.667 5.565 0.667 7.333Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M12 12L15.333 15.333" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

// ─── Actions ─────────────────────────────────────────────────────────────────

/**
 * Plus / add — 16×16.
 * Figma: add-1 — full-width + sign.
 */
export function PlusIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} {...props}>
      <path d="M8 0.667L8 15.333"   stroke="currentColor" strokeWidth="1.5" />
      <path d="M0.667 8L15.333 8"   stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/**
 * Filled circle with checkmark — exercise selected state — 20×20.
 * Figma: check-circle — filled circle (currentColor) + white checkmark.
 */
export function CheckCircleIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <path
        d="M0 10C0 12.652 1.054 15.196 2.929 17.071C4.804 18.946 7.348 20 10 20C12.652 20 15.196 18.946 17.071 17.071C18.946 15.196 20 12.652 20 10C20 7.348 18.946 4.804 17.071 2.929C15.196 1.054 12.652 0 10 0C7.348 0 4.804 1.054 2.929 2.929C1.054 4.804 0 7.348 0 10Z"
        fill="currentColor"
      />
      <path
        d="M6 9.833L8.917 12.75L13.917 6.5"
        stroke="white"
        strokeWidth="1.8"
      />
    </svg>
  )
}

/**
 * Close / dismiss — 24×24.
 * Figma DS node 152:39 — two 15px diagonals offset 4.5px from edge, strokeWeight 1.8.
 */
export function CloseIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M19.5 4.5L4.5 19.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M19.5 19.5L4.5 4.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

/**
 * × mark — used to clear search input (size 16) and remove exercise chips (size 10).
 * Figma: Delete icon — two crossing diagonals, 8×8 natural size.
 */
export function ClearIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" fill="none" className={className} {...props}>
      <path d="M8 0L0 8" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 8L0 0" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

// ─── Workout card / context menu ─────────────────────────────────────────────

/**
 * Eye / view icon — 16×16.
 * Figma: visible--eye-eyeball-open-view — lens outline + pupil circle.
 */
export function ViewIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} {...props}>
      {/* Lens */}
      <path
        d="M8 2C4.334 2 3.147 4.667 0.814 8C3.147 11.333 4.334 14 8 14C11.667 14 12.854 11.333 15.187 8C12.854 4.667 11.667 2 8 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Pupil */}
      <path
        d="M10 8C10 9.105 9.105 10 8 10C6.895 10 6 9.105 6 8C6 6.895 6.895 6 8 6C9.105 6 10 6.895 10 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

/**
 * Pencil / edit icon — 16×16.
 * Figma: pencil--change-edit-modify-pencil-write-writing.
 */
export function EditIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} {...props}>
      {/* Tip diamond */}
      <path
        d="M13 7.667L8.333 3L10.333 1L15 5.667L13 7.667Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Body */}
      <path
        d="M13 7.667L6 14.667L1.333 14.667L1.333 10L8.333 3L13 7.667Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

/**
 * Trash / delete icon — 16×16 default (used in menus), also works at 20px and 24px.
 * Figma: recycle-bin-2 — lid line + body rect + two inner lines + arch handle.
 */
export function DeleteIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} {...props}>
      {/* Lid separator */}
      <path d="M0 4L16 4"                                       stroke="currentColor" strokeWidth="1.5" />
      {/* Body */}
      <path d="M2 4L14 4L14 15.333L2 15.333Z"                  stroke="currentColor" strokeWidth="1.5" />
      {/* Inner lines */}
      <path d="M6 7.333L6 12"                                   stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 7.333L10 12"                                 stroke="currentColor" strokeWidth="1.5" />
      {/* Arch handle */}
      <path
        d="M5.333 4L5.333 3.333C5.333 1.861 6.527 0.667 8 0.667C9.473 0.667 10.667 1.861 10.667 3.333L10.667 4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

/**
 * Duplicate / copy — 16×16.
 * Two overlapping squares offset 4px diagonally.
 * Front page (top-right) drawn fully; back page (bottom-left) shows only
 * the L-shaped edges not hidden behind the front.
 */
export function DuplicateIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} {...props}>
      {/* Back page — visible L-shaped edges */}
      <path d="M5 5 L1 5 L1 15 L11 15 L11 11" stroke="currentColor" strokeWidth="1.5" />
      {/* Front page — full rectangle */}
      <path d="M5 1 L15 1 L15 11 L5 11 Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

// ─── Stepper controls ────────────────────────────────────────────────────────

/**
 * Minus / subtract — 16×16.
 * Figma: subtract-circle — horizontal line only (circle comes from CSS wrapper).
 */
export function SubtractIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} {...props}>
      <path d="M4 8L12 8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

/**
 * Plus / add — stepper variant — 16×16.
 * Figma: add-circle — plus sign only (circle comes from CSS wrapper).
 */
export function AddIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} {...props}>
      <path d="M8 4L8 12M4 8L12 8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}
