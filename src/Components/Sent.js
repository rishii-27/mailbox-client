import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sentActions } from "../Redux/sent";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Sent = () => {
  const dispatch = useDispatch();
  const sent = useSelector((state) => state.sent.sent);
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

  const clean_UserEmail = localStorage
    .getItem("email")
    .replace("@", "")
    .replace(".", "");

  useEffect(() => {
    const fetchSent = async () => {
      const response = await fetch(
        `https://mailbox-client-a1bb4-default-rtdb.firebaseio.com/${clean_UserEmail}/send.json`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      for (const key in data) {
        dispatch(
          sentActions.getSent({
            id: key,
            from: data[key].from,
            message: data[key].message,
            subject: data[key].subject,
            to: data[key].to,
          })
        );
      }
    };

    fetchSent();
  }, [dispatch, clean_UserEmail]);

  return (
    <div className="table-responsive mt-3">
      <table className="table email-table no-wrap table-hover v-middle mb-0 font-14">
        <thead>
          <tr>
            <th>Sent To</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {sent.map((mail) => (
            <tr key={mail.id}>
              <td>
                <span className="mb-0 text-muted">{mail.to}</span>
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
                <span>{mail.message}</span>
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

export default Sent;
