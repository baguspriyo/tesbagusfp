import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPhoto = async (e) => {
    try{
      e.preventDefault();

      // object berisi data yang akan dipost
      const makeData = {
        imageUrl,
        captions,
        createdAt: "2022-11-12",
        updatedAt: "2022-11-12", 
        secret
      }
      
      if(secret === "password"){ //pengecekan apakah secret yang dimasukkan bernilai password
        const response = await fetch("https://gallery-app-server.vercel.app/photos", { //fetch url
          method: "POST", //request API dengan method POST
          headers: {
            "Content-Type": "application/json" //value dari headers
          },
          body: JSON.stringify(makeData) //mengisi body dengan object makeData
        })
        navigate("/photos") //ketika berhasil di post akan mengalihkan halaman ke photos
      }else{
        setError("You are not authorized") //pesan eror
      }
    }catch(e){
      console.log(e)
    }
  };

  return (
    <>
      <div className="container">
      {error && <div className="error-msg">{error}</div>}
        <form className="add-form"  onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className="add-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="add-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="add-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;