import React, { useEffect, useState } from "react";
import { inboxActions } from "../Redux/inbox";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Inbox = () => {
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.inbox.inbox);
  const [selectedData, setSelectedData] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSelectedData(null);
  };
  const handleShow = (data) => {
    setShow(true);
    setSelectedData(data);
  };

  // console.log(inbox);
  // console.log(selectedData);

  const clean_UserEmail = localStorage
    .getItem("email")
    .replace("@", "")
    .replace(".", "");

  console.log(clean_UserEmail);

  useEffect(() => {
    const fetchInbox = async () => {
      const response = await fetch(
        `https://mailbox-client-a1bb4-default-rtdb.firebaseio.com/${clean_UserEmail}/inbox.json`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      for (const key in data) {
        dispatch(
          inboxActions.getInbox({
            id: key,
            from: data[key].from,
            message: data[key].message,
            subject: data[key].subject,
            to: data[key].to,
          })
        );
      }
    };

    fetchInbox();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(
      `https://mailbox-client-a1bb4-default-rtdb.firebaseio.com/${clean_UserEmail}/inbox/${id}.json`,
      {
        method: "DELETE",
      }
    );

    dispatch(inboxActions.deleteFromInbox(id));
    console.log(response);
  };

  return (
    <div className="table-responsive mt-3">
      <table className="table email-table no-wrap table-hover v-middle mb-0 font-14">
        <thead>
          <tr>
            <th>Received From</th>
            <th>Subject</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inbox.map((mail) => (
            <tr key={mail.id}>
              <td>
                <span className="mb-0 text-muted">{mail.from}</span>
              </td>
              <td>
                <Button
                  variant="link"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleShow(mail)}
                >
                  {mail.subject}
                </Button>
              </td>
              <td className="text-muted">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(mail.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {show && (
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Sender: <span></span>
                <u>
                  <span>{selectedData.from}</span>
                </u>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{selectedData.message}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Inbox;
