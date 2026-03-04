package com.eventmanagementsystem.checkin_service.checkin_service.Exception;

public class InvalidCheckInException extends CheckInException {

    public InvalidCheckInException(String message) {
        super(message, "INVALID_CHECKIN");
    }

    public InvalidCheckInException(String message, Throwable cause) {
        super(message, "INVALID_CHECKIN", cause);
    }
}

