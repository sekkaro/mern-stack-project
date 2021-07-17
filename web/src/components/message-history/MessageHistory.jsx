import React from "react";
import PropTypes from "prop-types";

import "./messageHistory.css";

const MessageHistory = ({ messages }) => {
  if (!messages) {
    return null;
  }

  return messages.map((msg, idx) => (
    <div key={idx} className="message-history mt-3">
      <div className="send font-weight-bold text-secondary">
        <div className="sender">{msg.messageBy}</div>
        <div className="date">{msg.date}</div>
      </div>
      <div className="message">{msg.message}</div>
    </div>
  ));
};

MessageHistory.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default MessageHistory;
