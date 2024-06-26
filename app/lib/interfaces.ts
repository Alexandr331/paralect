export interface ISort {
    'original_title'?: string | null,
    'with_genres'?: string | null,
    'primary_release_year'?: Date | null,
    'vote_averagegte'?: string | null,
    'vote_averagelte'?: string | null,
}

export interface IGenres {
  id: string,
  name: string
}

export interface ICompanies {
  id: string, 
  logo_path: string, 
  name: string, 
  origin_country: string
}

export interface IMovieDetail {
    id: number
    original_title: string
    poster_path: string | null
    genre_ids: number[],
    release_date: string,
    vote_average: string,
    runtime: string,
    vote_count: string,
    budget: string,
    overview: string,
    genres: IGenres[],
    production_companies: ICompanies[]
    user_rate?: number | string 
}