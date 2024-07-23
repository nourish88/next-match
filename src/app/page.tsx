import { Button, Link } from "@nextui-org/react";
import Image from "next/image";
import { FaRegSmile } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl text-red-500 font-bold">Hello app! </h1>
      <Button
        as={Link}
        href="/members"
        color="primary"
        variant="bordered"
        startContent={<FaRegSmile size="20" />}
      >
        Click me
      </Button>
    </div>
  );
}
