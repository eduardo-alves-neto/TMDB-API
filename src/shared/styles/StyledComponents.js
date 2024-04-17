import styled from "styled-components";

export const ButtonSearch = styled.button`
  background: #007bff;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid lightblue;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:disabled {
    background-color: #cccccc;
    color: #888888;
  }
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 100;
  border-bottom: 1px solid lightgray;
`;

export const Section = styled.section`
  height: calc(100vh - 100px);
  overflow-y: auto;
  margin-top: 100px; 
`;
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15rem;
  margin: 2rem 2rem 2rem 1rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CardImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

export const CardTitle = styled.h5`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const CardButton = styled.a`
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
`;

export const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: black;
`;
