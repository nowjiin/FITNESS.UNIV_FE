import React, { useState, useEffect, useRef, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./Reviews.scss";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastReviewElementRef = useRef<HTMLDivElement | null>(null);

  const initialReviews = Array.from({ length: 10 }).map((_, i) => ({
    user: `User ${i}`,
    location: "Location",
    rating: 5.0,
    content: "This is a sample review. The review content goes here.",
  }));

  const fetchMoreData = useCallback(() => {
    setReviews((prevReviews) => [...prevReviews, ...initialReviews]);
  }, [initialReviews]);

  useEffect(() => {
    setReviews(initialReviews);
  }, []);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMoreData();
      }
    });

    if (lastReviewElementRef.current) {
      observer.current.observe(lastReviewElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [fetchMoreData]);

  return (
    <Container fluid className="p-5 bg-gray-100 reviews-container">
      <h2 className="text-center mb-4 responsive-text">
        멘토 · 멘티님들이 직접 작성한 트레이닝후기
      </h2>
      <p className="text-center mb-5">
        실제 수업 후 작성된 100% 리얼 후기를 보고 원하는 트레이너와 수업을 보다
        쉽고, 빠르게 찾을 수 있어요.
      </p>
      <div
        className="scroll-container d-flex overflow-auto"
        style={{ height: "300px" }}
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            className="review-card-container"
            ref={index === reviews.length - 1 ? lastReviewElementRef : null}
          >
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
      </div>
    </Container>
  );
};

export default Reviews;
