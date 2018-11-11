# == Schema Information
#
# Table name: ingredients
#
#  id   :integer          not null, primary key
#  name :string
#

class Ingredient < ApplicationRecord
  has_and_belongs_to_many :recipes
end
