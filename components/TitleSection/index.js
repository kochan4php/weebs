const TitleSection = ({ children, className, textCenter, fontSize }) => (
  <div className={className ?? "mb-12 mt-8"}>
    <h1
      className={`text-sky-200 font-semibold ${fontSize} ${
        textCenter ? "text-center" : ""
      }`}
    >
      {children}
    </h1>
  </div>
);

export default TitleSection;
