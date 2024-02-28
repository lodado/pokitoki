const projectId = '' // your supabase project id

export interface SupabaseLoaderParams {
  src: string
  width?: number

  quality?: number
}

export default function supabaseLoader({ src, width, quality }: SupabaseLoaderParams) {
  return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?width=${width || 500}&quality=${
    quality || 75
  }`
}
