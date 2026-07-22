export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>
          <strong>Not an official City of Portland website.</strong>{" "}
          This is an independent guide that points you to the city&apos;s real
          services. Always confirm details with the city.
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          Official site:{" "}
          <a
            className="link"
            href="https://www.portlandmaine.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            portlandmaine.gov
          </a>{" "}
          · Report a problem:{" "}
          <a
            className="link"
            href="https://seeclickfix.com/portland_2/report"
            target="_blank"
            rel="noopener noreferrer"
          >
            Portland 311
          </a>
        </p>
      </div>
    </footer>
  );
}
