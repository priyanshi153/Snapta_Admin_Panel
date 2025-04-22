
export interface AllPostList {
    response_code: string;
    message:       string;
    rescent_post:  AllPosts[];
    pagination: Pagination
    status:        string;
}

export interface AllPosts {
    post_id:     number;
    user_id:     number;
    text:        string;
    location:    string;
    post_type:   string;
    created_at:  Date;
    updated_at:  Date;
    post_images: PostImage[];
    post_videos: any[];
    username:    string;
    profile_pic: string;
}

export interface PostImage 
{
    post_image_id: number,
    url:string,
    type:string
}

export interface Pagination 
{
    total: number,
    per_page: number,
    current_page: string,
    last_page: number,
    next_page: number,
    prev_page: number
}
