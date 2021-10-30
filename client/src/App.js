import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
function App() {
  const [data, setData] = useState(null);
  useEffect(() => {

  }, [data]);
  const onHandleSubmit = (e) => {
    console.log(e.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      axios.post('http://localhost:8000/create', { name: e.target.files[0].name, dataUri: reader.result }).then((response) => {
        console.log(response);
        setData(response.data.hash);
      }).catch((err) => {
        console.log(err);
      });
    };
    reader.onerror = error => { };
  }
  if (data != null) {
    return <><h1>{data}</h1></>;
  }
  return (
    <div className="App">
      <input type="file" onChange={onHandleSubmit} />
    </div>
  );
}

export default App;
