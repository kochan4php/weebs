import PropTypes from "prop-types";

const Button = ({ children, onClick, bgcolor, width }) => (
  <button
    className={`px-7 py-1.5 rounded text-slate-5 active:ring active:ring-sky-500 hover:border-sky-500 border-2 border-transparent transition-all duration-300 selection:bg-orange-500 selection:text-orange-900 text-lg md:text-xl ${bgcolor} ${width}`}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.defaultProps = {
  bgcolor: "bg-slate-900",
  width: "w-full",
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  bgcolor: PropTypes.string,
  width: PropTypes.string,
};

export default Button;
