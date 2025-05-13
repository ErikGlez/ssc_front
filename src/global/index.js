const CONSTANTS = {
    GETTING_INFO : "GET_INFO",
    GET_INFO_SUCCESS : "GET_INFO_SUCCESS",
    SET_HISTORY_OPTION : "SET_HISTORY_OPTION",
    SET_ADDED : "SET_ADDED",
    SET_STATUS : "SET_STATUS",
    ERROR_MSG: "Ha ocurrido un error al intentar realizar la solicitud",
    ERROR_STATUS: "error",
    SUCCESS_STATUS: "success",
    CLEAN_VALUE: "CLEAN_VALUE",
}

exports.CONSTANTS = CONSTANTS;

function getErrorMessage(message) {
    if(!message) return createError(CONSTANTS.ERROR_MSG);

    if (Array.isArray(message)) {
      const stringErrors = message.map(err => err.msg).join(', ')
      return createError(stringErrors, message)
    } else if (typeof message === 'string') {
      return createError(message);
    } else {
      return createError(CONSTANTS.ERROR_MSG);
    }
  }

function createError(message_error, detail = []){

    return  {
        success: false,
        status: CONSTANTS.ERROR_STATUS,
        code: 500,
        message: message_error,
        data: null,
        detail
    }
}

exports.getErrorMessage = getErrorMessage;