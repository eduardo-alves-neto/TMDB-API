import React from "react";
import styled from "styled-components";

const ButtonSearch = styled.button`
  background: #007bff;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid lightblue;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: deepskyblue;
    border-color: deepskyblue;
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 100;
  border-bottom: 1px solid lightgray;
`;

const Main = styled.main`
  height: calc(100vh - 100px);
  overflow-y: auto;
  margin-top: 100px; /* Add this line to push the main content below the header */
`;

export const LayoutPrimary = ({ title, children }) => {
  return (
    <>
      <Header>
        <div className="container p-3">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-between">
              <h1 className="text-left">{title}</h1>
              <nav className="navbar">
                <div className="container-fluid">
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="...."
                      aria-label="Search"
                    />
                    <ButtonSearch type="submit">Pesquisar</ButtonSearch>
                  </form>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </Header>
      <Main>{children}</Main>
    </>
  );
};
