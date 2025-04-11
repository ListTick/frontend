interface ButtonProps {
  onClickFunction: () => void;
  buttonText: string;
}

const Button: React.FC<ButtonProps> = ({ onClickFunction, buttonText }) => {
  return (
      <button onClick={onClickFunction}>
          {buttonText}
      </button>
  );
};

export default Button;
