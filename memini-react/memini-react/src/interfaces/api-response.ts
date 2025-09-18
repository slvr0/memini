export interface ApiResponse<T> {
    Success : Boolean; 
    Message : string;
    ResponseObject: T;
}