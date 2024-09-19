import React from 'react'

// Komponent som visar ett felmeddelande. Texten visas i rött för att tydliggöra att det är ett fel.
const Error = ({ message }) => {
  return <div style={{ color: 'red' }}>{message}</div>
}

export default Error