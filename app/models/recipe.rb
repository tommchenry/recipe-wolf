# == Schema Information
#
# Table name: recipes
#
#  id             :integer          not null, primary key
#  title          :string
#  estimated_time :integer
#  instructions   :text
#

class Recipe < ApplicationRecord
  has_and_belongs_to_many :tags
  has_and_belongs_to_many :ingredients
end
