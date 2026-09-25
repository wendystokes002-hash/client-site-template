import type { Metadata } from "next";
import { Footer, Header } from "../components";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="section">
        <div className="wrap narrow prose">
          <h1>Privacy Policy</h1>
          <p>This page explains how {site.name} handles personal information collected through this website.</p>
          <h2>What we collect</h2>
          <p>
            If you contact us by email or phone, we receive the details you choose to share, such as your name, contact details and message. Our
            hosting provider may also log basic technical data (such as IP address and browser type) to keep the website secure.
          </p>
          <h2>How we use it</h2>
          <p>We use your information only to reply to you and provide the services you ask for. We do not sell your personal information.</p>
          <h2>How long we keep it</h2>
          <p>We keep enquiries only as long as needed to respond and for our normal business records.</p>
          <h2>Your choices</h2>
          <p>
            You can ask us to access, correct or delete your information at any time
            {site.email ? (
              <>
                {" "}
                by emailing <a href={`mailto:${site.email}`}>{site.email}</a>
              </>
            ) : null}
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
