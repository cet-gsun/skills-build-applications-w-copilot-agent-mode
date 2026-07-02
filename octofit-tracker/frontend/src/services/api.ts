const codespaceName = import.meta.env.VITE_CODESPACE_NAME

const codespacesBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api` : undefined
const defaultBaseUrl = import.meta.env.DEV ? '/api' : 'http://localhost:8000/api'
const apiBaseUrl = codespacesBaseUrl || defaultBaseUrl

function buildApiUrl(path: string) {
  return `${apiBaseUrl}/${path}`
}

function unwrapListResponse<T>(body: unknown): T[] {
  if (Array.isArray(body)) {
    return body
  }

  if (body && typeof body === 'object') {
    const record = body as Record<string, unknown>

    if (Array.isArray(record.data)) {
      return record.data as T[]
    }

    if (Array.isArray(record.items)) {
      return record.items as T[]
    }

    if (Array.isArray(record.results)) {
      return record.results as T[]
    }
  }

  throw new Error('Unexpected API response shape')
}

export type ActivityPayload = {
  userId: string
  type: string
  durationMinutes: number
  caloriesBurned: number
  notes?: string
  performedAt?: string
}

export type ActivityWithId = ActivityPayload & { _id: string }
export type GenericItem = { [key: string]: unknown }

export async function fetchActivities() {
  const response = await fetch(buildApiUrl('activities'))
  if (!response.ok) {
    throw new Error('Failed to fetch activities')
  }

  const body = await response.json()
  return unwrapListResponse<ActivityWithId>(body)
}

export async function createActivity(activity: ActivityPayload) {
  const response = await fetch(buildApiUrl('activities'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(activity),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error((body as any).error || 'Failed to create activity')
  }

  const created = await response.json()
  return (created && typeof created === 'object' && 'data' in created)
    ? (created as { data: ActivityWithId }).data
    : (created as ActivityWithId)
}

export async function fetchUsers() {
  const response = await fetch(buildApiUrl('users'))
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  const body = await response.json()
  return unwrapListResponse<GenericItem>(body)
}

export async function fetchTeams() {
  const response = await fetch(buildApiUrl('teams'))
  if (!response.ok) {
    throw new Error('Failed to fetch teams')
  }

  const body = await response.json()
  return unwrapListResponse<GenericItem>(body)
}

export async function fetchWorkouts() {
  const response = await fetch(buildApiUrl('workouts'))
  if (!response.ok) {
    throw new Error('Failed to fetch workouts')
  }

  const body = await response.json()
  return unwrapListResponse<GenericItem>(body)
}

export async function fetchLeaderboard() {
  const response = await fetch(buildApiUrl('leaderboard'))
  if (!response.ok) {
    throw new Error('Failed to fetch leaderboard')
  }

  const body = await response.json()
  return unwrapListResponse<GenericItem>(body)
}
