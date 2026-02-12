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
          <Products key={category.id} category={category} />
        ))}
      </section>
    </div>
  );
}

export default Home;
