import ProductFilter from "@/pages/home/components/ProductFilter";
import ProductList from "@/pages/home/components/ProductList";

const HomePage = () => {
  return (
    <section className="space-y-4">
      <ProductFilter />
      <ProductList />
    </section>
  );
};

export default HomePage;
