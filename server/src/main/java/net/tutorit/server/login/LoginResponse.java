package net.tutorit.server.login;

public class LoginResponse {
	private String message;
	
	public LoginResponse(String m) {
		message=m;
	}

	public String getMessage() {
		return message;
	}

	public void setToken(String message) {
		this.message=message;
	}
}
