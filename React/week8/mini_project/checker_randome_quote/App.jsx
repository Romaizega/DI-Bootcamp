import { useState } from "react"
import quotes from './QuotesDatabase'
import colors from './Colors'

const Quotes = () => {
  const getRandomeQuote = ()=> {
    const index = Math.floor(Math.random() * quotes.length)
    const randomQuotes = quotes[index]
    return randomQuotes

  }
  
  const getRandomeColor = () => {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
  }

  const [quote, setQuote] = useState(getRandomeQuote())
  const [color, setColor] = useState()

  const handleClick = () => {
    setQuote(getRandomeQuote())
    setColor(getRandomeColor())
  }


  return (
    <>
      <div  
        style={{
        backgroundColor: color,
        transition: "0.5s",
  
        }}>
      <p>{quote.quote}</p>
      <p>--{quote.author}--</p>
      <button onClick={handleClick} style={{ backgroundColor: color}}>Change</button>
      </div>

    </>
  )
}

export default Quotes