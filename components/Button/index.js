const Button = ({ children, onClick, bgcolor }) => (
  <div className="container flex justify-start mb-4 lg:px-0">
    <button
      className={`px-7 py-2 rounded-md text-slate-5 bg-slate-900 hover:border-sky-500 border-2 border-transparent transition-all duration-300 ${
        bgcolor ?? "bg-slate-800"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  </div>
);

export default Button;
