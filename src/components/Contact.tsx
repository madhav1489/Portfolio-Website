import { MdArrowOutward } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=madhavsharma1489@gmail.com" target="_blank" rel="noreferrer" data-cursor="disable" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SiGmail color="#EA4335" /> madhavsharma1489@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+917006563950" data-cursor="disable">
                +91 70065 63950
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/madhav1489"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/madhav-sharma-274709281/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Madhav Sharma</span>
            </h2>
            <h5>
              2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
