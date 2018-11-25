class AddQuantityColumnToIngredientRecipe < ActiveRecord::Migration[5.2]
  def change
    add_column :ingredients_recipes, :quantity, :string
  end
end
