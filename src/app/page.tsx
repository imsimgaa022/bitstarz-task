export const dynamic = 'force-dynamic';

import { getProducts } from '@/lib/api';
import { ProductGrid } from '@/components/ProductGrid';
import { FavoritesProvider } from '@/context/FavoritesContext';

const INITIAL_LIMIT = 6;

async function HomePage() {
  const [topProducts, exclusiveProducts, recentProducts] = await Promise.all([
    getProducts('top', 0, INITIAL_LIMIT),
    getProducts('exclusive', 0, INITIAL_LIMIT),
    getProducts('recent', 0, INITIAL_LIMIT),
  ]);

  return (
    <FavoritesProvider>
      <main className="min-h-screen bg-white">
        <div className="py-8">
          <ProductGrid
            key="top"
            title="Top Products"
            initialProducts={topProducts}
            category="top"
            hasMore={topProducts.length === INITIAL_LIMIT}
          />
          <ProductGrid
            key="exclusive"
            title="Exclusive Products"
            initialProducts={exclusiveProducts}
            category="exclusive"
            hasMore={exclusiveProducts.length === INITIAL_LIMIT}
          />
          <ProductGrid
            key="recent"
            title="Recent Products"
            initialProducts={recentProducts}
            category="recent"
            hasMore={recentProducts.length === INITIAL_LIMIT}
          />
        </div>
      </main>
    </FavoritesProvider>
  );
}

export default HomePage;
