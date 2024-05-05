export const getNotNullableObject = (option: Record<string, any>) => {
  const object: Record<string, any> = {}

  Object.entries(option).forEach(([key, value]) => {
    if (value) object[key] = value
  })

  return object
}
