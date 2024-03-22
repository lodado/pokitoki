import { ReactNode } from 'react'

/**
 * Props for the ResponsiveLayout component.
 *
 * @property {ReactNode} children - The content to be rendered within the layout.
 * @property {string} [className] - Optional additional CSS classes to apply to the layout container.
 */
interface DefaultLayoutProps {
  children: ReactNode
  className?: string
}

/**
 * A layout component that centers its children horizontally within the viewport.
 * It stretches to the full width of the screen on smaller devices, and fixes width to 768px on medium devices and up.
 * This component can be used to wrap pages or other components that need to be centered.
 *
 * @param {DefaultLayoutProps} props - The props for this component.
 * @returns {JSX.Element} The ResponsiveLayout component.
 */
const ResponsiveLayout = ({ children, className = '' }: DefaultLayoutProps): JSX.Element => {
  return <div className={`relative left-1/2 -translate-x-1/2 w-screen md:w-[768px] ${className}`}>{children}</div>
}

export default ResponsiveLayout
