import { Card } from '@custompackages/designsystem'
import React from 'react'

import request from '@/api'
import { Assistant } from '@/server/service/chatgpt/type'

import { SelfStudySectionTitle } from '../components/SelfStudySectionTitle'

/** <Card
        variant="medium"
        subTitle="apple"
        mainTitle="apple"
        url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
        alt=""
      /> */

const TopicOnSituationSection = async () => {
  const { data } = await request<Assistant[]>({ url: '/api/chatgpt/assistant', cache: 'force-cache' })

  // const data = [{ name: 'test', description: 'abc!' }]

  return (
    <section className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <SelfStudySectionTitle
          title="주제별 상황 토킹"
          subTitle="주제별 상황 토킹을 선택해 주세요"
          ButtonText="주제별 상황 토킹"
          difficulty="난이도 별별별"
        />
      </div>

      <div className="flex flex-row gap-2 overflow-x-scroll overflow-y-hidden">
        {data.map(({ name, description }: Assistant) => {
          return (
            <Card
              key={name}
              className="shrink-0"
              variant="medium"
              subTitle={description!}
              mainTitle={name!}
              url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
              alt=""
            />
          )
        })}

        <Card
          className="shrink-0"
          variant="medium"
          subTitle="apple"
          mainTitle="apple"
          url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
          alt=""
        />
        <Card
          className="shrink-0"
          variant="medium"
          subTitle="apple"
          mainTitle="apple"
          url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
          alt=""
        />
        <Card
          className="shrink-0"
          variant="medium"
          subTitle="apple"
          mainTitle="apple"
          url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
          alt=""
        />
        <Card
          className="shrink-0"
          variant="medium"
          subTitle="apple"
          mainTitle="apple"
          url="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/image%2034.png"
          alt=""
        />
      </div>
    </section>
  )
}

export default TopicOnSituationSection
