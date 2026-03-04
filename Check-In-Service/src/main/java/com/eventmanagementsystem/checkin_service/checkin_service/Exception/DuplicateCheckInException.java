package com.eventmanagementsystem.checkin_service.checkin_service.Exception;

public class DuplicateCheckInException extends CheckInException {

    public DuplicateCheckInException(String message) {
        super(message, "DUPLICATE_CHECKIN");
    }

    public DuplicateCheckInException(String message, Throwable cause) {
        super(message, "DUPLICATE_CHECKIN", cause);
    }
}

