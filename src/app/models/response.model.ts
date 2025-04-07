export interface ResponseDTO<TResponse> {
    message: string;
    result : TResponse | null
}