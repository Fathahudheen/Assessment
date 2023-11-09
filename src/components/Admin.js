import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Button,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import Assessment from "../services/Assessment";
import ShowData from "./ShowData";

const Admin = () => {
  const [isShow, invokeModal] = useState(false);
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [isCorrect1, setIsCorrect1] = useState(false);
  const [option2, setOption2] = useState("");
  const [isCorrect2, setIsCorrect2] = useState(false);

  const [option3, setOption3] = useState("");
  const [isCorrect3, setIsCorrect3] = useState(false);

  const [option4, setOption4] = useState("");
  const [isCorrect4, setIsCorrect4] = useState(false);

  const initModal = () => {
    return invokeModal(!isShow);
  };

  //form updation data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("question", question);
    formdata.append("option1", option1);
    formdata.append("option2", option2);
    formdata.append("option3", option3);
    formdata.append("option4", option4);
    formdata.append("isCorrect1", isCorrect1);
    formdata.append("isCorrect2", isCorrect2);
    formdata.append("isCorrect3", isCorrect3);
    formdata.append("isCorrect4", isCorrect4);

    const response = await Assessment.create(formdata);
    console.log(response);

    if (response.data.success === true) {
      setMessage("Post created Successfully");
    } else {
      setMessage("Post failed!");
    }
    setTimeout(() => {
      setMessage("");
    }, 2000);
    event.target.reset();
  };
  console.log(question);
  return (
    <>
      <Box sx={{marginLeft:'100px',marginTop:'30px'}}  >
        <div>
          <Button variant="contained" onClick={initModal}>
          Add +
        </Button>
          <Box sx={{paddingTop:'100px'}}>
            <Modal show={isShow}>
              <Modal.Header closeButton onClick={initModal}>
              {/* <Modal.Header> */}
                <Modal.Title>
                  <h2>Add Question</h2>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form action="" onSubmit={handleSubmit}>
                  <TextField
                    type="text"
                    name="question"
                    value={question}
                    placeholder="Enter question"
                    onChange={(event) => setQuestion(event.target.value)}
                  />
                  <br></br>
                  <label>
                    <TextField
                      type="text"
                      name="option1"
                      value={option1}
                      placeholder="option1"
                      onChange={(event) => setOption1(event.target.value)}
                      required
                    />
                    <label>
                      <input
                        type="radio"
                        name="isCorrect1"
                        checked={isCorrect1}
                        onChange={() => setIsCorrect1(!isCorrect1)}
                      />
                      True
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="isCorrect1"
                        checked={!isCorrect1}
                        onChange={() => setIsCorrect1(!isCorrect1)}
                      />
                      False
                    </label>
                  </label>
                  <br></br>
                  <label>
                    <TextField
                      type="text"
                      name="option2"
                      value={option2}
                      placeholder="option2"
                      onChange={(event) => setOption2(event.target.value)}
                      required
                    />
                    <label>
                      <input
                        type="radio"
                        name="isCorrect2"
                        checked={isCorrect2}
                        onChange={() => setIsCorrect2(!isCorrect2)}
                      />
                      True
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="isCorrect2"
                        checked={!isCorrect2}
                        onChange={() => setIsCorrect2(!isCorrect2)}
                      />
                      False
                    </label>
                  </label>
                  <br></br>
                  <label>
                    <TextField
                      type="text"
                      name="option3"
                      value={option3}
                      placeholder="option3"
                      onChange={(event) => setOption3(event.target.value)}
                      required
                    />
                    <label>
                      <input
                        type="radio"
                        name="isCorrect3"
                        checked={isCorrect3}
                        onChange={() => setIsCorrect3(!isCorrect3)}
                      />
                      True
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="isCorrect3"
                        checked={!isCorrect3}
                        onChange={() => setIsCorrect3(!isCorrect3)}
                      />
                      False
                    </label>
                  </label>
                  <br></br>
                  <label>
                    <TextField
                      type="text"
                      name="option4"
                      value={option4}
                      placeholder="option4"
                      onChange={(event) => setOption4(event.target.value)}
                      required
                    />
                    <label>
                      <input
                        type="radio"
                        name="isCorrect4"
                        checked={isCorrect4}
                        onChange={() => setIsCorrect4(!isCorrect4)}
                      />
                      True
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="isCorrect4"
                        checked={!isCorrect4}
                        onChange={() => setIsCorrect4(!isCorrect4)}
                      />
                      False
                    </label>
                  </label>
                  <br></br>

                  <Modal.Footer>
                    <Button variant="contained" onClick={initModal}>
                      close
                    </Button>
                    <Button type="submit" variant="contained">
                      Post
                    </Button>
                  </Modal.Footer>

                  <p>{message}</p>
                </form>
              </Modal.Body>
              {/* </form> */}
            </Modal>
          </Box>
        </div>
        {/* <Show Data /> */}
      </Box>
    </>
  );
};

export default Admin;
