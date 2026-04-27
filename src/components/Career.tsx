import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My Experience <br />
          <span>& Education</span>
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h3>NOV 2025 – DEC 2025</h3>
                <h4>Data Science Internship</h4>
                <h5>OasisInfobyte</h5>
              </div>
            </div>
            <p>
              Built end-to-end machine learning projects including car price prediction, email spam detection, and sales
              forecasting, performing data preprocessing, feature engineering, model training, and evaluation using Python and
              Scikit-learn. (Duration: 1 month)
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h3>2022 – 2026</h3>
                <h4>B.Tech in Computer Science</h4>
                <h5>College of Engineering Roorkee</h5>
              </div>
            </div>
            <p>
              Expected Graduation 2026 • Percentage: 74%
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h3>COMPLETED 2022</h3>
                <h4>Intermediate PCM</h4>
                <h5>Heritage Public School</h5>
              </div>
            </div>
            <p>
              Percentage: 79%
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h3>COMPLETED 2020</h3>
                <h4>High School</h4>
                <h5>Heritage Public School</h5>
              </div>
            </div>
            <p>
              Percentage: 84%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
