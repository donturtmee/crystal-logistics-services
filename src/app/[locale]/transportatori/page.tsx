export default function CarriersPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Header galben */}
      <header className="bg-amber-400">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Pentru Transportatori
          </h1>
          <p className="mt-1 text-sm font-medium">Crystal Logistics Services</p>
        </div>
      </header>

      {/* Formular Monday full width */}
      <section className="w-full">
        <div className="w-full overflow-hidden bg-white">
          <iframe
            title="Formular Transportatori — Crystal Logistics Services"
            src="https://forms.monday.com/forms/embed/60aa1511a28f92e49c82d858069a5522?r=euc1"
            className="block w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{
              height: "calc(100vh - 240px)",
              background: "transparent",
              border: "0",
              boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
            }}
            allow="clipboard-write; fullscreen"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-5xl px-6 pb-12 text-center">
        <p className="text-sm text-neutral-500">
          Întrebări? Scrie-ne la{" "}
          <a
            href="mailto:logistics@crystal-logistics-services.com"
            className="underline"
          >
            logistics@crystal-logistics-services.com
          </a>
          .
        </p>
      </footer>
    </main>
  );
}
