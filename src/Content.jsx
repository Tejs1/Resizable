import { useState, useEffect } from "react";
import { onSnapshot, doc, setDoc } from "firebase/firestore";

const Content = ({ name, id, fieldsCol }) => {
  const contentDoc = doc(fieldsCol, id);
  const [arr, setArr] = useState([]);
  const [updated, setUpdated] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [edit, setEdit] = useState("");
  const [text, setText] = useState("");
  const [showCount, setShowCount] = useState(false);

  const handleChange = (e) => {
    if (isEditable == false) return;
    setText(e.target.value);
  };

  const addHandler = () => {
    setIsEditable(true);
    setText("");
    setEdit("ADDINNG");
  };

  const updateHandler = () => {
    setIsEditable(true);
    setEdit("UPDATING");
  };

  const onSubmitHandler = () => {
    setIsEditable(false);
    if (edit === "ADDINNG") {
      //add data to new entry
      setDoc(contentDoc, { updated: updated, value: [...arr, text] });
    }
    if (edit === "UPDATING") {
      setUpdated(updated + 1); //add update time
      arr.pop(); //remove last element
      setDoc(contentDoc, { updated: updated + 1, value: [...arr, text] });
    }
  };

  useEffect(() => {
    onSnapshot(contentDoc, (snapshot) => {
      const data = snapshot.data();
      const arr = data.value;
      const lastEntry = arr[arr.length - 1];
      setUpdated(data.updated);
      setArr(arr);
      setText(lastEntry);
    });
  }, []);

  return (
    <section className="textarea">
      <textarea
        name={name}
        id={name}
        value={text}
        onChange={handleChange}
      ></textarea>
      <div className="actions">
        {isEditable ? (
          <button onClick={onSubmitHandler}>Submit</button>
        ) : (
          <button onClick={addHandler}>Add</button>
        )}
        {!isEditable ? <button onClick={updateHandler}>Update</button> : <></>}

        <button
          onMouseEnter={() => setShowCount(true)}
          onMouseLeave={() => setShowCount(false)}
        >
          Count
        </button>
      </div>
      {showCount && (
        <div className="count">
          <div className="wrapper">
            <h3> Added : {arr.length - 1}</h3>
            <h3>updated: {updated}</h3>
          </div>
        </div>
      )}
    </section>
  );
};
export default Content;
