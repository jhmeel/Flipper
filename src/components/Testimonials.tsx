import React from "react";
import styled from "styled-components";

interface Testimonial {
  id: number;
  name: string;
  message: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    message:
      "The investment plans on this platform are exceptional. I've experienced consistent and high returns that have exceeded my expectations.",
    avatar: "john-avatar.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    message:
      "This platform has truly transformed my financial journey. The legitimacy of the investment options and the remarkable ROI make it a standout choice.",
    avatar: "jane-avatar.jpg",
  },
  {
    id: 3,
    name: "Alex Johnson",
    message:
      "I highly recommend this platform for anyone seeking secure and profitable investments. The results are impressive, and the support team is outstanding.",
    avatar: "alex-avatar.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    message:
      "Being a part of this platform has been a game-changer for me. The investment plans are transparent, and the consistent high ROI has provided financial stability.",
    avatar: "emily-avatar.jpg",
  },
  {
    id: 5,
    name: "Chris Williams",
    message:
      "I've explored various investment platforms, and this one stands out. The high ROI, coupled with the platform's legitimacy, makes it a reliable choice for long-term investors.",
    avatar: "chris-avatar.jpg",
  },
];

const Testimonials: React.FC = () => {
  return (
    <TestimonialsWrapper>
      <TestimonialsContainer>
        <TestimonialsList>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} index={index}>
              <Avatar
                src={testimonial.avatar}
                alt={`${testimonial.name}'s Avatar`}
              />
              <TestimonialContent>
                <TestimonialMessage>{testimonial.message}</TestimonialMessage>
                <TestimonialAuthor>- {testimonial.name}</TestimonialAuthor>
              </TestimonialContent>
            </TestimonialCard>
          ))}
        </TestimonialsList>
      </TestimonialsContainer>
    </TestimonialsWrapper>
  );
};

const TestimonialsWrapper = styled.section`
  width: 100%;
  overflow: hidden;
`;

const TestimonialsContainer = styled.div`
  display: flex;
`;

const TestimonialsList = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TestimonialCard = styled.div<{ index: number }>`
  max-width: 300px;
  min-width: 300px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #ededed;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const TestimonialContent = styled.div`
  flex: 1;
`;

const TestimonialMessage = styled.p`
  font-size: 12px;
  color: #333;
`;

const TestimonialAuthor = styled.p`
  font-size: 1rem;
  color: #666;
  margin-top: 10px;
`;

export default Testimonials;
