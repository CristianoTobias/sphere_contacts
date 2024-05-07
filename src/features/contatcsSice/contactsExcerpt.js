import React from "react";
const ContactExcerpt = (
  contact,
  contactId,
  contactName,
  contactPhone,
  contactEmail
) => (
  <div>
    <p>{contactId}</p>
    <p>{contactName}</p>
    <p>{contactPhone}</p>
    <p>{contactEmail}</p>
    <p>Contact Excerpt</p>
  </div>
);
export default ContactExcerpt;
