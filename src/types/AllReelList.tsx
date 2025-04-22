export interface AllReelList {
    response_code: string;
    message:       string;
    rescent_post:  AllReel[];
    current_page:  number;
    last_page:     number;
    total:         number;
    status:        string;
}

export interface AllReel {
    post_id:        number;
    user_id:        number;
    text:           string;
    location:       string;
    post_type:      string;
    created_at:     Date;
    updated_at:     Date;
    post_images:    any[];
    post_videos:    PostVideo[];
    username:       string;
    profile_pic:    string;
    total_likes:    number;
    total_comments: number;
    is_likes:       string;
    bookmark:       string;
    total_share:    number;
    is_follow:      string;
}

export interface PostVideo {
    post_image_id:        number;
    url:                  string;
    type:                 string;
    post_video_thumbnail: string;
}
