export interface Growth {
    response_code: string;
    message:       string;
    status:        string;
    data:          Data[];
}

export interface Data {
    month: string;
    total: number;
}