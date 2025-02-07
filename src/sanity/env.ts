export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-26'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skc7T7cJy0dQLVNPAfSnZgUh9Az4JgxXy6F6zw42umaoxV2Uiy5opqWlOuirSIVGU0YQP17dAke6g30f1qrZCRkizJQpRltJNmdhJksTGu2NDbizB9mk5RPADACSmtiLoDRIXX5Ly0ogJq6ydfX8EDRxcE73IAP5kK4hzGKFBfHDECSnXGrb",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
