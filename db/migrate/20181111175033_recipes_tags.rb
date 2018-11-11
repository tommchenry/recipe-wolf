class RecipesTags < ActiveRecord::Migration[5.2]
  def change
    t.integer :recipe_id
    t.integer :tag_id
  end
end
