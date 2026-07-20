//Library imports
import { useState } from 'react'
import React from 'react'
import './App.css'
import axios from 'axios'

function App() {
  //State variables for user input fields
  const [sepalLength, setSepalLength] = useState('')
  const [sepalWidth, setSepalWidth] = useState('')
  const [petalLength, setPetalLength] = useState('')
  const [petalWidth, setPetalWidth] = useState('')

  //State variable to store prediction from API
  const [result, setResult] = useState(null)

  //function to send flower measurments to Flask API and get prediction
  const handlePredict = async () => {
  const response = await axios.post(
    "http://127.0.0.1:5000/predict",
    {
      sepal_length: sepalLength,
      sepal_width: sepalWidth,
      petal_length: petalLength,
      petal_width: petalWidth
    }
  )

  console.log(response.data)

  //Save API response to state
  setResult(response.data)
}
  return (
    <div className='container'>
      {/*App title */}
      <h1>Iris Flower Classifier</h1>

      {/*Sepal length input */}
      <div className="form-group">
        <label>Sepal Length:</label>
        <input
          type="number"
          value={sepalLength}
          onChange={(e) => setSepalLength(e.target.value)}
        />
      </div>

      {/*Sepal Width input */}
      <div className="form-group">
        <label>Sepal Width:</label>
        <input
          type="number"
          value={sepalWidth}
          onChange={(e) => setSepalWidth(e.target.value)}
        />
      </div>

      {/*Petal length input */}
      <div className="form-group">
        <label>Petal Length:</label>
        <input
          type="number"
          value={petalLength}
          onChange={(e) => setPetalLength(e.target.value)}
        />
      </div>

      {/*Petal Width input */}
      <div className="form-group">
        <label>Petal Width:</label>
        <input
          type="number"
          value={petalWidth}
          onChange={(e) => setPetalWidth(e.target.value)}
        />
      </div>

      {/*Trigger prediction request */}
      <button onClick={handlePredict}>
         Predict</button>

         {/*Display prediction result when available */}
         {result && (
        <div className='result'>
        <h2>Prediction: {result.prediction}</h2>
        <h2>Confidence: {result.Confidence}</h2>
      </div>
      )}
    </div>
    )
}

export default App