package net.tutorit.server.login;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseObject {
	private String message="";
	
	public ResponseObject(String message) {
		this.message=message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	static public ResponseEntity<?> ok(Object data) {
		return ResponseEntity.ok(data);
	}
	
	static public ResponseEntity<?> ok(String msg) {
		return ResponseEntity.ok(new ResponseObject(msg));
	}
	
	static public ResponseEntity<?> notFound(String msg) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject(msg));
	}
	
	static public ResponseEntity<?> badRequest(String msg) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(msg));
	}
}