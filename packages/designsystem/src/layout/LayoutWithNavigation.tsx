import { ReactNode } from 'react'

import { Navigation } from './Navigation'
import ResponsiveLayout from './ResponsiveLayout'

/**
 * Props for the LayoutWithNavigation component.
 *
 * @property {ReactNode} children - The content to be displayed within the responsive layout.
 * @property {string} [className] - Optional additional CSS classes to apply to the responsive layout for custom styling.
 */
interface LayoutWithNavigationProps {
  children: ReactNode
  className?: string
}

/**
 * A component that wraps its children in a ResponsiveLayout and includes a Navigation component.
 * This layout is intended for pages that require a consistent navigation interface. It allows for custom
 * styling of the ResponsiveLayout through an optional className. The Navigation component is fixed and
 * not customizable through props in this setup.
 *
 * @param {LayoutWithNavigationProps} props - The props for this component, including children and an optional className.
 * @returns {JSX.Element} A fragment containing the ResponsiveLayout with children and the Navigation component.
 */
const LayoutWithNavigation = ({ children, className = '' }: LayoutWithNavigationProps): JSX.Element => {
  return (
    <>
      <ResponsiveLayout className={className}>{children}</ResponsiveLayout>
      <Navigation />
    </>
  )
}

export default LayoutWithNavigation
