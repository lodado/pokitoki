import { Button } from '@custompackages/designsystem'

export interface SelfStudySectionTitleProps {
  title: string
  subTitle: string

  difficulty: string
  ButtonText: string
}

export const ResponsiveSectionTitle = ({ title, subTitle, difficulty, ButtonText }: SelfStudySectionTitleProps) => {
  return (
    <>
      <div className="flex flex-row justify-between w-full mb-spacing-2 gap-spacing-6 sm:justify-start ">
        <div className="flex flex-col gap-1">
          <h2 className=" text-text-01 body-03-m">
            {title}
            <span className="ml-0.5 text-text-primary detail-01-r">{difficulty}</span>
          </h2>
          <p className="body-01-r text-text-03">{subTitle}</p>

          <Button className="w-40 my-2 sm:hidden" size="small" variant="primary">
            {ButtonText}
          </Button>
        </div>
      </div>
      <Button className="hidden w-40 sm:flex" size="small" variant="primary">
        {ButtonText}
      </Button>
    </>
  )
}
