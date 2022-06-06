const TitleSection = ({ children, className, textCenter }) => (
  <div className={className ?? "mb-12 mt-8"}>
    <h1
      className={`text-sky-200 font-semibold text-2xl md:text-4xl ${
        textCenter ? "text-center" : ""
      }`}
    >
      {children}
    </h1>
  </div>
);

export default TitleSection;
