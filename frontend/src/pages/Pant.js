import CategoryProducts from "./CategoryProducts";

export default function Pant({ selectedProducts, setSelectedProducts, searchQuery, genderFilter }) {
  return (
    <CategoryProducts
      category="Pant"
      selectedProducts={selectedProducts}
      setSelectedProducts={setSelectedProducts}
      searchQuery={searchQuery}
      genderFilter={genderFilter}
    />
  );
}

