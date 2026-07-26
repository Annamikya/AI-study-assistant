import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  const handleLearnMore = () => {
    const featuresSection = document.getElementById("features");

    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>
            Learn Smarter with <span>AI Study Assistant</span>
          </h1>

          <p>
            Upload your PDFs, generate summaries, create quizzes,
            flashcards, and chat with your study material using AI.
          </p>

          <div className="hero-buttons">
            <button
              type="button"
              className="primary-btn"
              onClick={handleGetStarted}
            >
              Get Started
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={handleLearnMore}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/002/173/392/small_2x/student-studying-at-home-free-vector.jpg"
            alt="Student studying"
          />
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <span>Smart Learning Tools</span>
          <h2>Everything you need to study effectively</h2>
          <p>
            Turn lengthy study material into useful summaries, quizzes,
            flashcards, notes and AI-powered conversations.
          </p>
        </div>

        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Upload PDFs</h3>
            <p>
              Upload your study documents and keep all your learning
              material organized in one place.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>AI Summaries</h3>
            <p>
              Generate short and understandable summaries from lengthy
              PDF content.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Chat with PDF</h3>
            <p>
              Ask questions related to your uploaded material and receive
              AI-generated answers.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">❓</div>
            <h3>Generate Quizzes</h3>
            <p>
              Create practice questions from your documents and test your
              understanding.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">🗂️</div>
            <h3>Flashcards</h3>
            <p>
              Convert important concepts into flashcards for quick
              revision.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">📒</div>
            <h3>Personal Notes</h3>
            <p>
              Create and save your own notes while studying your uploaded
              content.
            </p>
          </article>
        </div>

        <div className="features-cta">
          <button
            type="button"
            className="primary-btn"
            onClick={handleGetStarted}
          >
            Start Studying
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;