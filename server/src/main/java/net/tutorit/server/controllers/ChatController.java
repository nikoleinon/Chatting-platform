package net.tutorit.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import net.tutorit.server.entities.Chat;
import net.tutorit.server.repositories.ChatRepository;

@RestController
@RequestMapping("/chat")
public class ChatController {
	@Autowired
	ChatRepository repo;
	
	@GetMapping
	public List<Chat> getAll(){
		return repo.findAll();
	}
	
	@PostMapping
	Chat create(@RequestBody Chat c) {
		repo.saveAndFlush(c);
		return c;
	}
	
	@PutMapping("/{id}")
	Chat save (@PathVariable int id,@RequestBody Chat c) {
		c.setId(id);
		repo.saveAndFlush(c);
		return c;
	}
	
	@DeleteMapping("/{id}")
	String delete(@PathVariable int id) {
		Chat c=repo.findById(id).orElse(null);
		if (c==null) {
			throw new ResponseStatusException 
			(HttpStatus.NOT_FOUND, "Not found");
		}
		repo.deleteById(id);
		return "Deleted"; 
	}
	
}
