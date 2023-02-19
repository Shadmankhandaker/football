import React, { useState } from "react";
import "./Contact.css";

import ModalWrapper from "../Modal";

function Contact({ show, onClose }) {
  return (
    <ModalWrapper show={show} onClose={onClose}>
      <div className="contact_wrapper">
        <iframe
          className="contact_iframe"
          src="https://docs.google.com/forms/d/e/1FAIpQLScXzKTT8LZpXrfDvVIHlUxepTFBn9nhzPR6ZZ0avSv0SH7JzA/viewform?embedded=true"
          // width="640"
          // height="1140"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Loading…
        </iframe>
      </div>
    </ModalWrapper>
  );
}

export default Contact;
