import Image from "next/image";
import Link from "next/link";

export default function EnamadBadge() {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href="https://trustseal.enamad.ir/?id=749163&Code=66H1OcGSZsUerARe6fLTNV9ro0lqURiJ"
    >
      <Image
        width={50}
        height={50}
        src="https://trustseal.enamad.ir/logo.aspx?id=749163&Code=66H1OcGSZsUerARe6fLTNV9ro0lqURiJ"
        alt="Enamad Trust Seal"
        data-code="66H1OcGSZsUerARe6fLTNV9ro0lqURiJ"
        unoptimized
      />
    </Link>
  );
}
