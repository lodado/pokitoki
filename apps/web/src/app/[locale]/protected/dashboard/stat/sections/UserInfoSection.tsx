import React from 'react'

import { Profile } from '@/components'
import { getLoginSession } from '@/hooks/login'
import { getI18n } from '@/lib/i18n'

const UserInfoSection = async () => {
  const i18nStat = await getI18n('STAT')
  const { user } = await getLoginSession()

  return (
    <section className="flex flex-col">
      <div className="flex flex-row gap-4">
        <Profile
          src="https://qmwtuvttspuxwuwrsuci.supabase.co/storage/v1/object/public/pokitokiStorage/avat.png"
          alt="user profile"
          width={56}
          height={56}
        />

        <div className="flex flex-col gap-1">
          <h2 className="heading-04 text-text-01">{i18nStat('USERNAME', { username: user.name })}</h2>
          <p className="text-text-03 body-01-r">{i18nStat('CHEERUP-MESSAGE')}</p>
        </div>
      </div>
    </section>
  )
}

export default UserInfoSection
