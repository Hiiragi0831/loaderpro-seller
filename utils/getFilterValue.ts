import type { Ref } from 'vue'

function getFilterValue<T = unknown>(field: string, filters: Ref<Record<string, any>>): T | null {
  const filter = filters.value[field]
  return typeof filter === 'object' && filter !== null && 'value' in filter
    ? (filter as { value: T }).value
    : null
}

export { getFilterValue }
