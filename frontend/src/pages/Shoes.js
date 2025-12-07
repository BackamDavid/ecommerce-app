import CategoryProducts from "./CategoryProducts";

export default function Shoes({ selectedProducts, setSelectedProducts, searchQuery, genderFilter }) {
  return (
    <CategoryProducts
      category="Shoes"
      selectedProducts={selectedProducts}
      setSelectedProducts={setSelectedProducts}
      searchQuery={searchQuery}
      genderFilter={genderFilter}
    />
  );
}

