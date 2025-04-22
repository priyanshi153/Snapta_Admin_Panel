export interface AllUsersList {
    response_code: string;
    message:       string;
    tag_users:     TagUser[];
    status:        string;
    pagination:    Pagination;
}

export interface Pagination {
    current_page: string;
    last_page:    number;
    per_page:     number;
    total:        number;
    next_page:    number;
    prev_page:    number;
}

export interface TagUser {
    user_id:           string;
    first_name:        string;
    last_name:         string;
    email:             string;
    login_type:        string;
    username:          string;
    mobile:            string;
    email_verified_at: string;
    country_code:      string;
    device_token:      string;
    status:            string;
    address:           string;
    display_name:      string;
    profile_pic:       string;
}
