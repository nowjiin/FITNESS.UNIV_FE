import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./Reviews.scss";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      const newReviews = Array.from({ length: 10 }).map((_, i) => ({
        id: (page - 1) * 10 + i,
        user: `User ${page}-${i}`,
        location: "Location",
        rating: 5.0,
        content: "This is a sample review. The review content goes here.",
      }));
      setReviews((prevReviews) => {
        // Loop back to the beginning if we've reached the end
        if (page >= 5) {
          return [...prevReviews, ...newReviews];
        } else {
          return [...prevReviews, ...newReviews];
        }
      });
      setPage(page >= 5 ? 1 : page + 1);
    }, 1500);
  };

  return (
    <Container fluid className="p-5 bg-gray-100 reviews-container">
      <h2 className="text-center mb-4 responsive-text">
        멘토 · 멘티님들이 직접 작성한 트레이닝후기
      </h2>
      <p className="text-center mb-5">
        실제 수업 후 작성된 100% 리얼 후기를 보고 원하는 트레이너와 수업을 보다
        쉽고, 빠르게 찾을 수 있어요.
      </p>
      <div id="scrollableDiv" className="scroll-container">
        <InfiniteScroll
          dataLength={reviews.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          className="d-flex"
        >
          {reviews.map((review) => (
            <div key={review.id} className="review-card-container">
              <Card className="review-card">
                <Card.Body>
                  <div className="d-flex align-items-center mb-2">
                    <div className="user-icon"></div>
                    <div>
                      <strong>{review.user}</strong> · {review.location}
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="rating">★ {review.rating.toFixed(1)}</span>
                  </div>
                  <Card.Text>{review.content}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </Container>
  );
};

export default Reviews;
