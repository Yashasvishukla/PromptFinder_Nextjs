import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

// change the metadata of the applicaiton (SEO)

export const metadata = {
  title: "PromptFinder",
  description: "Find the perfect prompt for your next writing project."
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          {/* This is the main component which would be the first page */}
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
