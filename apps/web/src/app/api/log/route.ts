import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'

async function readBlobText(blob: Blob) {
  const text = JSON.stringify(JSON.parse(await blob.text()))

  /* TO DO - 
  배포때 로그 따로 저장    */
  fs.appendFile('./log.txt', `${text}\n`, 'utf-8', (err) => {})
}

async function handler(req: NextRequest, res: any) {
  readBlobText(await req.blob())

  // 클라이언트에게 JSON 응답을 반환
  return NextResponse.json(
    {},
    {
      status: 200,
    },
  )
}

export { handler as POST }
