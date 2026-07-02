export type ActivityPayload = {
  userId: string
  type: string
  durationMinutes: number
  caloriesBurned: number
  notes?: string
  performedAt?: string
}

export type ActivityResponse<T> = {
  data: T
}

export async function fetchActivities() {
  const response = await fetch('/api/activities')
  if (!response.ok) {
    throw new Error('Failed to fetch activities')
  }
  return response.json() as Promise<ActivityResponse<Array<ActivityPayload & { _id: string }>>>
}

export async function createActivity(activity: ActivityPayload) {
  const response = await fetch('/api/activities', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(activity),
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || 'Failed to create activity')
  }
  return response.json() as Promise<ActivityResponse<ActivityPayload & { _id: string }>>
}
