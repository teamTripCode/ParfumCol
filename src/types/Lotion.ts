export interface LotionDto {
    id: string
    name: string
    brand: string
    images: string[]
    description?: string
    genre?: genreLotion
    isAvailable: string
    chords: string
    price: number
}

export type genreLotion = "man" | "woman" | "arab_men" | "arab_woman" | "unisex";

export interface LotionHouse {
    id: number;
    name: string;
    established: string;
    logo?: string;
  }