import React, { useEffect, useRef, useState } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./Chat.css";

type FormDataType = {
  title: string;
  name: string;
  description: string;
  announcement_id: number;
};

type ChatType = {
  id: number;
  title: string;
  announcement_id: number;
  name: string;
  description: string;
};
type Announcement = {
  id: number;
  title: string;
};

type ChatProps = {
  announcements: Announcement[];
};
export function Chat() {
  let [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormdata] = useState<FormDataType>({
    title: "",
    name: sessionStorage.getItem("userName") ?? "",
    description: "",
    announcement_id: parseInt(sessionStorage.getItem("announcementId") ?? ""),
  });
  const typingRef = useRef(null);
  const [chats, setChats] = useState<ChatType[]>([]);
  const announcementId = formData.announcement_id;
  const [currentAnnouncementId, setCurrentAnnouncementId] = useState<number>(formData.announcement_id);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filteredChats, setFilteredChats] = useState<ChatType[]>([]);
  const [currentChats, setCurrentChats] = useState(filteredChats);
  const initialChats = announcementId ? [] : []; // Use an empty array if announcementId is defined

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatsResponse = await axios.get(
          "http://fight-boredom-alb-1816382168.eu-north-1.elb.amazonaws.com:8080/chat"
        );
        const announcementsResponse = await axios.get(
          "http://fight-boredom-alb-1816382168.eu-north-1.elb.amazonaws.com:8080/announcement"
        );
        const chatsWithAnnouncements = chatsResponse.data.map((chat: ChatType) => {
          const announcement = announcementsResponse.data.find(
            (announcement: any) => announcement.id === chat.announcement_id
          );
          return {
            ...chat,
            announcement,
          };
        });
        setChats(chatsWithAnnouncements);
        setFilteredChats(
          chatsWithAnnouncements.filter((chat: ChatType) => chat.announcement_id === currentAnnouncementId)
        );
      } catch (error: any) {}
    };
    fetchChats();
  }, []);
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://fight-boredom-alb-1816382168.eu-north-1.elb.amazonaws.com:8080/announcement"
        );
        setAnnouncements(response.data);
      } catch (error: any) {}
    };
    fetchAnnouncements();
  }, []);
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatsResponse = await axios.get(
          "http://fight-boredom-alb-1816382168.eu-north-1.elb.amazonaws.com:8080/chat"
        );
        console.log("chatsResponse", chatsResponse.data);
        const announcementsResponse = await axios.get(
          "http://fight-boredom-alb-1816382168.eu-north-1.elb.amazonaws.com:8080/announcement"
        );
        const chatsWithAnnouncements = chatsResponse.data.map((chat: ChatType) => {
          const announcement = announcementsResponse.data.find(
            (announcement: any) => announcement.id === chat.announcement_id
          );
          return {
            ...chat,
            announcement,
          };
        });
        setChats(chatsWithAnnouncements);
        setFilteredChats(
          chatsWithAnnouncements.filter((chat: ChatType) => chat.announcement_id === currentAnnouncementId)
        );
      } catch (error: any) {}
    };
    fetchChats();
  }, [currentAnnouncementId]);
  useEffect(() => {
    setFilteredChats(chats.filter((chat: ChatType) => chat.announcement_id === currentAnnouncementId));
    setCurrentChats(chats.filter((chat: ChatType) => chat.announcement_id === currentAnnouncementId));
  }, [chats, currentAnnouncementId]);

  const addChat = async (formData: FormDataType, chatId: string) => {
    try {
      const userName = sessionStorage.getItem("userName");
      const data = { ...formData, name: userName, announcement_id: formData.announcement_id };
      const response = await axios.post(
        "http://fight-boredom-alb-1816382168.eu-north-1.elb.amazonaws.com:8080/chat",
        data
      );
      const chat = response.data;
      const announcement = announcements.find((a) => a.id === formData.announcement_id);
      if (announcement) {
        chat.title = announcement.title;
      }
      setChats([...chats, chat]);
    } catch (error: any) {}
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formData, description: e.target.value });
  };

  const handleAnnouncementClick = (announcementId: number) => {
    setCurrentAnnouncementId(announcementId);
    setFormdata({ ...formData, announcement_id: announcementId }); // Update formData state with new announcementId
    announcementChats(announcementId);
  };

  const announcementChats = (announcementId: number) => {
    setCurrentAnnouncementId(announcementId);
    const announcement = announcements.find((a) => a.id === announcementId);
    if (announcement) {
      const filteredChats = chats.filter((chat) => chat.announcement_id === announcementId);
      console.log("filteredchats:", filteredChats);
      setCurrentChats(filteredChats);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chatId = "";
    await addChat(formData, chatId);
    setFormdata({ ...formData, description: "" });
  };

  /*
  const rows = (
    <div className="chat-container">
      {currentChats
        .slice()
        .reverse()
        .map((chat: ChatType) => (
          <div className="chat-box" key={chat.id}>
            <div className="chat-wrapper">
              <p className="chat-name">{chat.name}</p>
            </div>
            <p>{chat.description}</p>
          </div>
        ))}
    </div>
  );
*/
  //announcement id:n perusteella julkaisija? (chatin announcement_id -->  announcementsin user_id)
  //chat id:n perusteella sijainti näkymässä
  //className="fw-bold mb-0"

  const rows = (
    <div>
      {currentChats.slice().map((chat: ChatType) => (
        <li style={{ height: "100%", width: "40%", marginBottom: "20px", marginTop: "20px" }} key={chat.id}>
          <div className="card mask-custom w-100">
            <div
              className="card-header d-flex justify-content-between p-2"
              style={{ height: "40px", borderBottom: "1px solid rgba 255,255,255,.3" }}
            >
              <p className="fw-bold mb-0">{chat.name}</p>
            </div>
            <div className="card-body">
              <p className="mb-0">{chat.description}</p>
            </div>
          </div>
        </li>
      ))}
    </div>
  );

  return (
    <div className="chat">
      <header>
        <NavigationBar />
      </header>
      <Container fluid className="d-flex flex-column">
        <Row className="flex-grow-1">
          <Col sm={3} className="bg-light sidebar" style={{ height: "93vh", overflow: "hidden", overflowY: "scroll" }}>
            <div className="d-flex justify-content-start align-items-center p-3">
              <h3>Keskustelut</h3>
            </div>
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                onClick={() => handleAnnouncementClick(announcement.id)}
                style={{
                  padding: "10px",
                  background: announcement.id === currentAnnouncementId ? "#eee" : "none",
                  cursor: "pointer",
                }}
              >
                {announcement.title}
              </div>
            ))}
          </Col>

          <Col sm={9} className="d-flex flex-column">
            <Container className="flex-grow-1" style={{ height: "80vh", overflow: "hidden", overflowY: "scroll" }}>
              <ul>{rows}</ul>
            </Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-0">
                <Form.Control
                  type="text"
                  name="message"
                  placeholder="Kirjoita viestisi tähän"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ width: "80%", marginInlineStart: "5%", display: "inline-block" }}
                />
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3"
                  style={{ marginLeft: "10px", marginBottom: "20px" }}
                >
                  Lähetä
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
