# == Schema Information
#
# Table name: ingredients_recipes
#
#  recipe_id     :bigint(8)        not null
#  ingredient_id :bigint(8)        not null
#  quantity      :string
#

class IngredientRecipe < ActiveRecord::Base
  self.table_name = "ingredients_recipes"
end
