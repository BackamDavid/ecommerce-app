import CategoryProducts from "./CategoryProducts";

export default function TShirt({ selectedProducts, setSelectedProducts, searchQuery, genderFilter }) {
  return (
    <CategoryProducts
      category="T-Shirt"
      selectedProducts={selectedProducts}
      setSelectedProducts={setSelectedProducts}
      searchQuery={searchQuery}
      genderFilter={genderFilter}
    />
  );
}

