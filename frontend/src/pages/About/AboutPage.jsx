const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <p className="text-xs uppercase tracking-[0.4em] text-black/40">About</p>
      <h1 className="text-4xl font-serif mt-3">The ChronoLux philosophy</h1>
      <p className="text-sm text-black/60 leading-relaxed mt-6">
        ChronoLux curates a select archive of luxury timepieces shaped by
        heritage, innovation, and uncompromising craftsmanship. We believe the
        best watches are quiet icons: designed to last, meant to be worn, and
        treasured across generations.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="bg-white border border-black/5 rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40">
            Authenticity
          </p>
          <p className="mt-2 text-sm text-black/60">
            Every piece is inspected and authenticated by trusted experts.
          </p>
        </div>
        <div className="bg-white border border-black/5 rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40">
            Concierge
          </p>
          <p className="mt-2 text-sm text-black/60">
            Personalized sourcing for collectors and bespoke client needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
