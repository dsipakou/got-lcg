import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import './DropableContainer.scss';

const DropableContainer = ({children}) => {
  return (
    <div className="dropable-container">
      {children}
    </div>
  )
}

export default DragDropContext(HTML5Backend)(DropableContainer);
