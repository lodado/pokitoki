import { TokenRepository } from '@/server/repository'

class TokenService {
  attendanceRepository: typeof TokenRepository

  constructor(attendanceRepository: typeof TokenRepository) {
    this.attendanceRepository = attendanceRepository
  }

  getTokenUsage = ({ userId }: { userId: string }) => {
    return this.attendanceRepository.getTokenUsage({ userId })
  }

  updateToken = async ({ userId, token }: { userId: string; token: number }) => {
    await this.attendanceRepository.updateTokenUsage({ userId, token })
  }

  addToken = async ({ userId, token }: { userId: string; token: number }) => {
    const { token: previousToken } = await this.getTokenUsage({ userId })

    if (previousToken + token < 0) {
      throw new Error('Invalid request')
    }

    await this.updateToken({ userId, token: previousToken + token })

    return { token: previousToken + token }
  }
}

const TokenServiceInstance = new TokenService(TokenRepository)

export default TokenServiceInstance
