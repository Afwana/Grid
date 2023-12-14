import './App.css';
import { useRef, useState } from 'react'
// useState : for managing state
// useRef : for creating references in functional components

function App() {
  // creates a 2D array (gridData) to represent the grid. It uses Array.from to create an array with a length of 10, and for each element, it creates another array of length 10, filled with null.
  const gridData = Array.from({ length: 10 }, () => Array(10).fill(null));
  // initialise a state variable, it will keep track of the button's position n the grid
  const [buttonPosition,setButtonPosition] = useState({row:0,column:0})
  // initializes a ref, it will be used to get the button's bounding rectangle
  const buttonRef = useRef(null)
  // to know whether the button is dragged or not
  const [isDragging,setIsDragging] = useState(false)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    // when the mouse button is pressed down on the button it makes dragging true
  }

  const handleMouseMove = (e) => {
    if(isDragging) {
      // calculate the new position of the button based on mouse movement
      const rect = buttonRef.current.getBoundingClientRect()
      const column = Math.floor((e.clientX - rect.width / 2) / rect.width)
      const row = Math.floor((e.clientY - rect.height / 2) / rect.height)

      setButtonPosition({row,column})
    }
  }

  const handleMouseUp = (e) => {
    setIsDragging(false)
    // when the mouse button is released and make dragging false
  }

  return (
      // container for the entire grid.
      <div className="grid-container" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}> 
      {/* uses the map function to iterate over each row in gridData. It returns a set of <div> elements representing the rows. */}
        {gridData.map((row, rowIndex) => (
          // represents a row in the grid.
          // The key attribute is used to uniquely identify each row
          <div key={rowIndex} className="grid-row">
            {/* uses the map function again to iterate over each cell in a row. It returns a set of <div> elements representing the cells. */}
            {row.map((cell, columnIndex) => (
              // represents a cell in the grid.
              // The key attribute is used to uniquely identify each cell
              <div key={columnIndex} className="grid-cell">
                {/* checks if the current cell's position (determined by rowIndex and columnIndex) matches the position of the button (buttonPosition.row and buttonPosition.column).  */}
                {rowIndex === buttonPosition.row && columnIndex === buttonPosition.column && (
                  <button
                    // this ref will be used to get the button's bounding rectangle
                    ref={buttonRef}
                    // onMouseDown attribute is set to the handleMouseDown function, which is called when the mouse button is pressed down on the button.
                    onMouseDown={handleMouseDown}
                    className="draggable-button"
                  >
                    Drag me
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
  );
}

export default App;
