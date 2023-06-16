import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateY(-10rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  background-color: #f2f2f2;
  animation: ${slideIn} 1s ease-in-out; 
`;

const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 0;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-top: 0;
`;

const Text = styled.p`
  font-size: 1.5rem;
  margin-top: 1px;
  text-align: center;
`;

const LinkWrapper = styled.div`
  margin-top: 2rem;
`;

const StyledLink = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  color: #fff;
  background-color: #0077c2;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgb(248 113 113);
    color: #fff;
    transform: translateY(-0.2rem);
  }
`;

const PageNotFound = () => {
  return (
    <NotFoundWrapper>
      <Title>404</Title>
      <Subtitle>Page not found</Subtitle>
      <Text>The page you are looking for is not found</Text>
      <LinkWrapper>
        <StyledLink to="/">Back to home</StyledLink>
      </LinkWrapper>
    </NotFoundWrapper>
  );
};

export default PageNotFound; 

