export interface UserBasic{
    Email: string;
    Password: string;
}

export interface UserSession extends UserBasic{
    UserKey: number;
    FirstName: string;
    LastName: string;
    SessionToken: string;
}
