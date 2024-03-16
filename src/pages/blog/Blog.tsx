import React from "react";
import { Link } from "react-router-dom";
import MetaData from "../../misc/MetaData";
import styled from "styled-components";
import Footer from "../../components/Footer";

interface Article {
  title: string;
  author: string;
  content: string;
  image: string;
}

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const { title, author, content, image } = article;

  return (
    <ArticleCardWrapper>
      <MetaData title={title} />
      <ArticleImage src={image} alt={title} />
      <Title>{title}</Title>
      <Author>By {author}</Author>
      <Content>{content.substring(0, 150)}...</Content>
      <ReadMoreLink to={`/article/${title}`}>{"Read More >>"}</ReadMoreLink>
    </ArticleCardWrapper>
  );
};

const ArticleCardWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ededed;
  padding: 10px;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 10px;
`;

const Author = styled.p`
  color: #4d4d4d;
  font-size: 0.8rem;
`;

const Content = styled.p`
  color: gray;
  font-size: 1rem;
  line-height: 1.6;
`;

const ReadMoreLink = styled(Link)`
  display: inline-block;
  color: #007bff;
  text-decoration: none;
  margin-top: 10px;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

const BlogContainer = styled.div`
  max-width: 800px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  gap: 10px;
`;

const Blog: React.FC = () => {
  return (
    <>
      <MetaData title="Blog" />
      <BlogContainer>
        <h2>Articles</h2>
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </BlogContainer>
      <Footer />
    </>
  );
};

export default Blog;

const articles: Article[] = [
  {
    title: "The Importance of React in Modern Web Development",
    author: "John Doe",
    content:
      "React has become a fundamental tool for building interactive and dynamic user interfaces...",
    image: "https://via.placeholder.com/800x400",
  },
  {
    title: "Getting Started with Styled Components",
    author: "Jane Smith",
    content:
      "Styled Components is a powerful library that allows you to write CSS directly in your JavaScript files...",
    image: "https://via.placeholder.com/800x400",
  },
  {
    title: "TypeScript: A Safer Way to Write JavaScript",
    author: "Alex Johnson",
    content:
      "TypeScript adds static typing to JavaScript, which helps catch errors before they occur...",
    image: "https://via.placeholder.com/800x400",
  },
];
