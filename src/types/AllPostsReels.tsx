export interface GetAllPost 
{
    response_code:string,
    message:string,
    recent_content:Recent_Content[]
    status:string
}

export interface Recent_Content
{
    post_id:number,
    user_id:number
    text:string,
    location:string,
    post_type:string,
    created_at:string,
    updated_at:string,
    post_image:Post_Image[],
    username:string,
    profile_pic:string,
    is_follow:string,
    is_liked:string,
    total_like:string,
    total_comment:string,
    is_bookmark:string,
    is_block:string,
    tag_user_list:Tag_User[]
}

export interface Post_Image
{
    post_image_id: number,
    url: string,
    type: string,
    post_video_thumbnail: string,
}

export interface Tag_User 
{

}