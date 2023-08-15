import React, { useEffect, useState } from "react";
import styles from "./create.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateTab } from "../../stores/tabs";
import { getProfileInformations } from "../../functions/profile/GetProfileInformations";
import CheckBox from "../checkBox/CheckBox";
import axios from "axios";

const Create = () => {
  const dispatch = useDispatch();
  const [svgColor, setSvgColor] = useState("black");
  const [selectedFile, setSelectedFile] = useState(null);
  const [finishing, setFinishing] = useState(false);
  const { id } = useSelector((state) => state.userInformations);
  const [profileInformations, setProfileInformations] = useState(null);
  const [captionText, setCaptionText] = useState("");
  const [locationText, setLocatinoText] = useState("");
  const [advancedSettingsVisible, setAdvancedSettingsVisible] = useState(false);
  const [interactionVisibility, setInteractionVisibility] = useState(false);
  const [commenting, setCommenting] = useState(false);

  const share = async () => {
    let formData = new FormData();

    formData.append("id", id);
    formData.append("post", selectedFile);
    formData.append("captionText", captionText);
    formData.append("locationText", locationText);
    formData.append("interactionVisibility", interactionVisibility);
    formData.append("commenting", commenting);

    await axios.post("http://localhost:8080/dataBase/posts/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(closeCreateTab());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getProfileInformations(id));
        setProfileInformations(response.checkData ? response : null);
      } catch (error) {
        console.error("Error fetching profile information:", error);
        setProfileInformations(null);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const handleClose = () => {
    dispatch(closeCreateTab());
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFinishing(true);
    setSvgColor("black");
  };

  const handleSelectClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*, video/*";
    fileInput.addEventListener("change", handleFileChange);
    fileInput.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setSvgColor("rgb(0, 149, 246)");
  };
  const handleDragLeave = (event) => {
    setSvgColor("black");
  };

  const handleDrop = (event) => {
    setSvgColor("black");
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFinishing(true);
    setSelectedFile(file);
  };

  const captionTextInput = (e) => {
    const inputText = e.target.value;

    if (inputText.length <= 2200) {
      setCaptionText(inputText);
    }
  };
  const handleAdvancedSettings = () => {
    setAdvancedSettingsVisible(!advancedSettingsVisible);
    console.log(advancedSettingsVisible);
  };

  const inputLocationText = (e) => {
    setLocatinoText(e.target.value);
  };

  return (
    <div>
      <div className={styles.background} onClick={handleClose}></div>
      {finishing ? (
        <div className={styles.finishing}>
          <div className={styles.header}>
            <div
              className={styles.turnBack}
              onClick={() => {
                setFinishing(false);
                setCaptionText("");
                setLocatinoText("");
                setInteractionVisibility(false);
                setCommenting(false);
                setAdvancedSettingsVisible(false);
              }}
            >
              <svg
                aria-label="Geri"
                color="rgb(0, 0, 0)"
                fill="rgb(0, 0, 0)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Geri</title>
                <line
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  x1="2.909"
                  x2="22.001"
                  y1="12.004"
                  y2="12.004"
                ></line>
                <polyline
                  fill="none"
                  points="9.276 4.726 2.001 12.004 9.276 19.274"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></polyline>
              </svg>
            </div>
            <div className={styles.title}>Yeni Gönderi Oluştur</div>
            <div onClick={share} className={styles.share}>
              Paylaş
            </div>
          </div>

          <div className={styles.finishingBody}>
            <div className={styles.left}>
              <img
                className={styles.post}
                src={URL.createObjectURL(selectedFile)}
                alt=""
              />
            </div>
            <div className={styles.right}>
              <div className={styles.profile}>
                <div
                  className={styles.profilePhoto}
                  style={{
                    backgroundImage: `url(${profileInformations.profilePhoto})`,
                  }}
                ></div>
                <div className={styles.username}>
                  {profileInformations.username}
                </div>
              </div>
              <div className={styles.caption}>
                <textarea
                  onChange={captionTextInput}
                  className={styles.captionText}
                  placeholder="Açıklama yaz..."
                  value={captionText}
                />
                <div className={styles.captionTextLimit}>
                  {captionText.length}/2200
                </div>
              </div>
              <div className={styles.other}>
                <div className={styles.location}>
                  <input
                    type="text"
                    placeholder="Konum Ekle"
                    className={styles.locationText}
                    value={locationText}
                    onChange={inputLocationText}
                  />
                  <svg
                    className={styles.locationSvg}
                    aria-label="Konum ekle"
                    color="black"
                    fill="black"
                    height="16"
                    role="img"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <title>Konum ekle</title>
                    <path d="M12.053 8.105a1.604 1.604 0 1 0 1.604 1.604 1.604 1.604 0 0 0-1.604-1.604Zm0-7.105a8.684 8.684 0 0 0-8.708 8.66c0 5.699 6.14 11.495 8.108 13.123a.939.939 0 0 0 1.2 0c1.969-1.628 8.109-7.424 8.109-13.123A8.684 8.684 0 0 0 12.053 1Zm0 19.662C9.29 18.198 5.345 13.645 5.345 9.66a6.709 6.709 0 0 1 13.417 0c0 3.985-3.944 8.538-6.709 11.002Z"></path>
                  </svg>
                </div>
                <div className={styles.accessibility}>
                  <p className={styles.settingsText}>Erişebilirlik</p>{" "}
                  <svg
                    className={styles.arrow}
                    aria-label="Aşağı Ok Simgesi"
                    color="rgb(0, 0, 0)"
                    fill="rgb(0, 0, 0)"
                    height="16"
                    role="img"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <title>Aşağı Ok Simgesi</title>
                    <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                  </svg>
                </div>
                <div
                  className={styles.advancedSettingTitle}
                  onClick={handleAdvancedSettings}
                  style={
                    advancedSettingsVisible ? { borderBottom: "none" } : null
                  }
                >
                  <p
                    className={styles.settingsText}
                    style={advancedSettingsVisible ? { fontWeight: 600 } : null}
                  >
                    Gelişmiş Ayarlar
                  </p>
                  <svg
                    className={styles.arrow}
                    style={
                      advancedSettingsVisible ? { transform: "scale(1)" } : null
                    }
                    aria-label="Aşağı Ok Simgesi"
                    color="rgb(0, 0, 0)"
                    fill="rgb(0, 0, 0)"
                    height="16"
                    role="img"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <title>Aşağı Ok Simgesi</title>
                    <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                  </svg>
                </div>
                {advancedSettingsVisible ? (
                  <div className={styles.advancedSettings}>
                    <div className={styles.interactionVisibility}>
                      <div className={styles.advancedSettingsHeader}>
                        <div className={styles.advancedSettingsTitle}>
                          Bu gönderideki beğenme ve görüntüleme sayılarını gizle
                        </div>
                        <div className={styles.advancedSettingsCheckBox}>
                          <CheckBox
                            value={interactionVisibility}
                            setValue={setInteractionVisibility}
                          />
                        </div>
                      </div>
                      <div className={styles.advancedSettingsText}>
                        Sadece sen bu gönderideki toplam beğenme ve görüntüleme
                        sayısını göreceksin. Daha sonra bunu değiştirmek
                        istersen, gönderinin en üstündeki ⋮ menüsüne
                        gidebilirsin. Diğer kişilerin gönderilerindeki beğenme
                        sayısını gizlemek için hesap ayarlarına git. Daha fazla
                        bilgi al
                      </div>
                    </div>
                    <div className={styles.commenting}>
                      <div className={styles.advancedSettingsHeader}>
                        <div className={styles.advancedSettingsTitle}>
                          Yorum yapmayı kapat
                        </div>
                        <div className={styles.advancedSettingsCheckBox}>
                          <CheckBox
                            value={commenting}
                            setValue={setCommenting}
                          />
                        </div>
                      </div>
                      <div className={styles.advancedSettingsText}>
                        Bunu daha sonra gönderinin başındaki ... menüsüne
                        giderek değiştirebilirsin.
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.main}>
          <div className={styles.title}>Yeni Gönderi Oluştur</div>
          <div
            className={styles.body}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <svg
              color={svgColor}
              fill="rgb(0, 0, 0)"
              height="77"
              role="img"
              viewBox="0 0 97.6 77.3"
              width="96"
            >
              <path
                d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                fill="currentColor"
              ></path>
              <path
                d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                fill="currentColor"
              ></path>
              <path
                d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                fill="currentColor"
              ></path>
            </svg>
            <div className={styles.text}>
              <p>Fotoğrafları ve videoları buraya sürükle</p>
            </div>
            <div className={styles.button} onClick={handleSelectClick}>
              Bilgisayardan Seç
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
