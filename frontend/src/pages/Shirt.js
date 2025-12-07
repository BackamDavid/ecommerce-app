import CategoryProducts from "./CategoryProducts";

export default function Shirt({ selectedProducts, setSelectedProducts, searchQuery, genderFilter }) {
  return (
    <CategoryProducts
      category="Shirt"
      selectedProducts={selectedProducts}
      setSelectedProducts={setSelectedProducts}
      searchQuery={searchQuery}
      genderFilter={genderFilter}
    />
  );
}

