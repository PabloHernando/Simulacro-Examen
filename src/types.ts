export type apiCharacter = {
    id: number
    name: String
    status: String
    species: String
    type: String
    gender: String
    origin: apiLocation
    location: apiLocation
    image: String
    episode: [apiEpisode]
    created: String
}

export type apiEpisode = {
    id: number
    name: String
    air_date: String
    episode: String
    characters: [apiCharacter]
    created: String
}

export type apiLocation = {
    id: number
    name: String
    type: String
    dimension: String
    residents: [apiCharacter]
    created: String
}

export type FilterCharacter = {
    name: String
    status: String
    species: String
    type: String
    gender: String
}