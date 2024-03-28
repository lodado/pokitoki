import { ReactNode } from 'react'

/**
 * Props for the Navigation component.
 *
 * @property {ReactNode} children - The items to be displayed within the navigation footer.
 * @property {string} className - Additional CSS classes to apply to the navigation footer for further styling.
 */
interface NavigationProps {
  children?: ReactNode
  className?: string
}

/**
 * A navigation footer component that is fixed at the bottom of the viewport.
 * It is centered horizontally and designed to work across screen sizes, stretching full width on smaller screens,
 * and having a fixed width of 768px on medium screens and up. This component supports custom styling via className
 * and is intended to be used for navigation links or buttons at the bottom of a page.
 *
 * @param {NavigationProps} props - The props for this component.
 * @returns {JSX.Element} The Navigation component.
 */
const Navigation = ({ children, className }: NavigationProps): JSX.Element => {
  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 bottom-0 flex w-screen md:w-[768px] max-h-98px flex-row justify-around transform ${className}`}
    >
      {children}
    </nav>
  )
}

export default Navigation
