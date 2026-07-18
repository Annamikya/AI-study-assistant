import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
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
            <button className="primary-btn">Get Started</button>
            <button className="secondary-btn">Learn More</button>
          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/002/173/392/small_2x/student-studying-at-home-free-vector.jpg"
            alt="Student studying"
          />

        </div>

      </section>
    </>
  );
}

export default Home;