import React, { useContext} from 'react';
import noteContext from "../context/notes/noteContext"

const Noteitem = (props) => {

    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note, updateNote,} = props;

    return <div className="col-md-3 my-3"  >
        <div className="card" key={note._id} style={{height:"150px",opacity:"0.9",boxShadow: '9px 9px 9px grey',backgroundColor: 'rgb(227 236 243)'}}>
            <div className="card-body" style={{position:'relative'}}>
                <h5 className="card-title" key={note._id}>{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i style={{position:'absolute',bottom:'10px'}} className="fas fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("primary","Note deleted successfully!")  } }></i>
                <i style={{position:'absolute',bottom:'10px',left:'50px'}} className="fas fa-user-edit mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
        </div>
    </div>;
};

export default Noteitem;


