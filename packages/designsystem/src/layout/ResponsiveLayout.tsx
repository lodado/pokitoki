import { ReactNode } from 'react'

interface ResponsiveLayoutProps {
  /**
   * The content to be rendered within the layout.
   */
  children: ReactNode

  /**
   * Optional additional CSS classes to apply to the layout container.
   */
  className?: string
}

/**
 * A layout component that centers its children horizontally within the viewport.
 * It stretches to the full width of the screen on smaller devices, and fixes width to 768px on medium devices and up.
 * This component can be used to wrap pages or other components that need to be centered.
 *
 * @param {ResponsiveLayoutProps} props - The props for this component.
 * @returns {JSX.Element} The ResponsiveLayout component.
 */
const ResponsiveLayout = ({ children, className = '' }: ResponsiveLayoutProps): JSX.Element => {
  return (
    <div className={`flex flex-col relative left-1/2 -translate-x-1/2 w-screen md:w-[768px] h-screen ${className}`}>
      {children}
    </div>
  )
}

export default ResponsiveLayout
