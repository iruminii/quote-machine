import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useState } from 'react';



function QuoteContent({qText, qAuthor}) {
  return (
    <>
      <div className='quote-text'>
      <div className='quote-icon left'>
        <FontAwesomeIcon icon={faQuoteLeft} />
      </div>
      <p id="text">{qText}</p>
      <div className='quote-icon right'>
        <FontAwesomeIcon icon={faQuoteRight} />
      </div>
      </div>
      <div className='quote-author'>
        <p id="author">{qAuthor}</p>
      </div>
    </>
  )
}

function ButtonContent({qAuthor, qText, onButton}) {

  function newQuote() {
    onButton();
  }

  const regex = / /ig;
  let tweetLink = qText.replace(regex, '%20') + "%20--%20" + qAuthor.replace(regex, '%20');
  
  return (
    <>
      <div className='button-div'>
      <div className='share'>
        <a id="tweet-quote" href={"https://twitter.com/intent/tweet?text=" + tweetLink} target='_blank'><FontAwesomeIcon icon={faTwitter} /></a>
      </div>
      <div className='new-button'>
        <button id="new-quote" onClick={() => newQuote()}>
          New Quote
        </button>
      </div>
      </div>
    </>
  )
}

export default function QuotePage() {
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");

  async function fetchQuote() {
    fetch("https://api.quotable.io/random")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setQuoteText(data.content);
        setQuoteAuthor(data.author);
      })
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  function handleButton(tmp) {
    fetchQuote();
  }

  return (
    <>
      <div key={Math.random()} className='quote-container'>
        <QuoteContent qAuthor={quoteAuthor}  qText={quoteText}/>
        <ButtonContent qText={quoteText} qAuthor={quoteAuthor} onButton={handleButton} />
      </div>
    </>
  )
}