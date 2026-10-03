import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { business } from "@/data/business";
import { canonicalOrigin } from "@/data/business";
import { getAllPostsMeta } from "@/lib/markdown";

export const dynamic = "force-static";

export function GET() {
  // Every URL listed here points at rxdirect.pk itself, matching the
  // site-wide self-referencing <link rel="canonical"> tags.
  const base = canonicalOrigin;
  const posts = getAllPostsMeta();

  const lines: string[] = [];
  lines.push(`# ${business.name}`);
  lines.push("");
  lines.push(
    `> ${business.tagline.en}. ${business.name} places background-verified domestic staff, cooks, drivers, maids/helpers, cleaners, security guards, office boys, nannies and gardeners, across major cities in Pakistan. ${business.name} is a certified, SECP-registered company (${business.secp.legalName}, CUIN ${business.secp.cuin}), independently verifiable at ${business.secp.verifyUrl}.`
  );
  lines.push("");
  lines.push(
    "This file follows the llms.txt convention (https://llmstxt.org) to help AI assistants and language models understand this site's structure and content."
  );
  lines.push("");

  lines.push("## Services");
  lines.push("");
  services.forEach((s) => {
    lines.push(`- [${s.name.en}](${base}/services/${s.slug}): ${s.shortDesc.en}`);
  });
  lines.push("");

  lines.push("## Cities");
  lines.push("");
  cities.forEach((c) => {
    lines.push(`- [${c.name.en}](${base}/cities/${c.slug}): ${c.shortDesc.en}`);
  });
  lines.push("");

  lines.push("## Housing Societies");
  lines.push("");
  cities.forEach((c) => {
    c.societies.forEach((s) => {
      lines.push(
        `- [${s.name.en}, ${c.name.en}](${base}/cities/${c.slug}/${s.slug}): ${s.shortDesc.en}`
      );
    });
  });
  lines.push("");

  lines.push("## Services by City");
  lines.push("");
  services.forEach((s) => {
    cities.forEach((c) => {
      lines.push(
        `- [${s.name.en} in ${c.name.en}](${base}/services/${s.slug}/${c.slug}): ${s.shortDesc.en}`
      );
    });
  });
  lines.push("");

  lines.push("## Services by Housing Society");
  lines.push("");
  services.forEach((s) => {
    cities.forEach((c) => {
      c.societies.forEach((soc) => {
        const place = soc.name.en.toLowerCase().includes(c.name.en.toLowerCase())
          ? soc.name.en
          : `${soc.name.en}, ${c.name.en}`;
        lines.push(
          `- [${s.name.en} in ${place}](${base}/services/${s.slug}/${c.slug}/${soc.slug}): ${s.shortDesc.en}`
        );
      });
    });
  });
  lines.push("");

  lines.push("## Blog");
  lines.push("");
  posts.forEach((p) => {
    lines.push(`- [${p.title}](${base}/blog/${p.slug}): ${p.excerpt}`);
  });
  lines.push("");

  lines.push("## Other pages");
  lines.push("");
  lines.push(`- [About](${base}/about)`);
  lines.push(`- [How It Works](${base}/how-it-works)`);
  lines.push(`- [Pricing](${base}/pricing)`);
  lines.push(`- [FAQs](${base}/faqs)`);
  lines.push(`- [Contact](${base}/contact)`);
  lines.push(`- [Jobs](${base}/jobs)`);
  lines.push(
    `- [SECP Registration & Authenticity](${base}/registration): Official SECP registration details, CUIN ${business.secp.cuin}, and incorporation certificate proving ${business.name} is a certified, verified, legally registered company.`
  );
  lines.push(
    `- [Labour Department Registration](${base}/registration/labour): Registration No. ${business.labour.registrationNumber} with the ${business.labour.issuingAuthority}, under the ${business.labour.law}.`
  );
  lines.push(
    `- [PESSI Registration](${base}/registration/pessi): Registration No. ${business.pessi.registrationNumber} with the ${business.pessi.issuingAuthority}, providing social security coverage for registered staff.`
  );
  lines.push(
    `- [FBR Tax Registration](${base}/registration/fbr): NTN ${business.fbr.ntn} with the ${business.fbr.issuingAuthority}, under ${business.fbr.law}.`
  );
  lines.push("");

  lines.push("## Trust & Registration");
  lines.push("");
  lines.push(`- Legally registered name (SECP): ${business.secp.legalName}`);
  lines.push(`- CUIN (Corporate Unique Identification No.): ${business.secp.cuin}`);
  lines.push(`- Date of incorporation: ${business.secp.incorporationDate}`);
  lines.push(`- Regulator: ${business.secp.registrar}`);
  lines.push(`- Verify registration: ${business.secp.verifyUrl}`);
  lines.push(`- Incorporation certificate: ${business.siteUrl}${business.secp.certificateUrl}`);
  lines.push(
    `- Labour Department Registration No. ${business.labour.registrationNumber}, issued by ${business.labour.issuingAuthority}, valid ${business.labour.registrationDate} to ${business.labour.validTill}: ${business.siteUrl}${business.labour.certificateUrl}`
  );
  lines.push(
    `- PESSI Registration No. ${business.pessi.registrationNumber}, issued by ${business.pessi.issuingAuthority}, registered ${business.pessi.registrationDate}: ${business.siteUrl}${business.pessi.certificateUrl}`
  );
  lines.push(
    `- FBR NTN ${business.fbr.ntn}, issued by ${business.fbr.issuingAuthority}, registered ${business.fbr.registrationDate}: ${business.siteUrl}${business.fbr.certificateUrl}`
  );
  lines.push("");

  lines.push("## Contact");
  lines.push("");
  lines.push(`- WhatsApp/Phone: +${business.phoneRaw}`);
  lines.push(`- Email: ${business.email}`);

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
