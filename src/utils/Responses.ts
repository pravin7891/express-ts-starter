export const successResponse = (message: string, data: any = null) => {
    return {
      success: true,
      message,
      data,
    };
  };
  
  export const paginatedResponse = (
    message: string,
    data: any[],
    page: number,
    limit: number,
    total: number
  ) => {
    return {
      success: true,
      message,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  };
  
  export const errorResponse = (message: string, errors: any = null) => {
    return {
      success: false,
      message,
      errors,
    };
  };
  