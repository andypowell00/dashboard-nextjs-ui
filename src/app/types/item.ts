export interface Item {
    type: string
    image?: string
    title: string
    url?: string
    body?: string
    date?: string
    high_temp?: number
    low_temp?: number
    status?: string
    _id?: {
      $oid: string
    }
    artist?: string
    release_date?: string
    summary?: string
    thumbnail?: string
    description?: string
    location?: string
    wind?: string
    humidity?: string
    visibility?: string
    uvIndex?: number
    sunrise?: string
    sunset?: string
    icon?: string
    image_url?: string
  }
  