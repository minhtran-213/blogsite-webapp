type ValuePiece = Date | null
export type Value = ValuePiece | [ValuePiece, ValuePiece] // DateTime picker value

interface ErrorItem { 
    field: string, 
    message: string
}

export interface ErrorResponse {
    statusCode: number,
    timestamp: string,
    path: string,
    errors: ErrorItem[]
}