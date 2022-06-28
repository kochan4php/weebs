import PropTypes from "prop-types";

const Button = ({ children, onClick, bgcolor, fullWidth }) => (
  <button
    className={`px-7 py-1.5 rounded text-slate-5 focus:ring focus:ring-sky-500 hover:border-sky-500 border-2 border-transparent transition-all duration-300 selection:bg-orange-500 selection:text-orange-900 text-lg md:text-xl ${bgcolor} ${
      fullWidth ? "w-full" : ""
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.defaultProps = {
  bgcolor: "bg-slate-900",
  fullWidth: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  bgcolor: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default Button;
