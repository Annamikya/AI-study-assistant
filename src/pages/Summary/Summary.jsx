import "./Summary.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

function Summary() {
  return (
    <DashboardLayout>
      <div className="summary-page">

        <div className="summary-header">
          <h1>📝 AI Summary</h1>
          <p>Get a quick overview of your uploaded PDF.</p>
        </div>

        <div className="summary-card">
          <h2>Summary</h2>

          <p>
            React is a JavaScript library used to build interactive user
            interfaces. It is component-based, making code reusable and easy to
            maintain.
          </p>

          <ul>
            <li>✔ Component-Based Architecture</li>
            <li>✔ Uses Virtual DOM for faster rendering</li>
            <li>✔ Supports JSX syntax</li>
            <li>✔ React Hooks simplify state management</li>
            <li>✔ Easy integration with APIs</li>
          </ul>

          <div className="summary-buttons">
            <button className="copy-btn">📋 Copy</button>
            <button className="download-btn">⬇ Download</button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Summary;