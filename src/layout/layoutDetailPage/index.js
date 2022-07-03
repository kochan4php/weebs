import PropTypes from "prop-types";
import { NavbarDetail } from "../../components";

// Layout detail page for anime and manga detail page
const LayoutDetailPage = ({ children, routes }) => (
  <section className="min-w-full bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 text-white py-3 min-h-screen">
    <NavbarDetail routes={routes} />
    <div>{children}</div>
  </section>
);

LayoutDetailPage.propTypes = {
  children: PropTypes.node.isRequired,
  routes: PropTypes.array.isRequired,
};

export default LayoutDetailPage;
