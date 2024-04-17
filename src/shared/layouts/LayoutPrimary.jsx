import React from "react";
import { Header, Section, ButtonSearch } from "../styles/StyledComponents";
export const LayoutPrimary = ({ title, children }) => {
  return (
    <>
      <Header>
        <div className="container p-3">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-between">
              <h1 className="text-left">{title}</h1>
            </div>
          </div>
        </div>
      </Header>
      <main>
        <Section>{children}</Section>
      </main>
    </>
  );
};
