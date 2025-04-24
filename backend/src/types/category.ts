export interface Category {
  id: string;
  name: string;
  color: string;
  user_id: string;
  created_at: string;
}

export interface CreateCategoryDto {
  name: string;
  color: string;
  user_id: string;
}

export interface UpdateCategoryDto {
  name?: string;
  color?: string;
}
