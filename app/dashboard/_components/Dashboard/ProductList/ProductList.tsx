"use client";
import { type FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { mockProducts } from "@/mocks/products";

const ProductList: FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">商品一覧</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                ¥{product.price.toLocaleString()}
              </p>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => console.log(`Add to cart: ${product.id}`)}
              >
                カートに追加
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { ProductList };
