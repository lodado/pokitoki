import React from 'react'

import { SelfStudySectionTitle } from '../components/SelfStudySectionTitle'

const PersonaSection = () => {
  return (
    <section className="flex flex-col px-4">
      <div className="flex flex-row items-center justify-between">
        <SelfStudySectionTitle
          title="대화 상대 페르소나 커스텀"
          subTitle="대화 상대를 직접 커스텀하거나 추천 페르소나를 선택해주세요"
          ButtonText="페르소나 커스텀"
          difficulty="난이도 별별별"
        />
      </div>
    </section>
  )
}

export default PersonaSection
