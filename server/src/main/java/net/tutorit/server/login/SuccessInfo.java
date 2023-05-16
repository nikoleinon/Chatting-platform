package net.tutorit.server.login;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class SuccessInfo {
	private String message;

	public SuccessInfo(String message) {
		this.message=message;
	}
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	static ResponseEntity notFound(String msg) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new SuccessInfo(msg));
	}
	
	static ResponseEntity badRequest(String msg) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new SuccessInfo(msg));
	}
}
