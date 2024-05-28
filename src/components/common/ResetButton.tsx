import "./ResetButton.scss";

interface ResetButtonProps {
  onClick: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
  return (
    <div className="reset-button">
      <button className="reset-icon" onClick={onClick}>
        <img src="./buttons/icon-rotate-cw.png" alt="초기화" className="" />
      </button>
      <div className="reset-text">초기화</div>
    </div>
  );
};

export default ResetButton;
