const SubmitButton = ({ text, className, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`w-full mt-2 p-3 text-white font-semibold rounded-lg shadow-md transition-all duration-500 bg-gradient-to-tl from-blue-600 to-blue-600 via-cyan-400 bg-size-200 bg-pos-0 hover:bg-pos-100 ${className}`}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
