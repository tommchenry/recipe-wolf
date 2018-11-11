class RecipesIngredients < ActiveRecord::Migration[5.2]
  def change
    t.integer :recipe_id
    t.integer :ingredient_id
  end
end
