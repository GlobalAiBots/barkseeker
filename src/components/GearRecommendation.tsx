const items = [
  {
    name: "Collapsible Water Bowl",
    desc: "Portable and lightweight. Keep your pup hydrated at the park without lugging a heavy bowl.",
    link: "#",
  },
  {
    name: "Poop Bag Dispenser",
    desc: "Clips to your leash so you always have bags ready. Be a responsible park visitor.",
    link: "#",
  },
  {
    name: "Dog Tennis Ball Launcher",
    desc: "Throw farther with less effort. Perfect for wearing out high-energy dogs at the park.",
    link: "#",
  },
  {
    name: "Portable Dog Water Bottle",
    desc: "Built-in drinking trough so your dog can drink on the go. Great for parks without water stations.",
    link: "#",
  },
];

export default function GearRecommendation() {
  return (
    <div className="my-10">
      <h3 className="font-[Cabin] text-lg font-bold text-charcoal mb-4">Recommended Gear</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="font-bold text-charcoal text-sm">{item.name}</p>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs font-semibold text-bark hover:text-bark-dark transition"
            >
              &#9733; Our Pick &mdash; View on Amazon
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
