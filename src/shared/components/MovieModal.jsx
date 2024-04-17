import React from "react";
import { CardTitle, Description } from "../styles/StyledComponents";

export const MovieModal = ({ movie, index, submit }) => (
  <div
    className="modal fade"
    id={`staticBackdrop${index}`}
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <CardTitle
            style={{ color: "black" }}
            className="modal-title"
            id="staticBackdropLabel"
          >
            {movie.title}
          </CardTitle>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body" style={{ color: "black" }}>
          <Description>{movie.overview}</Description>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger"
            data-bs-dismiss="modal"
            onClick={() => submit(movie.id)}
          >
            Favoritar
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);
