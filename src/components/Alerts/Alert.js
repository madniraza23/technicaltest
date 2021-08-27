import "./Alert.css";
export default function Alert({bg, message, funcBtn1, funcBtn2, btn1Text, btn2Text }) {
//   () => {setShowSuccessAlert(false);};
// () => setCreatePost(false)
  return (
    <div className="successAlert">
      <div className="alertMessage">{message}</div>
      <div className="buttonsDiv">
        <div className='btn' onClick={funcBtn1}>
          {btn1Text}
        </div>
        <div className='btn' id={bg} onClick={funcBtn2}>
          {btn2Text}
        </div>
      </div>
    </div>
  );
}
