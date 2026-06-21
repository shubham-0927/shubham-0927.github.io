export default function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-caption text-muted">
          © {new Date().getFullYear()} Shubham Dewangan
        </p>
        <p className="text-caption text-muted">
          Designed & built with engineering intent
        </p>
      </div>
    </footer>
  );
}