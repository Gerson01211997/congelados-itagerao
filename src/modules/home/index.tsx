import Banner from "./components/banner";
import Products from "./components/products";
import { CATEGORIES } from "./constants";
import CategoryNav from "./components/categoryNav";

function Home() {
  return (
    <div className="gap-4 flex flex-col">
      <Banner />
      <div className="px-4">
        <CategoryNav />
      </div>
      <section className="space-y-16 py-8">
        {CATEGORIES.map((category) => (
          // biome-ignore lint: ignoramos el uso de @ts-ignore en esta línea
          // @ts-ignore
          <Products key={category.id} category={category} />
        ))}
      </section>
    </div>
  );
}

export default Home;
