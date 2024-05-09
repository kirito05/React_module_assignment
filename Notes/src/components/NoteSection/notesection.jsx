import { useState, useEffect, useCallback, useContext } from "react"
import HomePage from "../../pages/HomePage"
import MyContext from "../../context"
import { nanoid } from "nanoid"
import { BiSolidSend } from "react-icons/bi"
import { IoMdArrowRoundBack } from "react-icons/io"
import styles from "./notesection.module.css"



function NoteSection() {
  const{
    currentGroup,
    hide,
    setHide,
    isMobile,
    noteHeadings,
    setNoteHeadings,
  }=useContext(MyContext)

  const {name, color, letters} = currentGroup
  const [noteText, setNoteText] = useState("")
  const [notes, setNotes] = useState(currentGroup.notes)
  const addNotes = useCallback(() => {
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const currentShowDate = currentDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const newNote = {
      text: noteText,
      date: currentShowDate,
      time: currentTime,
    };
    setNotes((prev) => [...prev, newNote]);

    const updateNoteHeadings = noteHeadings.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          notes: [...item.notes, newNote],
        };
      }
      return item;
    });
    setNoteHeadings(updateNoteHeadings);
    setNoteText("")
  }, [noteText, noteHeadings, name, setNoteHeadings])

  useEffect(()=>{
    setNotes(currentGroup.notes);
  },[currentGroup.notes])

  useEffect(()=>{
    localStorage.setItem("notes", JSON.stringify(noteHeadings));

  },[noteHeadings])

  useEffect(()=>{
    function handleKeyDown(e){
      if(e.key === "Enter"){
        if(noteText.trim() !== ""){
          addNotes();
        }
      }
    
  }

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
  
},[noteText, addNotes]);

if(!currentGroup && !isMobile){
  return <HomePage/>
}

  return (
    <div
      className={`${styles.container} ${!hide && isMobile && styles.hidden}`}
    >
      <div className={styles.header}>
        {isMobile && (
          <div onClick={() => setHide(isMobile && false)}>
            <IoMdArrowRoundBack size="1.25rem" />
          </div>
        )}
        <div>
          <div className={styles.icon} style={{ backgroundColor: color }}>
            {letters}
          </div>

          <div>{name}</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.notes}>
          {notes &&
            notes.map((note) => {
              return (
                <div className={styles.note} key={nanoid()}>
                  <div className={styles.dateTime}>
                    <div className={styles.time}>{note.time}</div>
                    <div className={styles.date}>{note.date}</div>
                  </div>
                  <div className={styles.noteContent}>{note.note}</div>
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.input}>
        <textarea
          cols="10"
          rows="10"
          placeholder="Enter your text here"
          value={noteText}
          onChange={(e) => {
            // if (e.target.value.trim() !== "") {
              setNoteText(e.target.value);
            // }
          }}
        ></textarea>
        <div onClick={addNotes}>
          <BiSolidSend style={{ color: "#ABABAB" }} size="1.25rem" />
        </div>
      </div>
    </div>
  );
}

export default NoteSection