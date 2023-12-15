import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const SendEmail = () => {
  // Update the initial state to use EditorState instead of a string
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [to, setTo] = useState("");
  const [from] = useState(localStorage.getItem("email"));
  const [subject, setSubject] = useState("");

  const sendEmail = async () => {
    const editorText = editorState.getCurrentContent().getPlainText();

    const cleaned_email_From = from.replace(".", "").replace("@", "");

    const cleaned_email_To = to.replace(".", "").replace("@", "");

    const response1 = await fetch(
      `https://mailbox-client-a1bb4-default-rtdb.firebaseio.com/${cleaned_email_From}/send.json`,
      {
        method: "POST",
        body: JSON.stringify({
          to: to,
          from: from,
          subject: subject,
          message: editorText,
        }),
      }
    );

    const response2 = await fetch(
      `https://mailbox-client-a1bb4-default-rtdb.firebaseio.com/${cleaned_email_To}/inbox.json`,
      {
        method: "POST",
        body: JSON.stringify({
          to: to,
          from: from,
          subject: subject,
          message: editorText,
        }),
      }
    );

    const data = await response1.json();
    const data2 = await response2.json();

    console.log(data2);

    const sendData = {
      id: data.name,
      to: to,
      from: from,
      subject: subject,
      message: editorText,
    };

    console.log(sendData);

    const emailData = {
      to,
      from,
      subject,
      // Convert the editorState to raw content
      editorState: editorText,
    };

    setTo("");
    setSubject("");
    setEditorState(EditorState.createEmpty());

    alert("Email Sent Successfully!");

    // Now you can send emailData to your server or perform any desired action.
    console.log("Email Data:", emailData);
  };

  return (
    <div className="mt-4">
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">To:</label>
            <input
              type="email"
              className="form-control"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">From:</label>
            <input type="text" className="form-control" value={from} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Subject:</label>
            <input
              type="text"
              className="form-control"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div
            className="form-control"
            style={{
              minHeight: "300px",
              border: "1px solid #ddd",
              padding: "10px",
            }}
          >
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              // Use onChange to set the editorState
              onEditorStateChange={(newEditorState) =>
                setEditorState(newEditorState)
              }
            />
          </div>
          <div>
            <button className="btn btn-primary mt-2" onClick={sendEmail}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
