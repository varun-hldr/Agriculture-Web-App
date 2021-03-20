import React from "react";

const Footer = () => {
  return (
    <footer className="container footer">
      <div className="d-flex justify-content-between">
        <p>© AgriBazzar</p>
        <p>
          Developed by{" "}
          <a href="https://github.com/varun-hldr" className="link-light">
            Varun
          </a>
          {" & "}
          <a
            href="https://github.com/gyanwati-kumari-au9"
            className="link-light"
          >
            Gyanwati
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
