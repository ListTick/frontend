export interface BucketListCategoryRequest {
  name: string;
  colour?: string;
}

export interface BucketListCategoryResponse {
  id: string;
  name: string;
  colour: string;
}