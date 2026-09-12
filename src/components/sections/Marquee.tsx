import { Scissors } from "@/components/ui/Icons";

/*
 * The Jin & Ko band — one phrase repeated forever across a gold strip. Two
 * identical tracks sit side by side and the pair translates by exactly -50%,
 * so the loop closes with no seam and no JS. aria-hidden on the second copy
 * keeps a screen reader from hearing the phrase twice.
 */
const ITEMS = [
  "Walk-ins welcome",
  "Skin fades",
  "Hot towel shaves",
  "Beard sculpts",
  "Boys cuts",
  "Est. 1991",
  "190 Carlisle St",
];

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="marquee-track" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="marquee-item">
          {item}
          <Scissors size={16} />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-rail">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
