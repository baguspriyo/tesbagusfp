import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false)
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const objData = {
    imageUrl: imageUrl,
    captions: captions,
    createdAt: "2022-12-12",
    updatedAt: "2022-12-12",
    secret: "password",
    id: id
  }

  const editPhoto = async (e) => {
    e.preventDefault()
      const response = await fetch(`https://gallery-app-server.vercel.app/photos`, {
        method:"PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(objData)
      })
      navigate("/photos")
  };

  const detailPhoto = async (id) => {
    try{
      const url = `https://gallery-app-server.vercel.app/photos`
      const response = await fetch(url)
      const data = await response.json()
      setImageUrl(data.imageUrl)
      setCaptions(data.captions)
    }catch(e){
      setError(e)
    }
  }


  useEffect(() => {
    setLoading(true);
    detailPhoto(id)
    setLoading(false)
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit" onClick={() => setSubmit(true)}/>
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;