package net.tutorit.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import net.tutorit.server.entities.Chat;

public interface ChatRepository extends JpaRepository<Chat, Integer>{

}
