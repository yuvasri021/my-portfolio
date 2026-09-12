import { useEffect, useState } from "react";
import profile from "./assets/profile.png";
import"./App.css";

function App() {
  const handleKeyDown = (e) => {
  const tag = e.target.tagName;

  if (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "BUTTON"
  ) {
    return;
  }

  const sections = ["home", "about", "skills", "projects", "contact"];

  const currentSection = sections.findIndex((id) => {
    const section = document.getElementById(id);

    if (!section) return false;

    const rect = section.getBoundingClientRect();

    return rect.top >= -100 && rect.top <= 100;
  });

  if (currentSection === -1) return;

  // Enter or Down Arrow → Next section
  if (
    e.key === "Enter" ||
    e.key === "ArrowDown"
  ) {
    if (currentSection < sections.length - 1) {
      document
        .getElementById(sections[currentSection + 1])
        .scrollIntoView({
          behavior: "smooth",
        });
    }
  }

  // Up Arrow → Previous section
  if (e.key === "ArrowUp") {
    if (currentSection > 0) {
      document
        .getElementById(sections[currentSection - 1])
        .scrollIntoView({
          behavior: "smooth",
        });
    }
  }
};
// Enter key listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  // Backend connection message
  const [message, setMessage] = useState("");

  // Contact form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Get backend test message
  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Backend connection error:", error);
      });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle contact form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message sent successfully! 🎉");

        // Clear form after successful submission
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        alert(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Cannot connect to backend");
    }
  };

  return (
    <div className="portfolio">

      {/* Navigation */}
      <nav className="navbar">
        <h2>Yuvasri j</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Home */}
      <section id="home" className="hero">
        <div>
          <p className="hello">Hello, I'm</p>

          <h1>Yuvasri j</h1>

          <h2>MCA Student | Software Developer | Data Analyst</h2>

          <p>
            I am passionate about building web applications,
            solving problems and working with data.
          </p>

          {/* Backend Connection message*/}

          <div className="buttons">
            <a href="#projects" className="btn">
              View My Projects
            </a>

            <a href="#contact" className="btn secondary">
              Contact Me
            </a>
            <a
  href="/resume.pdf"
  download="Yuvasri-Resume.pdf"
  className="btn secondary"
>
   view/Download Resume
</a>
<div className="social-links">
  <a
    href="https://github.com/yuvasri021"
    target="_blank"
    rel="noopener noreferrer"
  >
    GitHub
  </a>

  <a
    href="https://www.linkedin.com/in/yuvasri-j-a77b92301/"
    target="_blank"
    rel="noopener noreferrer"
  >
    LinkedIn
  </a>
</div>
          </div>
          </div>
        <div className="profile-container">
  <img
    src={profile}
    alt="Yuvasri"
    className="profile-image"
  />
</div>
      </section>

      {/* About */}
<section id="about" className="section about-section">

  <div className="about-content">

    <div className="about-heading">
      <p className="section-label">GET TO KNOW ME</p>
      <h2>About Me</h2>
    </div>

    <div className="about-text">
      <p>
        I am an MCA student with a strong interest in software development
        and data analytics. I enjoy building practical applications,
        solving real-world problems and continuously improving my technical skills.
      </p>

      <p>
        I am passionate about learning new technologies and creating
        simple, useful and user-friendly solutions.
      </p>

      <div className="about-cards">

        <div className="about-card">
          <span>🎓</span>
          <h3>MCA Student</h3>
          <p>Focused on developing strong technical and analytical skills.</p>
        </div>

        <div className="about-card">
          <span>💻</span>
          <h3>Software Development</h3>
          <p>Interested in building modern and practical applications.</p>
        </div>

        <div className="about-card">
          <span>📊</span>
          <h3>Data Analytics</h3>
          <p>Interested in SQL, Power BI and data-driven solutions.</p>
        </div>

      </div>
    </div>

  </div>

</section>

      {/* Skills */}
<section id="skills" className="section skills-section">

  <div className="skills-content">

    <div className="skills-heading">
      <p className="section-label">MY EXPERTISE</p>
      <h2>Skills</h2>
      <p>
        Technologies and tools I use to build applications
        and work with data.
      </p>
    </div>

    <div className="skills-grid">

      <div className="skill-card">
        <span>🌐</span>
        <h3>Web Development</h3>
        <p>HTML • CSS • JavaScript • React.js</p>
      </div>

      <div className="skill-card">
        <span>🐍</span>
        <h3>Programming</h3>
        <p>Python • Java</p>
      </div>

      <div className="skill-card">
        <span>🗄️</span>
        <h3>Database</h3>
        <p>SQL • MySQL</p>
      </div>

      <div className="skill-card">
        <span>📊</span>
        <h3>Data Analytics</h3>
        <p>Power BI • Data Visualization</p>
      </div>

      <div className="skill-card">
        <span>🔧</span>
        <h3>Tools</h3>
        <p>Git • GitHub • VS Code</p>
      </div>

      <div className="skill-card">
        <span>⚛️</span>
        <h3>Frontend</h3>
        <p>React.js • Responsive Design</p>
      </div>

    </div>

  </div>

</section>

      {/* Projects */}
<section id="projects" className="section projects-section">

  <div className="projects-content">

    <div className="projects-heading">
      <p className="section-label">MY WORK</p>
      <h2>Projects</h2>
      <p>
        Some of the projects I have worked on while learning
        software development and data analytics.
      </p>
    </div>

    <div className="projects-grid">

      <div className="project-card">
        <div className="project-number">01</div>
        <h3>EduTutor AI</h3>

        <p>
          An AI-based educational platform designed to personalize
          learning and quizzes for students.
        </p>

        <div className="project-tech">
          <span>React</span>
          <span>Python</span>
          <span>AI</span>
        </div>

        <button className="project-btn">
          View Project →
        </button>
      </div>

      <div className="project-card">
        <div className="project-number">02</div>
        <h3>Personal Finance Manager</h3>

        <p>
          An application for managing personal expenses and
          organizing financial information efficiently.
        </p>

        <div className="project-tech">
          <span>Python</span>
          <span>SQL</span>
          <span>MySQL</span>
        </div>

        <button className="project-btn">
          View Project →
        </button>
      </div>

      <div className="project-card">
        <div className="project-number">03</div>
        <h3>Power BI Dashboard</h3>

        <p>
          A data analytics dashboard created to visualize business
          data and generate useful insights.
        </p>

        <div className="project-tech">
          <span>Power BI</span>
          <span>SQL</span>
          <span>Analytics</span>
        </div>

        <button className="project-btn">
          View Project →
        </button>
      </div>

    </div>

  </div>

</section>


      {/* Contact */}
<section id="contact" className="section contact-section">

  <div className="contact-content">

    <div className="contact-info">
      <p className="section-label">GET IN TOUCH</p>

      <h2>Let's Connect</h2>

      <p>
        Have a project idea, opportunity or just want to say hello?
        Feel free to send me a message.
      </p>

      <div className="contact-details">
        <div>
          <span>📧</span>
          <div>
            <strong>Email</strong>
            <p>yuvasrijagadeesan02@gmail.com</p>
          </div>
        </div>

        <div>
          <span>💼</span>
          <div>
            <strong>LinkedIn</strong>
            <p>linkedin.com/in/yuvasri-j-a77b92301</p>
          </div>
        </div>

        <div>
          <span>💻</span>
          <div>
            <strong>GitHub</strong>
            <p>github.com/yuvasri021</p>
          </div>
        </div>
      </div>
    </div>

    <form className="contact-form" onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>

      <button type="submit">
        Send Message →
      </button>

    </form>

  </div>

</section>
      {/* Footer */}
      <footer>
        <p>© 2026 Yuvasri. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default App;