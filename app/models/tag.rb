# == Schema Information
#
# Table name: tags
#
#  id   :bigint(8)        not null, primary key
#  name :string
#

class Tag < ApplicationRecord
  has_and_belongs_to_many :recipes
end
