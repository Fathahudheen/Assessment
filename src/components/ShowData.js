import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Assessment from "../services/Assessment";

const ShowData = () => {
  const [posts, setPosts] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  // console.log(posts);
  // const fetchPosts = async () => {
  //   const response = await Assessment.getPosts();
  //   setPosts(response.data || []);
  // };
  const fetchPosts = async () => {
    try {
      const response = await Assessment.getPosts();
      console.log("API Response:", response);
      if (response.data.success === true) {
        setPosts(response.data.data || []);
      } else {
        console.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  const handleOptionChange = (postId, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [postId]: selectedOption,
    });  };

  const calculateScore = async () => {
    let newScore = 0;

Object.keys(selectedAnswers).forEach((postId) => {
    const selectedOption = selectedAnswers[postId];
    const post = posts.find((p) => p._id === postId);

    if (post) {
      const isCorrect1 = post.isCorrect1;
      const isCorrect2 = post.isCorrect2;
      const isCorrect3 = post.isCorrect3;
      const isCorrect4 = post.isCorrect4;

      const selectedIsCorrect =
        (isCorrect1 && selectedOption === post.option1) ||
        (isCorrect2 && selectedOption === post.option2) ||
        (isCorrect3 && selectedOption === post.option3) ||
        (isCorrect4 && selectedOption === post.option4);

      if (selectedIsCorrect) {
        newScore += 1;
      } else {
        newScore -= 2.5;
      }
    }
  });

    setScore(newScore);
    try {
      const response = await Assessment.postScore({ score: newScore });
            if (response.data.success === true) {
        console.log("Score posted successfully");
      } else {
        console.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error posting score:", error.message);
    }
  };
  const handleNext = () => {
    calculateScore();

    if (currentQuestionIndex < posts.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
    {Array.isArray(posts) && posts.length > 0 ? (
        <div>
          {!showScore ? (
          <div key={posts[currentQuestionIndex]._id}>
            <h3>{posts[currentQuestionIndex].question}</h3>
            <label>
              <input
                type="radio"
                name={`option_${posts[currentQuestionIndex]._id}`}
                value={posts[currentQuestionIndex].option1}
                onChange={() =>
                  handleOptionChange(
                    posts[currentQuestionIndex]._id,
                    posts[currentQuestionIndex].option1
                  )
                }
              />
              {posts[currentQuestionIndex].option1}
            </label>
            <br />
            <label>
              <input
                type="radio"
                name={`option_${posts[currentQuestionIndex]._id}`}
                value={posts[currentQuestionIndex].option2}
                onChange={() =>
                  handleOptionChange(
                    posts[currentQuestionIndex]._id,
                    posts[currentQuestionIndex].option2
                  )
                }
              />
              {posts[currentQuestionIndex].option2}
            </label>
            <br />
            <label>
              <input
                type="radio"
                name={`option_${posts[currentQuestionIndex]._id}`}
                value={posts[currentQuestionIndex].option3}
                onChange={() =>
                  handleOptionChange(
                    posts[currentQuestionIndex]._id,
                    posts[currentQuestionIndex].option3
                  )
                }
              />
              {posts[currentQuestionIndex].option3}
            </label>
            <br />
            <label>
              <input
                type="radio"
                name={`option_${posts[currentQuestionIndex]._id}`}
                value={posts[currentQuestionIndex].option4}
                onChange={() =>
                  handleOptionChange(
                    posts[currentQuestionIndex]._id,
                    posts[currentQuestionIndex].option4
                  )
                }
              />
              {posts[currentQuestionIndex].option4}
            </label>
            <br />
            <Button onClick={handleNext}>Next</Button>
            </div>
          ) : (
            <div>
              <p>Score: {score}</p>
            </div>
          )}
        </div>
      ) : (
        <p>No posts available</p>
      )}
    </>
  );
};

export default ShowData;
