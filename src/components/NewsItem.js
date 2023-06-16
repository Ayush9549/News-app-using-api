import React from 'react'
// import blankimg from "./blankimg.jpg"

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <span className="position-absolute start-auto end-0  badge rounded-pill bg-danger" style={{bottom: '98%', zIndex: '1'}}> {!source ? "Unknown" : source}</span>
        <img src={!imageUrl ? 'blankimg.jpg' : imageUrl} className="card-img-top bg-dark" style={{height:'250px'}} alt="..." />
        <div className="card-body">
            <h5 className="card-title">{title}  </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></p>
            <div className="d-flex justify-content-center">
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
