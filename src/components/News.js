import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
    

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async() => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=03c728f9a998440882b71b82d1e38615&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect (() => {
  document.title = `${capitalizeFirstLetter(props.category)} - Dhada Dhad`;
    updateNews();
    //eslint-disable-next-line
  }, [])

  // const handlePreClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // }

  // const handleNextClick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=03c728f9a998440882b71b82d1e38615&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };

  return (
    <>
      <h1 className='text-center' style={{marginTop:'80px'}}>Dhada Dhad - {capitalizeFirstLetter(props.category)} Top News Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={  <Spinner />}
        scrollableTarget="scrollableDiv"
      >
        <div className="container my-5">
          <div className="row mt-3">
              {articles.map((element) => {
                  return <div className="col-md-4"  key={element.url}>
                      <NewsItem title={element.titile ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
              })}
          </div>
        </div>
      </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between mt-5">
            <button disabled={page <= 1} type="button" className="btn btn-primary" onClick={handlePreClick}>&larr; Previous</button>
            <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-primary" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
    </>
  )
}


News.defaultProops = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
