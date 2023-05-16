package net.tutorit.server.login;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
public class UserController {

	@Autowired
	UserRepository repo;
	
	@Autowired
	JpaUserRepository jrepo;
	
	@GetMapping
	public Iterable<User> getAll(@RequestParam Optional<String> username) {
	    Iterable<User> all;

	    if (username.isPresent()) {
	        all = repo.findByUsername(username.get());
	    } else {
	        all = repo.findAll();
	    }

	    all.forEach(u -> u.setPassword(""));
	    return all;
	}
	
	@Autowired
	BCryptPasswordEncoder encoder;
	
	@PostMapping
	public ResponseEntity<?> createUser(@RequestBody User user) {
		if (user==null) return SuccessInfo.badRequest("No user data");
		if (user.getPassword().isBlank()) return SuccessInfo.badRequest("Bad password");
		if (user.getUsername().isBlank()) return SuccessInfo.badRequest("Bad username");
		String pw=encoder.encode(user.getPassword());
		user.setPassword(pw);
		String role="user";
		if (!user.getRole().isBlank()) role=user.getRole();
		user.setRole(role);
		user.setEnabled(true);
		repo.save(user);
		user.setPassword("");
		return ResponseEntity.ok(user);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<?> saveUser(@PathVariable long id,@RequestBody User user) {
		if (id!=user.getId()) return SuccessInfo.badRequest("ID Mismatch");
		User orig=repo.findById(id).orElse(null);
		if (orig==null) return SuccessInfo.notFound("User not found");
		if (user==null) return SuccessInfo.badRequest("No user data");
		if (user.getUsername().isBlank()) return SuccessInfo.badRequest("Bad username");
		if (!user.getPassword().isBlank()) {
			String pw=encoder.encode(user.getPassword());
			orig.setPassword(pw);
		}
		orig.setUsername(user.getUsername());
		String role=orig.getRole();
		if (!user.getRole().isBlank()) role=user.getRole();
		orig.setRole(role);
		orig.setEnabled(user.isEnabled());
		repo.save(orig);
		orig.setPassword("");
		return ResponseEntity.ok(orig);
	}
	@PutMapping("{id}/role")
	public ResponseEntity<?> updateUserRole(@PathVariable long id) {
	    User user = repo.findById(id).orElse(null);
	    if (user == null) return SuccessInfo.notFound("User not found");
	    user.setRole("admin");
	    repo.save(user);
	    return ResponseEntity.ok(user);
	}
    @DeleteMapping("/{id}")
    ResponseEntity<?> delete(@PathVariable int id){
        User u=jrepo.findById(id).orElse(null);
        if (u==null) return ResponseObject.notFound("User not found") ;
        jrepo.deleteById(id);
        return ResponseObject.ok("Deleted");
    } 
}