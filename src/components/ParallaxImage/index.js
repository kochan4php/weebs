import PropTypes from "prop-types";
import Tilt from "react-parallax-tilt";

const ParallaxImage = ({ image, alt }) => (
  <div className="flex justify-center">
    <Tilt perspective={850} className="hidden lg:block">
      <img
        src={image}
        alt={alt}
        className="rounded shadow shadow-slate-800 w-2/3 md:w-4/5"
      />
    </Tilt>
    <img
      src={image}
      alt={alt}
      className="rounded shadow shadow-slate-800 w-2/3 md:w-4/5 lg:hidden"
    />
  </div>
);

ParallaxImage.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ParallaxImage;
