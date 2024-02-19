import Image from "next/image";
import Link from "next/link";
import profileImage from "../../public/images/profile-img.png";

export default function Brand() {
  return (
    <Link href="/" className="flex items-center text-dark gap-2">
      <div className="w-16 rounded-full overflow-hidden border border-solid border-dark">
        <Image
          src={profileImage}
          alt={"PabloBlog"}
          width={100}
          height={100}
          className="w-full h-auto rounded-full"
        />
      </div>
      <span className="font-bold text-xl">Pablo</span>
    </Link>
  );
}
