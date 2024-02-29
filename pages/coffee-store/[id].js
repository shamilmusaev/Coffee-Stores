import Link from "next/link";
import { useRouter } from "next/router";

export default function coffeeStore() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      Coffee Store Page
      <Link href="/" >
        <p>Back to home page</p>
      </Link>
    </div>
  );
}
