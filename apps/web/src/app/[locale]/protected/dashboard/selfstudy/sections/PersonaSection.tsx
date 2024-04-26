import { Card } from '@custompackages/designsystem'
import React from 'react'

import { SelfStudySectionTitle } from '../components/SelfStudySectionTitle'

const PersonaSection = () => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <SelfStudySectionTitle
          title="대화 상대 페르소나 커스텀"
          subTitle="대화 상대를 직접 커스텀하거나 추천 페르소나를 선택해주세요"
          ButtonText="페르소나 커스텀"
          difficulty="난이도 별별별"
        />
      </div>

      <div className="flex flex-row flex-wrap gap-2">
        {Array.from({ length: 7 }).map((ele, index) => {
          return (
            <Card
              // mocking code로 곧 변경할것
              key={index as any}
              className="shrink-0"
              variant="medium"
              subTitle="apple"
              mainTitle="apple"
              url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
              alt=""
            />
          )
        })}
      </div>
    </section>
  )
}

export default PersonaSection
