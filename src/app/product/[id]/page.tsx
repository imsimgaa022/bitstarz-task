export const dynamic = 'force-static';
export const revalidate = 3600;

import { getProduct } from '@/lib/api';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { Comments } from '@/components/Comments';
import Link from 'next/link';
import { FavoriteButton } from '@/components/FavoriteButton';
import Image from 'next/image';

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <FavoritesProvider>
      <main className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mt-4">
                <Image
                  src={product.image}
                  alt={product.title}
                    fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  priority
                  className="object-cover transition-transform duration-300"
                />
                <FavoriteButton productId={product.id} />
              </div>
            </div>
          </div>

          <Comments productId={id} />
        </div>
      </main>
    </FavoritesProvider>
  );
}

export default ProductPage; 