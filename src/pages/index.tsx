import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { getProduct } from "../state/slice/product";
import { useAppDispatch, useAppSelector } from "@/hooks";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex h-screen items-center justify-center">
      <Link href="/product">
        <h1
          className="font-bold text-neutral-400 hover:text-yellow-200 hover:cursor-pointer "
          onClick={() => dispatch(getProduct())}
        >
          Product Page
        </h1>
      </Link>
    </div>
  );
}
