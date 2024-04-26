import { Button } from '@custompackages/designsystem'
import React from 'react'

const FreeTalkingSection = () => {
  return (
    <section className="flex flex-row items-center justify-between px-4 rounded bg-primary-02-default shadow-card-02 py-spacing-5">
      <div className="flex flex-row justify-between w-full gap-spacing-6 sm:justify-start">
        <div className="flex items-center h-full">프로필</div>

        <div className="flex flex-col gap-0.5">
          <h2 className="text-text-01 body-03-m">
            프리토킹
            <span className="ml-0.5 text-text-primary detail-01-r">난이도 별별별</span>
          </h2>
          <p className="body-01-r text-text-03">자유롭게 프리토킹을 시작하세요</p>

          <Button className="w-full sm:hidden" size="small" variant="primary">
            주제별 상황 토킹
          </Button>
        </div>
      </div>

      <Button className="hidden w-40 sm:flex" size="small" variant="primary">
        주제별 상황 토킹
      </Button>
    </section>
  )
}

export default FreeTalkingSection
