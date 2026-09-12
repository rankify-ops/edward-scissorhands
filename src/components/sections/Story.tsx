import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

/*
 * "Born From Tradition." — the second beat on Kings Domain, and the right place
 * for the client's own story copy. Text left, a two-photo cluster right, with
 * the smaller frame overlapping the larger one so the pair reads as one object
 * rather than a row of thumbnails.
 */
export function Story() {
  return (
    <section className="section" id="story">
      <div className="wrap story">
        <div className="story-copy">
          <Reveal className="eyebrow">Our Story</Reveal>
          <h2 className="display d-xl story-head">
            <Reveal variant="mask" as="span">
              Cutting hair in
            </Reveal>
            <Reveal variant="mask" as="span" delay={80}>
              St Kilda since
            </Reveal>
            <Reveal variant="mask" as="span" delay={160}>
              1991.
            </Reveal>
          </h2>
          <Reveal delay={220}>
            <p className="lede">
              Edward Scissorhands is the longest established barber shop in the St
              Kilda and Balaclava area. Three decades on, we&rsquo;re still cutting
              the way we always have: by hand, by ear, and with the kind of care
              that only comes from a team who actually loves what they do.
            </p>
            <p className="lede">
              Skin fades, hot towel straight razor shaves, classic boys cuts, beard
              sculpts. Eleven licensed barbers, each with their own specialty and
              each obsessed with their craft.
            </p>
          </Reveal>

          <Reveal className="story-stats" delay={300}>
            <div>
              <strong className="display d-md">34</strong>
              <span>Years on Carlisle St</span>
            </div>
            <div>
              <strong className="display d-md">11</strong>
              <span>Licensed barbers</span>
            </div>
            <div>
              <strong className="display d-md">7</strong>
              <span>Days a week</span>
            </div>
          </Reveal>
        </div>

        <div className="story-media">
          <Reveal variant="snip" as="figure" className="story-photo story-photo-a">
            <Photo
              name="interior"
              alt="Inside the Edward Scissorhands shop, sleek chairs and warm lighting"
              widths={[800, 1400]}
              sizes="(min-width: 1000px) 40vw, 90vw"
            />
          </Reveal>
          <Reveal
            variant="snip"
            as="figure"
            className="story-photo story-photo-b"
            delay={180}
          >
            <Photo
              name="storefront"
              alt="The Edward Scissorhands storefront on Carlisle Street at night"
              widths={[900, 1600]}
              sizes="(min-width: 1000px) 26vw, 60vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
