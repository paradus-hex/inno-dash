import React from "react";
import { useAppSelector } from "@/hooks";
import Image from "next/image";

function extractTextFromHtml(htmlString: string) {
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent;
}

const Product = () => {
  const { isLoading, data } = useAppSelector((state) => state.product);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      {data && (
        <div>
          <h1 className="text-3xl font-bold mb-4">{data?.name}</h1>
          <div className="mb-4">
            <Image
              src={data?.picture}
              alt={data?.name}
              width={300}
              height={300}
              className="rounded-md"
            />
          </div>

          <div className="mb-4">
            <p className="text-lg font-medium">{data?.type.name}</p>
            <p className="text-lg font-medium">{data?.investmentEffort}</p>
            <p className="text-lg font-medium">{data?.trl.name}</p>
          </div>
          <ul className="list-disc list-inside mb-4">
            {data?.categories.map((category: any) => (
              <li key={category.id} className="text-lg font-medium">
                {category.name}
              </li>
            ))}
          </ul>
          <div className="mb-4">
            <p className="text-lg font-medium">
              {extractTextFromHtml(data?.description)}
            </p>
          </div>
          <div className="mb-4">
            <a
              href={data?.video}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-blue-500"
            >
              Watch Video
            </a>
          </div>
          <div className="mb-4">
            <p className="text-lg font-medium">Contact Person:</p>
            <p className="text-lg font-medium">{data?.user.firstName}</p>
            <p className="text-lg font-medium">{data?.user.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
