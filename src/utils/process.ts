export async function sleep(delay: number): Promise<boolean> {
  // Sleep
  await new Promise((resolve) => setTimeout(resolve, delay))

  return true
}
