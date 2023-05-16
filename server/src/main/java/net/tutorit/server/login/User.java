package net.tutorit.server.login;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String username="";
	private String password="";
	private String role="";
	private boolean enabled=false;

	@ManyToMany
	@JoinTable(
			name = "user_meteli_event",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "meteli_event_id")
	)
	private List<MeteliEvent> savedMeteliEvents;
	@ManyToMany
	@JoinTable(
			name = "user_event",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "event_id")
	)
	private List<Event> savedEvents;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<UserHelsinkiEvent> userHelsinkiEvents;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String toString() {
		return "User "+username;
	}

	public List<MeteliEvent> getSavedMeteliEvents() {
		return savedMeteliEvents;
	}

	public void setSavedMeteliEvents(List<MeteliEvent> savedMeteliEvents) {
		this.savedMeteliEvents = savedMeteliEvents;
	}

	public List<Event> getSavedEvents() {
		return savedEvents;
	}

	public void setSavedEvents(List<Event> savedEvents) {
		this.savedEvents = savedEvents;
	}

	public List<UserHelsinkiEvent> getUserHelsinkiEvents() {
		return userHelsinkiEvents;
	}

	public void setUserHelsinkiEvents(List<UserHelsinkiEvent> userHelsinkiEvents) {
		this.userHelsinkiEvents = userHelsinkiEvents;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof User user)) return false;
		return isEnabled() == user.isEnabled() && Objects.equals(getId(),
																 user.getId()) && Objects.equals(getUsername(),
																								 user.getUsername()) && Objects.equals(getPassword(),
																																	   user.getPassword()) && Objects.equals(getRole(),
																																											 user.getRole()) && Objects.equals(getSavedMeteliEvents(),
																																																			   user.getSavedMeteliEvents()) && Objects.equals(getSavedEvents(),
																																																															  user.getSavedEvents()) && Objects.equals(getUserHelsinkiEvents(),
																																																																									   user.getUserHelsinkiEvents());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getId(),
							getUsername(),
							getPassword(),
							getRole(),
							isEnabled(),
							getSavedMeteliEvents(),
							getSavedEvents(),
							getUserHelsinkiEvents());
	}
}
