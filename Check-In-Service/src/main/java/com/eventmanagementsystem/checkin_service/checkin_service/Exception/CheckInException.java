package com.eventmanagementsystem.checkin_service.checkin_service.Exception;

public class CheckInException extends RuntimeException {

    private String errorCode;

    public CheckInException(String message) {
        super(message);
    }

    public CheckInException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public CheckInException(String message, Throwable cause) {
        super(message, cause);
    }

    public CheckInException(String message, String errorCode, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
}

