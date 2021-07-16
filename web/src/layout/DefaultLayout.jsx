import Footer from "./partials/Footer";
import Header from "./partials/Header";

const DefaultLayout = ({ children }) => {
  return (
    <div className="default-layout">
      <header className="header">
        <Header />
      </header>
      <main className="main mt-2">{children}</main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default DefaultLayout;
