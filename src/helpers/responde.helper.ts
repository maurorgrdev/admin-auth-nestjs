export function successResponse(data: any, message: string, status = 200) {
    return {
        data,
        message,
        status
    }
}

export function badRequestResponse(error: string, status = 400) {
    return {
        error,
        status
    }
}